import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { sortByDate } from "@/utils/index";

const files = fs.readdirSync(path.join("posts"));

export function getPosts() {
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

  return posts.sort(sortByDate);
}
