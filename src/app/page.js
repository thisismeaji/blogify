import { getAllPosts } from "@/lib/posts";
import ListPosts from "@/components/blocks/list-post/ListPost";

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <>
      <ListPosts posts={posts} />
    </>
  );
}
