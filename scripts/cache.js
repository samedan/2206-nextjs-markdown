const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

function postData() {
  const files = fs.readdirSync(path.join("posts"));
  const posts = files.map((filename) => {
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
  // create the cached file
  return `export const posts = ${JSON.stringify(posts)}`;
}

try {
  // chech for the 'cache' folder
  fs.readdirSync("cache");
} catch (error) {
  fs.mkdirSync("cache");
}

// write to the cache folder
fs.writeFile("cache/data.js", postData(), function (err) {
  if (err) return console.log(err);
  console.log("///////////////");
  console.log("///////////////");
  console.log("Posts Cached...");
  console.log("///////////////");
});
