import React from "react";
import Image from "next/image";
import Link from "next/link";
import CategoryLabel from "./CategoryLabel";

export default function Post({ post }) {
  // console.log(post);
  // const API = "https://localhost:3000";
  const myLoader = ({ src }) => {
    return `${post.frontmatter.cover_image}`;
  };
  // console.log(post.frontmatter.cover_image);
  // const url = `${post.frontmatter.cover_image}`;
  if (post) {
    return (
      <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
        {/* {post.frontmatter.cover_image} */}
        <Image
          loader={myLoader}
          src={`${post.frontmatter.cover_image}`}
          alt="image"
          height="420"
          width="600"
          className="mb-4 rounded"
        />
        {/* <img
          // loader={myLoader}
          src={`${post.frontmatter.cover_image}`}
          alt="image"
          height="420"
          width="600"
          className="mb-4 rounded"
        /> */}
        <div className="flex justify-between items-center">
          <span className="font-light text-gray-600">
            {post.frontmatter.date}
          </span>
          <CategoryLabel>{post.frontmatter.category}</CategoryLabel>
        </div>

        <div className="mt-2">
          <Link href={`/blog/${post.slug}`}>
            <a className="text-2xl text-gray-700 font-bold hover:underline">
              {post.frontmatter.title}
            </a>
          </Link>
          <p className="my-2 text-gray-600">{post.frontmatter.excerpt}</p>
        </div>

        <div className="flex justify-between items-center mt-6">
          <Link href={`/blog/${post.slug}`}>
            <a className="text-gray-900 hover:text-blue-600">Read more</a>
          </Link>
          <div className="flex items-center">
            <img
              src={post.frontmatter.author_image}
              alt="Author"
              className="mx-4 w-10 object-cover rounded-full hidden sm:block"
            />
            <h3 className="text-gray-700 font-bold">
              {post.frontmatter.author}
            </h3>
          </div>
        </div>
      </div>
    );
  }
}
