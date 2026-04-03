import type { Metadata } from "next";
import BlogDetailClient from "@/app/blog/[slug]/BlogDetailClient";
import { hreflangAlternatesEn } from "@/app/_shared/seo";

interface Paragraph {
  title?: string;
  desc1?: string;
  desc2?: string;
  image?: string;
}

interface Blog {
  id: string;
  title: string;
  desc: string;
  image: string;
  categoryId: string;
  paragraphs?: Paragraph[];
  createdAt: string;
  updatedAt: string;
}

async function getBlog(slug: string): Promise<Blog | null> {
  try {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();

    const blog = await prisma.blog.findUnique({
      where: { id: slug },
    });

    await prisma.$disconnect();
    if (!blog) return null;

    return {
      ...blog,
      paragraphs: blog.paragraphs as Paragraph[] | undefined,
      createdAt: blog.createdAt.toISOString(),
      updatedAt: blog.updatedAt.toISOString(),
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const blog = await getBlog(params.slug);
  if (!blog) {
    return {
      title: "Blog not found | Moria Yazılım",
      description: "The blog post you are looking for could not be found.",
      alternates: hreflangAlternatesEn(`/blog/${params.slug}`),
    };
  }

  const imageUrl = blog.image.startsWith("http") ? blog.image : `https://www.moriayazilim.com${blog.image}`;
  const alternates = hreflangAlternatesEn(`/blog/${blog.id}`);

  return {
    title: `${blog.title} | Moria Yazılım`,
    description: blog.desc,
    alternates,
    openGraph: {
      title: blog.title,
      description: blog.desc,
      url: alternates.canonical,
      siteName: "Moria Yazılım",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: blog.title }],
      locale: "en_US",
      type: "article",
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.desc,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = await getBlog(params.slug);
  return <BlogDetailClient slug={params.slug} initialBlog={blog} />;
}

