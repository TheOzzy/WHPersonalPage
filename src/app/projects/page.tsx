import Image from "next/image";
import Link from "next/link";

export default function Projects() {
  return (
    <main className="container-xxl py-5">
      <header className="mb-5 text-center">
        <h1 className="landing-title mb-3">Projects</h1>
        <p className="landing-description m-auto">
          A snapshot of the platform, DevOps, and automation work I’ve completed so far,
          along with experiments that are currently in progress.
        </p>
      </header>

      {/* Completed projects */}
      <section className="mb-5">
        <h2 className="landing-section-title mb-4 text-center text-md-start">Completed Projects</h2>

        <div className="row g-4">
          <div className="col-md-6 col-lg-4">
            <div className="landing-card h-100 position-relative landing-card-hoverable">
              <div className="project-status-badge project-status-completed">Completed</div>

              <div className="project-card-image mb-3">
                <img src="/images/domokitten.png" alt="OverTheWire Bandit levels 0 to 20" className="project-card-image-img" />
              </div>

              <h3 className="landing-card-title">
                <a href="https://github.com/TheOzzy/MyDevOpsToolKit-WH/tree/main/Linux%20Basics/OverTheWire%20Bandit%20Levels%200-20"
                  target="_blank" rel="noreferrer" className="text-decoration-none text-reset stretched-link">OverTheWire: Bandit (0–20)</a>
              </h3>

              <p className="landing-card-text mb-3">
                Progressive Linux wargame focused on SSH, permissions, file handling, and basic
                shell tooling to strengthen command-line fundamentals.
              </p>

              <p className="mb-0"><strong>Stack:</strong> Linux, SSH, Bash</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="landing-card h-100 position-relative landing-card-hoverable">
              <div className="project-status-badge project-status-completed">Completed</div>

              <div className="project-card-image mb-3">
                <img src="/images/BASH.webp" alt="Bash automation scripts" className="project-card-image-img" />
              </div>

              <h3 className="landing-card-title">
                <a href="https://github.com/TheOzzy/MyDevOpsToolKit-WH/tree/main/bashScripts" target="_blank" rel="noreferrer"
                  className="text-decoration-none text-reset stretched-link">Bash Automation Scripts</a>
              </h3>

              <p className="landing-card-text mb-3">
                Growing library of Bash utilities for automating repetitive server tasks such as
                backups, log housekeeping, and environment bootstrap.
              </p>

              <p className="mb-0"><strong>Stack:</strong> Bash, Linux</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="landing-card h-100 position-relative landing-card-hoverable">
              <div className="project-status-badge project-status-completed">Completed</div>

              <div className="project-card-image mb-3">
                <img src="/images/50four.png" alt="Nginx on EC2 with Route53" className="project-card-image-img" />
              </div>

              <h3 className="landing-card-title">
                <a href="https://www.fiftyfour.click" target="_blank" rel="noreferrer"
                  className="text-decoration-none text-reset stretched-link">Fiftyfour – Nginx + EC2 + Route53</a>
              </h3>

              <p className="landing-card-text mb-3">
                Personal infrastructure lab deploying an Nginx-backed site on AWS EC2 with
                DNS managed via Route53 and room for future automation.
              </p>

              <p className="mb-0"><strong>Stack:</strong> Nginx, AWS EC2, Route53</p>
            </div>
          </div>
        </div>
      </section>

      {/* Incomplete projects */}
      <section>
        <h2 className="landing-section-title mb-4 text-center text-md-start">In-Progress Projects</h2>

        <div className="row g-4">
          <div className="col-md-6 col-lg-4">
            <div className="landing-card h-100" style={{ opacity: 0.6, filter: "grayscale(80%)", pointerEvents: "none" }}>
              <div className="project-status-badge project-status-inprogress">In-Progress</div>

              <div className="project-card-image mb-3">
                <img src="/images/SadServer.png" alt="SadServers easy scenarios" className="project-card-image-img" />
              </div>

              <h3 className="landing-card-title">SadServers: Level [EASY]</h3>

              <p className="landing-card-text mb-3">
                Troubleshooting exercises on misconfigured Linux servers, practising real-world
                debugging, log inspection, and quick fixes under time pressure.
              </p>

              <p className="mb-0"><strong>Stack:</strong> Linux, Bash, troubleshooting</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
