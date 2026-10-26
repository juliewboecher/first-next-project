import PostCard from "@/components/PostCard";
import styles from "../page.module.css";

export default async function PostsPage() {
  const response = await fetch(
    `${process.env.WORDPRESS_URL}/wp-json/wp/v2/posts`,
  );
  const posts = await response.json();

  return (
    <main>
      <h1>Posts</h1>
      {posts.length === 0 ? (
        <p>There are no posts yet.</p>
      ) : (
        <section className={styles.grid}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>
      )}
    </main>
  );
}
