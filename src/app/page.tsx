import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <section className="landing-hero" style={{ minHeight: "calc(100vh - 76px)", paddingTop: 0 }}>
        <main className="container-xxl landing-main">
          <div className="row align-items-center h-100 mt-5 pt-4">
            <div className="col-md-4 text-center mb-5 mb-md-0">
              <div className="landing-avatar-circle mx-auto">
                <img src="/images/Intro-pic.png" alt="Portrait of Warsame Hussein" className="img-fluid" />
              </div>
            </div>

            <div className="col-md-8 text-md-start text-center">
              <p className="landing-subtitle mb-2">
                Hi, I'm a <span className="landing-role" id="role-typing"></span>
              </p>
              <h1 className="landing-title mb-3">About Me!</h1>
              <p className="landing-description lead mb-4">
                I am a DevOps Engineer focused on the infrastructure, automation, and reliability that power modern cloud environments.
                From provisioning cloud-native workflows to mastering CI/CD and containerisation, I bridge the gap between development and scalable operations.
              </p>

              <div className="landing-actions d-flex flex-wrap align-items-center justify-content-md-start justify-content-center gap-3 mb-4">
                <a href="#" className="btn landing-btn-primary">Download CV</a>
                <a href="mailto:warsamehussein36@googlemail.com" className="btn landing-btn-secondary">Contact Me</a>

                <div className="landing-social d-flex align-items-center gap-3 ms-md-3 mt-3 mt-md-0">
                  <a href="https://www.linkedin.com/in/warsame-hussein/" target="_blank" rel="noreferrer" className="landing-social-link">
                    <img src="/icons/linkedin.png" alt="LinkedIn" className="landing-social-icon" />
                  </a>
                  <a href="https://github.com/TheOzzy" target="_blank" rel="noreferrer" className="landing-social-link">
                    <img src="/images/Github.png" alt="GitHub" className="landing-social-icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>

      <Script src="/landing.js" strategy="lazyOnload" />
    </>
  );
}
