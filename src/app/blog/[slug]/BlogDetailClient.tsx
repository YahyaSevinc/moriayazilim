"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Paragraph {
  title?: string;
  desc1?: string;
  desc2?: string;
  image?: string;
}

interface Category {
  id: string;
  name: string;
  desc?: string;
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

interface BlogDetailClientProps {
  slug: string;
  initialBlog: Blog | null;
}

export default function BlogDetailClient({ slug, initialBlog }: BlogDetailClientProps) {
  const [blog, setBlog] = useState<Blog | null>(initialBlog);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(!initialBlog);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch('/api/get-blog');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const blogs = await res.json();
        const foundBlog = blogs.find((b: Blog) => b.id === slug);
        console.log('Found blog:', foundBlog);
        console.log('Paragraphs type:', typeof foundBlog?.paragraphs);
        console.log('Paragraphs content:', foundBlog?.paragraphs);
        setBlog(foundBlog || null);
      } catch (error) {
        console.error('Blog fetch hatası:', error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        console.log('Categories API çağrısı yapılıyor...');
        const res = await fetch('/api/category');
        console.log('Categories API response status:', res.status);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log('Categories data:', data);
        
        if (data.success && Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else {
          console.log('Categories data format hatası:', data);
        }
      } catch (error) {
        console.error('Categories fetch hatası:', error);
      }
    };

    if (slug) {
      if (!initialBlog) {
        fetchBlog();
      }
      fetchCategories();
    }
  }, [slug, initialBlog]);

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-xl">Yükleniyor...</div>
        </div>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="max-w-2xl mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Blog Bulunamadı</h1>
        <p className="text-gray-500">Geçersiz veya eksik blog linki.</p>
        <Link href="/blog" className="text-blue-500 hover:underline mt-4 inline-block">
          ← Bloglara Geri Dön
        </Link>
      </main>
    );
  }

  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('tr-TR', { 
      year: 'numeric', 
      month: 'long', 
      day: '2-digit' 
    });
  }

  return (
    <main className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      {/* Geri Dön Linki */}
      <Link
        href="/blog"
        className="text-blue-500 text-sm hover:underline mb-8 inline-block md:absolute left-15"
      >
        ← Bloglara Geri Dön
      </Link>

      {/* Başlık ve Tarih */}
      <div className="mb-12 text-center">
        <span className="text-sm uppercase tracking-widest text-blue-500 font-medium">
          Bloglarımız
        </span>
        <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">
          {blog.title}
        </h1>
        <p className="mt-4 text-gray-500 text-sm">
          {formatDate(blog.createdAt)} • {categories.find(cat => cat.id === blog.categoryId)?.name || 'Kategori Yok'}
          <br />
          
        </p>
        <div className="mt-4 w-24 h-1 bg-blue-500 rounded-full mx-auto" />
      </div>
      <p className="text-lg leading-relaxed mb-8">{blog.desc}</p>

      {/* Görsel */}
      <div className="mb-10 rounded-2xl overflow-hidden shadow-md transition hover:shadow-xl">
        <Image
          src={blog.image}
          alt={blog.title}
          width={800}
          height={400}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02] aspect-video"
        />
      </div>

      {/* İçerik */}
      <article className="prose prose-lg max-w-none text-gray-800 my-24">
        {blog.paragraphs && (
          <div className="space-y-8">
            {Array.isArray(blog.paragraphs) ? 
              blog.paragraphs.map((paragraph: Paragraph, index: number) => (
                <div key={index} className="border-b border-gray-200 pb-8">
                  {paragraph.title && (
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      {paragraph.title}
                    </h3>
                  )}
                  
                  {paragraph.desc1 && (
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {paragraph.desc1}
                    </p>
                  )}
                  
                  {paragraph.image && (
                    <div className="my-6 rounded-lg overflow-hidden">
                      <Image
                        src={paragraph.image}
                        alt={paragraph.title || 'Blog görseli'}
                        width={600}
                        height={300}
                        className="w-full h-full object-cover aspect-video"
                      />
                    </div>
                  )}
                  
                  {paragraph.desc2 && (
                    <p className="text-gray-700 leading-relaxed">
                      {paragraph.desc2}
                    </p>
                  )}
                </div>
              ))
              : 
              <p>İçerik yükleniyor...</p>
            }
          </div>
        )}
      </article>

      {/* Sosyal Medya Paylaşım Butonları */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Bu yazıyı paylaş:</h3>
        <div className="md:flex gap-4 md:flex-row grid grid-cols-2">
          {/* WhatsApp Paylaşım */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${blog.title} - ${blog.desc} ${window.location.href}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
            </svg>
            WhatsApp
          </a>

          {/* Twitter Paylaşım */}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${blog.title} - ${blog.desc}`)}&url=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            X (Twitter)
          </a>

          {/* Facebook Paylaşım */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </a>

          {/* LinkedIn Paylaşım */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </main>
  );
}
