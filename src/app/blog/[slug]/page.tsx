import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <main className="container-xxl py-5">
      <article className="landing-card" style={{ maxWidth: "800px", margin: "0 auto", padding: "40px" }}>
        <header className="mb-5 text-center">
          <Link href="/blog" className="text-muted text-decoration-none mb-3 d-inline-block">
            &larr; Back to Blog
          </Link>
          <h1 className="landing-title mb-3" style={{ fontSize: "36px" }}>{post.title}</h1>
          <div className="d-flex justify-content-center align-items-center mb-4">
            {post.published_at && (
              <span className="landing-pill">
                Published on {new Date(post.published_at).toLocaleDateString()}
              </span>
            )}
          </div>
          {post.cover_image_url && (
            <div className="project-card-image mb-4" style={{ height: "auto", maxHeight: "400px" }}>
              <img src={post.cover_image_url} alt={post.title} className="img-fluid rounded" style={{ objectFit: "cover", width: "100%", maxHeight: "400px" }} />
            </div>
          )}
        </header>

        <div className="blog-content" style={{ fontSize: "18px", lineHeight: "1.8", color: "#333" }}>
          {/* We will eventually render Markdown here, but for now we'll just dump the content text */}
          <div dangerouslySetInnerHTML={{ __html: post.content?.replace(/\n/g, "<br/>") }} />
        </div>
      </article>
    </main>
  );
}
