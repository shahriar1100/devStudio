import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand, Container } from "@/components/ui/elements";

export function Footer() {
  return (
    <footer className="footer compact-footer">
      <Container>
        <div className="compact-footer-main">
          <div><Brand /><p>Clean websites built to help your business sell.</p></div>
          <Link className="footer-contact" href="/contact?service=Landing%20Page">Start a project <ArrowUpRight size={16} /></Link>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Dev Studio. All rights reserved.</p>
          <div><Link href="/privacy-policy">Privacy</Link><Link href="/terms">Terms</Link></div>
        </div>
      </Container>
    </footer>
  );
}
