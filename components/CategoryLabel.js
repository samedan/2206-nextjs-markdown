import Link from "next/Link";

import React from "react";
import tailwindConfig from "../tailwind.config";

export default function CategoryLabel({ children }) {
  const colorKey = {
    JavaScript: "yellow",
    CSS: "blue",
    Python: "green",
    PHP: "purple",
    Ruby: "red",
  };

  // addded   safelist: [
  //   'bg-yellow-600',
  //   'bg-blue-600',
  //   'bg-green-600',
  //   'bg-purple-600',
  //   'bg-red-600',
  // ] to tailwindConfig.config
  return (
    <div
      className={`px-2 py-1 bg-${colorKey[children]}-600 text-gray-100 font-bold rounded`}
    >
      <Link href={`/blog/category/${children.toLowerCase()}`}>{children}</Link>
    </div>
  );
}
