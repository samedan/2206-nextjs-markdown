// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function handler(req, res) {
  let posts;

  if (process.env.NODE_ENV === "production") {
    // fetch from cache file made with /scripts/cache.js
    posts = require("../../cache/data").posts;
  } else {
    const files = fs.readdirSync(path.join("posts"));
    posts = files.map((filename) => {
      // read the files in the "posts" directory
      const markdownWithMeta = fs.readFileSync(
        path.join("posts", filename),
        "utf-8"
      );
      const slug = filename.replace(".md", "");
      // console.log(markdownWithMeta);
      console.log(slug);
      const { data: frontmatter } = matter(markdownWithMeta);

      return {
        frontmatter,
        slug,
      };
    });
  }

  const results = posts.filter(
    ({ frontmatter: { title, excerpt, category } }) =>
      // check each search term 'q' if it matches (-1)
      title.toLowerCase().indexOf(req.query.q) != -1 ||
      excerpt.toLowerCase().indexOf(req.query.q) != -1 ||
      category.toLowerCase().indexOf(req.query.q) != -1
  );
  // console.log(results);

  res.status(200).json(results);
}
