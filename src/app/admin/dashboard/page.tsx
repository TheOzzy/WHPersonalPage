"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndFetchPosts = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/admin");
        return;
      }

      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) {
        setPosts(data);
      }
      setLoading(false);
    };

    checkAuthAndFetchPosts();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin");
  };

  if (loading) {
    return <div className="container-xxl py-5 text-center">Loading dashboard...</div>;
  }

  return (
    <main className="container-xxl py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1 className="landing-title m-0">Admin Dashboard</h1>
        <div>
          <Link href="/admin/posts/new" className="btn landing-btn-primary me-3">
            New Post
          </Link>
          <button onClick={handleLogout} className="btn landing-btn-secondary">
            Logout
          </button>
        </div>
      </div>

      <div className="landing-card">
        <h2 className="landing-section-title mb-4">Manage Posts</h2>
        {posts.length === 0 ? (
          <p>No posts found. Create one to get started.</p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td className="fw-bold text-dark">{post.title}</td>
                    <td>
                      <span className={`badge ${post.status === "published" ? "bg-success" : "bg-warning text-dark"}`}>
                        {post.status.toUpperCase()}
                      </span>
                    </td>
                    <td>{new Date(post.created_at).toLocaleDateString()}</td>
                    <td>
                      <Link href={`/admin/posts/${post.id}`} className="btn btn-sm btn-outline-primary me-2">
                        Edit
                      </Link>
                      <button className="btn btn-sm btn-outline-danger" onClick={async () => {
                        if (confirm("Are you sure you want to delete this post?")) {
                          await supabase.from("posts").delete().eq("id", post.id);
                          setPosts(posts.filter(p => p.id !== post.id));
                        }
                      }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
