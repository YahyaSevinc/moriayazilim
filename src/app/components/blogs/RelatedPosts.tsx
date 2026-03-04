"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const RelatedPosts = ({
  relatedBlogs,
}: {
  relatedBlogs: {
    id: string;
    title: string;
    summary: string;
    content: string;
    image: string;
    date: string;
    category?: string;
  }[];
}) => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 1.6,  // biraz genişlettim
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 240px)": {
        slides: { perView: 1.1, spacing: 20 }, // arttırdım
      },
      "(min-width: 760px)": {
        slides: { perView: 2.1, spacing: 20 }, // arttırdım
      },
      "(min-width: 1000px)": {
        slides: { perView: 3, spacing: 24 }, // arttırdım
      },
    },
    loop: false, // loop kapalı, böylece sadece sağa kayar
    mode: "snap", // kayan kaydırma yerine snap modu, böylece kaydırma sonlanır
    rubberband: false, // sola fazla esnemeyi kapatır
  });

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Benzer Yazılar</h2>
      <div ref={sliderRef} className="keen-slider cursor-grab p-4">
        {relatedBlogs.map((blog) => (
          <div
            key={blog.id}
            className="keen-slider__slide rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl bg-white transition-all duration-300"
          >
            <Link href={`/blogs/${blog.id}`}>
              <div className="overflow-hidden h-56">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={600}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out"
                />
              </div>
              <div className="p-6 flex flex-col justify-between h-min-[250px]">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                    {blog.title}
                  </h2>
                  <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                    {blog.summary}
                  </p>
                </div>
                <div className="mt-4">
                  <span className="inline-block bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">
                    {new Date(blog.date).toLocaleDateString("tr-TR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
