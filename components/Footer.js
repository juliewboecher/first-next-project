import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav>
        <Link href="/">Forside</Link>
        <Link href="/posts">Posts</Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
  );
}