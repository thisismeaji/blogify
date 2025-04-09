"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LatestPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(
        data
          .sort((a, b) => b.id - a.id) // sort by id desc
          .slice(0, 5)
      );
    }

    fetchPosts();
  }, []);

  if (posts.length === 0) return null;

  return (
    <section>
      <h2>Latest Articles</h2>
      <div>
        {posts.map((post) => (
          <div key={post.slug}>
            <Link href={`/${post.slug}`}>
              <Image src={post.img} alt={post.title} width={600} height={400} />
              <h3>{post.title}</h3>
              <p>{post.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
