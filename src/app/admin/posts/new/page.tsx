"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [status, setStatus] = useState("draft");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(e.target.value));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setCoverImageUrl(null); // clear old URL until uploaded
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setCoverImageUrl(null);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage
      .from("blog-images")
      .upload(fileName, file, { upsert: false });

    if (error) {
      alert("Image upload failed: " + error.message);
      return null;
    }

    const { data } = supabase.storage.from("blog-images").getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();

    let finalImageUrl: string | null = coverImageUrl;
    if (imageFile) {
      finalImageUrl = await uploadImage(imageFile);
      if (!finalImageUrl) {
        setLoading(false);
        return;
      }
    }

    const newPost = {
      title,
      slug,
      excerpt,
      content,
      cover_image_url: finalImageUrl,
      status,
      author_id: user?.id,
      published_at: status === "published" ? new Date().toISOString() : null,
    };

    const { error } = await supabase.from("posts").insert([newPost]);

    setLoading(false);
    if (error) {
      alert("Error creating post: " + error.message);
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    <main className="container-xxl py-5">
      <div className="landing-card" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="landing-section-title m-0">Create New Post</h1>
          <Link href="/admin/dashboard" className="btn landing-btn-secondary">Cancel</Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Title</label>
            <input type="text" className="form-control" value={title} onChange={handleTitleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Slug (URL)</label>
            <input type="text" className="form-control" value={slug} onChange={(e) => setSlug(e.target.value)} required />
          </div>

          {/* Cover Image Upload */}
          <div className="mb-3">
            <label className="form-label fw-bold">Cover Image</label>
            {imagePreview ? (
              <div className="position-relative mb-2" style={{ maxWidth: "100%" }}>
                <img
                  src={imagePreview}
                  alt="Cover preview"
                  style={{ width: "100%", maxHeight: "220px", objectFit: "cover", borderRadius: "10px", border: "2px solid #e0c9b0" }}
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  style={{
                    position: "absolute", top: "8px", right: "8px",
                    background: "rgba(0,0,0,0.6)", color: "#fff",
                    border: "none", borderRadius: "50%",
                    width: "30px", height: "30px",
                    cursor: "pointer", fontSize: "16px", lineHeight: "30px", textAlign: "center"
                  }}
                >
                  ✕
                </button>
              </div>
            ) : (
              <label
                htmlFor="cover-image-input"
                style={{
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  gap: "8px", padding: "32px",
                  border: "2px dashed #c9a97a", borderRadius: "10px",
                  cursor: "pointer", color: "#7a5c3a",
                  background: "rgba(201, 169, 122, 0.05)",
                  transition: "background 0.2s",
                }}
              >
                <span style={{ fontSize: "36px" }}>🖼️</span>
                <span style={{ fontWeight: 600 }}>Click to attach an image</span>
                <span style={{ fontSize: "13px", color: "#aaa" }}>JPG, PNG, GIF, WebP — max 5MB</span>
                <input
                  id="cover-image-input"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Excerpt</label>
            <textarea className="form-control" rows={2} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">Content (Markdown supported)</label>
            <textarea className="form-control" rows={12} value={content} onChange={(e) => setContent(e.target.value)} required />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">Status</label>
            <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <button type="submit" className="btn landing-btn-primary w-100" disabled={loading}>
            {loading ? "Saving..." : "Save Post"}
          </button>
        </form>
      </div>
    </main>
  );
}
