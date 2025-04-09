import { getPostBySlug } from "@/lib/posts";
import Styles from "../page.module.css";

export default async function PostDetail(props) {
  const params = await props.params;
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return <div>Post tidak ditemukan</div>;
  }

  return (
    <section className={Styles.sectionPost}>
      <article className={Styles.singlePost}>
        <h1>{post.title.rendered}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </article>
    </section>
  );
}
