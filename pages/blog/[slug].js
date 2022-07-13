import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import Link from "next/link";
import Layout from "./../../components/Layout";
import CategoryLabel from "./../../components/CategoryLabel";

export default function PostPage({
  frontmatter: { title, category, date, cover_image, author, author_image },
  content,
  slug,
}) {
  return (
    <Layout title={title}>
      <Link href="/blog">Go back</Link>
      <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-5xl mb-7">{title}</h1>
          <CategoryLabel>{category}</CategoryLabel>
        </div>
        <img src={cover_image} alt="" className="w-full rounded" />
        <div className="flex justify-between intems-center bg-gray-100 p-2 my-8">
          <div className="flex items-center">
            <img
              src={author_image}
              className="mx-4 w-10 object-cover rounded-full hidden sm:block"
              alt=""
            />
            <h4>{author}</h4>
          </div>

          <div className="mr-4">{date}</div>
        </div>
        <div className="blog-text mt-2">
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}
// paths coming from getStaticPaths [
//   { params: { slug: 'django-crash-course' } },
//   { params: { slug: 'javascript-performance-tips' } },
//   { params: { slug: 'new-in-php-8' } },
//   { params: { slug: 'python-book-review' } },
//   { params: { slug: 'react-crash-course' } },
//   { params: { slug: 'tailwind-vs-bootstrap' } },
//   { params: { slug: 'writing-great-unit-tests' } }
// ]

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);
  return {
    props: { frontmatter, content, slug },
  };
}
