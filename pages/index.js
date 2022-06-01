import Layout from "../components/Layout";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function Home({ posts }) {
  console.log(posts);
  return (
    <Layout>
      <h1>Hello</h1>
    </Layout>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join("posts"));
  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const markdowWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );
    // extracts META from the MD files
    const { data: frontmatter } = matter(markdowWithMeta);
    return {
      slug,
      frontmatter,
    };
  });
  // console.log(posts);
  return {
    props: {
      posts,
    },
  };
}
