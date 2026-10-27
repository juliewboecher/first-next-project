import Link from "next/link";
import { formatDate } from "@/lib/format";
import styles from "./PostCard.module.css";

export default function PostCard({ post }) {
  // With ?_embed, WordPress includes the featured image and categories in _embedded
  
const image = post?._embedded?.["wp:featuredmedia"]?.[0];
const imageUrl = image?.source_url;
  const categories = post._embedded?.["wp:term"]?.[0] ?? [];
  const date = formatDate(post.date);

  return (
    <article className={styles.card}>
      {imageUrl && (
        <img
          className={styles.image}
          src={imageUrl}
          alt={image?.alt_text || ""}
        />
      )}
      
      <time className={styles.date} dateTime={post.date}>
        {date}
      </time>
      <h2
        className={styles.title}
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />
      <div
        className={styles.excerpt}
        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
      />
      <Link href={`/posts/${post.slug}`} className={styles.link}>
        Read more
      </Link>
    </article>
  );
}
