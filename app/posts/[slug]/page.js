import styles from "./page.module.css";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PostPage({ params }) {
  const { slug } = await params;

  const wordpressUrl = process.env.WORDPRESS_URL;

  if (!wordpressUrl) {
    throw new Error("WORDPRESS_URL mangler i .env.local");
  }

  const response = await fetch(
    `${wordpressUrl}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}`,
    {
      next: { revalidate: 60 },
    },
  );

  if (!response.ok) {
    throw new Error("Kunne ikke hente indlæg fra WordPress");
  }

  const posts = await response.json();
  const post = posts[0];

  if (!post) {
    notFound();
  }

  return (
    <main>
      <article className={styles.post}>
        <Link href="/posts">← Alle indlæg</Link>

        <time className={styles.date} dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("da-DK", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>

        <h1
          dangerouslySetInnerHTML={{
            __html: post.title.rendered,
          }}
        />

        <div
          className="wp-content"
          dangerouslySetInnerHTML={{
            __html: post.content.rendered,
          }}
        />
      </article>
    </main>
  );
}
