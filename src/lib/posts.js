export async function getAllPosts() {
  const res = await fetch(
    `${process.env.WORDPRESS_API_URL}/posts?_embed=true`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export async function getPostBySlug(slug) {
  const res = await fetch(
    `${process.env.WORDPRESS_API_URL}/posts?slug=${slug}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch post by slug");
  }

  const posts = await res.json();
  return posts.length > 0 ? posts[0] : null;
}
