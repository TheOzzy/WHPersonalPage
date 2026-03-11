import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

export default async function BlogLanding() {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <main className="container-xxl py-5">
      <header className="mb-5 text-center">
        <h1 className="landing-title mb-3">Blog</h1>
        <p className="landing-description m-auto">
          Technical deep dives, home lab experiments, and notes on platform engineering.
        </p>
      </header>

      <div className="row g-4 justify-content-center">
        {posts?.map((post) => (
          <div key={post.id} className="col-md-6 col-lg-4">
            <div className="landing-card h-100 position-relative landing-card-hoverable">
              {post.cover_image_url && (
                <div className="project-card-image mb-3">
                  <img src={post.cover_image_url} alt={post.title} className="project-card-image-img" />
                </div>
              )}
              <h3 className="landing-card-title">
                <Link href={`/blog/${post.slug}`} className="text-decoration-none text-reset stretched-link">
                  {post.title}
                </Link>
              </h3>
              {post.published_at && (
                <small className="text-muted mb-2 d-block">
                  {new Date(post.published_at).toLocaleDateString()}
                </small>
              )}
              <p className="landing-card-text mb-3">
                {post.excerpt}
              </p>
            </div>
          </div>
        ))}
        {(!posts || posts.length === 0) && (
          <div className="text-center text-muted">
            <p>No published posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </main>
  );
}
