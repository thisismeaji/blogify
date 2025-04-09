import React from "react";
import Styles from "./navbar.module.css";
import MobileNav from "./MobileNav";
import Link from "next/link";

export default async function Navbar() {
  let navLinks = [];

  try {
    const res = await fetch(
      "https://dashboard.blogify.my.id/wp-json/wp/v2/categories",
      {
        next: { revalidate: 3600 }, // cache 1 jam
      }
    );

    const data = await res.json();

    // Ubah format ke href & label
    const categoryLinks = data
      .filter((cat) => cat.count > 0)
      .map((cat) => ({
        href: `/${cat.slug}`,
        label: cat.name,
      }));

    // Tambahkan "Beranda" di awal
    navLinks = [{ href: "/", label: "Beranda" }, ...categoryLinks];
  } catch (error) {
    console.error("Gagal memuat kategori:", error);
    // fallback default links jika gagal
    navLinks = [{ href: "/", label: "Beranda" }];
  }

  return (
    <nav className={Styles.nav}>
      <Link href="/">
        <div className={Styles.logo}>
          <h2>KelasSiang</h2>
        </div>
      </Link>
      <MobileNav navLinks={navLinks} />
    </nav>
  );
}
