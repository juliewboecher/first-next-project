import Link from "next/link";
import { connection } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import styles from "./Header.module.css";
import AuthStatus from "./AuthStatus";

export default async function Header() {
  await connection();
  const user = await getCurrentUser();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          Headless WordPress
        </Link>
        <ul className={styles.links}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <Link href="/members">Members</Link>
          </li>
        </ul>
        <AuthStatus user={user} />
      </nav>
    </header>
  );
}
