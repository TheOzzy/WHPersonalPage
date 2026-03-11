import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <section className="landing-hero" style={{ minHeight: "auto", paddingTop: 0, paddingBottom: 0 }}>
      <header className="container-xxl landing-nav d-flex justify-content-between align-items-center py-4">
        <div className="d-flex align-items-center">
          <div className="landing-logo-circle d-flex align-items-center justify-content-center me-2">
            <Link href="/">
              <img src="/images/Wumpa_fruit" alt="Logo" className="landing-logo-img" />
            </Link>
          </div>
          <span className="landing-brand-name fw-bold">Warsame Hussein</span>
        </div>

        <nav>
          <ul className="landing-menu list-unstyled d-flex align-items-center mb-0">
            <li className="ms-4"><Link href="/">Home</Link></li>
            <li className="ms-4"><Link href="/projects">Projects</Link></li>
            <li className="ms-4"><Link href="/blog">Blog</Link></li>
            <li className="ms-4"><a href="mailto:warsamehussein36@googlemail.com">Contact Me</a></li>
          </ul>
        </nav>
      </header>
    </section>
  );
}
