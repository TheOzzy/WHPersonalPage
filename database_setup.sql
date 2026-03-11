-- Run this in the Supabase "SQL Editor" tab

-- Create the posts table
CREATE TABLE IF NOT EXISTS public.posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text NOT NULL,
  cover_image_url text,
  status text NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  author_id uuid REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- 1. Policy: Everyone can read "published" posts
CREATE POLICY "Public can read published posts" 
ON public.posts 
FOR SELECT 
USING (status = 'published');

-- 2. Policy: Only authenticated users (you) can do everything
CREATE POLICY "Authenticated users have full access to posts" 
ON public.posts 
FOR ALL 
TO authenticated 
USING (true)
WITH CHECK (true);

-- (Optional) Add a trigger for updating `updated_at` automatically
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_posts_modtime
BEFORE UPDATE ON public.posts
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- =============================================
-- STORAGE: Run this section SEPARATELY if above already ran
-- =============================================

-- Create a public storage bucket for blog cover images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to read/view images (public bucket)
CREATE POLICY "Public can view blog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

-- Allow authenticated users (you) to upload images
CREATE POLICY "Authenticated users can upload blog images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'blog-images');

-- Allow authenticated users to delete/replace images
CREATE POLICY "Authenticated users can delete blog images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'blog-images');
