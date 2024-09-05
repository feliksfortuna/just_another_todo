import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link href="/">Home</Link>
        </li>
        <li className="navbar-item">
          <Link href="/about">About</Link>
        </li>
        <li className="navbar-item">
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}