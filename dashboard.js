const fallbackContent = {
  settings: structuredClone(window.PORTFOLIO_SETTINGS || {}),
  projects: structuredClone(window.PORTFOLIO_PROJECTS || [])
};

let content = structuredClone(fallbackContent);
let adminPassword = sessionStorage.getItem("portfolioAdminPassword") || "";

const loginPanel = document.querySelector("#login-panel");
const adminPanel = document.querySelector("#admin-panel");
const loginForm = document.querySelector("#login-form");
const loginStatus = document.querySelector("#login-status");
const projectList = document.querySelector("#project-list");
const saveStatus = document.querySelector("#save-status");

async function api(path, options = {}) {
  const headers = new Headers(options.headers || {});
  if (adminPassword) headers.set("Authorization", `Bearer ${adminPassword}`);
  const response = await fetch(path, { ...options, headers });
  const data = await response.json().catch(() => ({ error: "Unexpected server response." }));
  if (!response.ok) throw new Error(data.error || "Request failed.");
  return data;
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>'"]/g, character => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#39;", '"':"&quot;" })[character]);
}

function setSettingsFields() {
  document.querySelector("#section-label").value = content.settings.sectionLabel || "";
  document.querySelector("#section-title").value = content.settings.sectionTitle || "";
  document.querySelector("#section-description").value = content.settings.sectionDescription || "";
}

function renderProjects() {
  projectList.innerHTML = "";
  content.projects.forEach((project, index) => {
    const editor = document.createElement("article");
    editor.className = "project-editor";
    editor.dataset.index = index;
    editor.innerHTML = `
      <div class="image-editor">
        <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.alt || project.title)}" />
        <label class="upload-label">Upload image<input class="image-input" type="file" accept="image/png,image/jpeg,image/webp,image/gif" /></label>
      </div>
      <div class="project-fields">
        <label>Project title<input data-field="title" maxlength="100" value="${escapeHtml(project.title)}" /></label>
        <label>Category / small text<input data-field="category" maxlength="100" value="${escapeHtml(project.category)}" /></label>
        <label class="wide">Description<textarea data-field="description" maxlength="500" rows="3">${escapeHtml(project.description)}</textarea></label>
        <label class="wide">Project link<input data-field="link" type="url" placeholder="https://your-project.com" value="${escapeHtml(project.link)}" /></label>
        <label class="wide">Image alt text<input data-field="alt" maxlength="180" value="${escapeHtml(project.alt)}" /></label>
      </div>
      <div class="item-actions">
        <button type="button" data-action="up" aria-label="Move project up">↑</button>
        <button type="button" data-action="down" aria-label="Move project down">↓</button>
        <button class="delete" type="button" data-action="delete" aria-label="Delete project">×</button>
      </div>`;
    projectList.appendChild(editor);
  });
}

function collectSettings() {
  content.settings = {
    sectionLabel: document.querySelector("#section-label").value,
    sectionTitle: document.querySelector("#section-title").value,
    sectionDescription: document.querySelector("#section-description").value
  };
}

async function openDashboard() {
  const auth = await api("/api/auth", { method: "POST" });
  const response = await api("/api/projects");
  if (response.content?.projects?.length) content = response.content;
  loginPanel.hidden = true;
  adminPanel.hidden = false;
  setSettingsFields();
  renderProjects();
  if (auth.storage !== "ready") saveStatus.textContent = "Dashboard is open. Connect Vercel Blob before saving or uploading images.";
  else if (auth.usingDefaultPassword) saveStatus.textContent = "Default password is active. Set ADMIN_PASSWORD later for stronger security.";
}

loginForm.addEventListener("submit", async event => {
  event.preventDefault();
  const button = loginForm.querySelector("button");
  adminPassword = document.querySelector("#admin-password").value;
  button.disabled = true;
  loginStatus.textContent = "Checking dashboard access…";
  try {
    await openDashboard();
    sessionStorage.setItem("portfolioAdminPassword", adminPassword);
    loginStatus.textContent = "";
  } catch (error) {
    loginStatus.textContent = error.message;
    adminPassword = "";
  } finally {
    button.disabled = false;
  }
});

projectList.addEventListener("input", event => {
  const field = event.target.dataset.field;
  if (!field) return;
  const index = Number(event.target.closest(".project-editor").dataset.index);
  content.projects[index][field] = event.target.value;
  saveStatus.textContent = "You have unpublished changes.";
});

projectList.addEventListener("change", async event => {
  if (!event.target.matches(".image-input") || !event.target.files[0]) return;
  const editor = event.target.closest(".project-editor");
  const index = Number(editor.dataset.index);
  const overlay = document.createElement("span");
  overlay.className = "upload-state";
  overlay.textContent = "Uploading…";
  editor.querySelector(".image-editor").appendChild(overlay);
  try {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    const result = await api("/api/upload", { method: "POST", body: formData });
    content.projects[index].image = result.url;
    editor.querySelector("img").src = result.url;
    saveStatus.textContent = "Image uploaded. Save to publish the updated project.";
  } catch (error) {
    saveStatus.textContent = error.message;
  } finally {
    overlay.remove();
    event.target.value = "";
  }
});

projectList.addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const index = Number(button.closest(".project-editor").dataset.index);
  if (button.dataset.action === "delete") content.projects.splice(index, 1);
  if (button.dataset.action === "up" && index > 0) [content.projects[index - 1], content.projects[index]] = [content.projects[index], content.projects[index - 1]];
  if (button.dataset.action === "down" && index < content.projects.length - 1) [content.projects[index + 1], content.projects[index]] = [content.projects[index], content.projects[index + 1]];
  renderProjects();
  saveStatus.textContent = "You have unpublished changes.";
});

document.querySelector("#add-project").addEventListener("click", () => {
  content.projects.push({
    id: crypto.randomUUID(),
    title: "New project",
    category: "E-commerce UI/UX",
    description: "Add a short project description.",
    image: "assets/images/work/ecommerce-fashion.png",
    alt: "Project preview",
    link: "https://example.com"
  });
  renderProjects();
  projectList.lastElementChild?.scrollIntoView({ behavior: "smooth", block: "center" });
  saveStatus.textContent = "New project added. Update its details and save.";
});

document.querySelector("#save-content").addEventListener("click", async event => {
  const button = event.currentTarget;
  collectSettings();
  button.disabled = true;
  saveStatus.textContent = "Publishing changes…";
  try {
    const result = await api("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content)
    });
    content = result.content;
    setSettingsFields();
    renderProjects();
    saveStatus.textContent = `Published successfully at ${new Date(result.updatedAt).toLocaleTimeString()}.`;
  } catch (error) {
    saveStatus.textContent = error.message;
  } finally {
    button.disabled = false;
  }
});

document.querySelector("#logout-button").addEventListener("click", () => {
  sessionStorage.removeItem("portfolioAdminPassword");
  window.location.reload();
});

if (adminPassword) openDashboard().catch(() => sessionStorage.removeItem("portfolioAdminPassword"));
