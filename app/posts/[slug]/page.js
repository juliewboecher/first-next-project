import styles from './page.module.css';
import Link from 'next/link';

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(
  `${process.env.WORDPRESS_URL}/wp-json/wp/v2/posts?slug=${slug}`
);

  return (
    <main>
      <article className={styles.post}>
        <Link href="/posts">← All posts</Link>
        <time className={styles.date} dateTime={post.date}>{date}</time>
      <h1
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />
      <div
        className="wp-content"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </article>
  </main>
);
}