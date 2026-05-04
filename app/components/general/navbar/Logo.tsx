import Link from "next/link";

export default function Logo() {
  return (
    <Link
      className="text-xl md:text-2xl lg:text-3xl font-bold tracking-wide"
      href="/"
    >
      Tech<span className="text-primary">Blog</span>
    </Link>
  );
}
