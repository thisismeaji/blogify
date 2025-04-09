import Link from "next/link";
import Styles from "./listpost.module.css";
import Image from "next/image";

export default function ListPosts({ posts }) {
  return (
    <section className={Styles.section}>
      <div className={Styles.cardContainer}>
        {posts.map((post) => {
          const featuredMedia =
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
          const categories = post._embedded?.["wp:term"]?.[0] || [];
          const formattedDate = new Date(post.date).toLocaleDateString(
            "id-ID",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          );

          return (
            <Link href={`/${post.slug}`} key={post.id} className={Styles.card}>
              {featuredMedia && (
                <div className={Styles.thumbnail}>
                  <Image
                    src={featuredMedia}
                    width={1920}
                    height={1080}
                    alt={post.title.rendered}
                  />
                </div>
              )}
              <div className={Styles.postMeta}>
                <div className={Styles.metaInfo}>
                  <span className={Styles.category}>
                    {categories.map((cat, index) => (
                      <span key={cat.id}>
                        {cat.name}
                        {index < categories.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </span>
                  <span className={Styles.date}>{formattedDate}</span>
                </div>
                <h2 className={Styles.cardTitle}>{post.title.rendered}</h2>
                <div
                  className={Styles.cardExcerpt}
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
