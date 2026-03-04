"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ChevronUp, Search, X, ChevronLeft, ChevronRight } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  desc: string;
  image: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: string;
  name: string;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
    return d.toLocaleDateString('tr-TR', { 
      year: 'numeric', 
      month: 'long', 
      day: '2-digit' 
    });
}

export default function BlogsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categorySearch, setCategorySearch] = useState<string>('');
  const [showCategories, setShowCategories] = useState(true);
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        console.log('Blogs API çağrısı yapılıyor...');
        const res = await fetch('/api/get-blog');
        console.log('Blogs API response status:', res.status);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log('Blogs data:', data);
        
        // API direkt blog array'i döndürüyor
        setBlogs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Blogs API hatası:', error);
        setBlogs([]);
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
        
        // API {success: true, categories: [...]} formatında döndürüyor
        if (data.success && Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error('Categories API hatası:', error);
        setCategories([]);
      }
    };
    
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchBlogs(), fetchCategories()]);
      setLoading(false);
    };
    
    fetchData();
  }, []);

  // Filtrelenmiş blogları hesapla
  const filteredBlogs = selectedCategory === 'all' 
    ? blogs 
    : blogs.filter(blog => blog.categoryId === selectedCategory);

  // Her kategorideki blog sayısını hesapla
  const getCategoryCount = (categoryId: string) => {
    return blogs.filter(blog => blog.categoryId === categoryId).length;
  };

  // Kategorileri blog sayısına göre sırala (en çok kullanılan önce)
  const sortedCategories = [...categories].sort((a, b) => {
    const countA = getCategoryCount(a.id);
    const countB = getCategoryCount(b.id);
    return countB - countA;
  });

  // Arama ile filtrelenmiş kategoriler
  const filteredCategories = sortedCategories.filter(category =>
    category.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  // Kategori kaydırma fonksiyonları
  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      const scrollAmount = 200;
      const currentScroll = categoryScrollRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      categoryScrollRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-xl">Yükleniyor...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <span className="text-sm uppercase tracking-widest text-blue-500 font-medium">
          BLOGLAR
        </span>
        <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-gray-800">
          Son Gelişmeler
        </h1>
        <p className="mt-4 text-gray-500 max-w-xl mx-auto text-base">
          Teknoloji, güvenlik ve web dünyasından en yeni haberler ve analizler burada!
        </p>
      </div>

      {/* Kategori Filtreleme Bölümü */}
      <div className={`mb-8 border-none overflow-hidden transition-all duration-1000 ${showCategories ? 'bg-white rounded-xl shadow-lg border border-gray-200' : ''}`}>
        {/* Kategori İçeriği */}
        <div className={`transition-all duration-300 overflow-hidden ${
          showCategories ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="p-6">

            <div className="flex flex-row justify-between">
              <h3 className="text-xl font-semibold text-gray-800 p-2">Kategoriler</h3>
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Kategori ara..."
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                />
                {categorySearch && (
                  <button
                    onClick={() => setCategorySearch('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            {/* Kategori Butonları - Yatay Kaydırmalı */}
            <div className="relative w-full">
              {/* Sol Ok */}
              <button
                onClick={() => scrollCategories('left')}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors duration-200 border border-gray-200"
                style={{ marginLeft: '-16px' }}
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>

              {/* Sağ Ok */}
              <button
                onClick={() => scrollCategories('right')}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors duration-200 border border-gray-200"
                style={{ marginRight: '-16px' }}
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>

              {/* Kategori Container */}
              <div 
                ref={categoryScrollRef}
                className="flex items-center gap-3 overflow-x-auto scrollbar-hide px-8 py-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {/* Tümü Butonu */}
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`flex-shrink-0 px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === 'all'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-400 hover:text-blue-600 shadow-sm'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    Tümü 
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      selectedCategory === 'all'
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {blogs.length}
                    </span>
                  </span>
                </button>

                {/* Kategoriler */}
                {filteredCategories.map((category) => {
                  const count = getCategoryCount(category.id);
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex-shrink-0 px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                          : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-400 hover:text-blue-600 shadow-sm'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {category.name}
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          selectedCategory === category.id
                            ? 'bg-white/20 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {count}
                        </span>
                      </span>
                    </button>
                  );
                })}

                {/* Arama sonucu bulunamadı */}
                {categorySearch && filteredCategories.length === 0 && (
                  <div className="text-gray-500 text-sm py-2 flex-shrink-0">
                    {categorySearch} için kategori bulunamadı
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center py-2">
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="p-2 hover:bg-gray-100 rounded-sm transition-colors duration-200 "
            title={showCategories ? "Kategorileri Gizle" : "Kategorileri Göster"}
          >
            <ChevronUp 
              className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                showCategories ? 'rotate-0' : 'rotate-180'
              }`} 
            />
          </button>
        </div>
      </div>

      {/* Blog Listesi */}
      {filteredBlogs.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-xl text-gray-500">
            {selectedCategory === 'all' 
              ? 'Henüz blog yazısı bulunmuyor.' 
              : 'Bu kategoride blog yazısı bulunmuyor.'
            }
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => {
            const category = categories.find(cat => cat.id === blog.categoryId);
            return (
              <Link
                key={blog.id}
                href={`/blog/${blog.id}`}
                className="group block bg-white rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden border border-gray-200 h-fit"
              >
                <div className="overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={600}
                    height={300}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out"
                  />
                </div>
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 mb-3">
                      {blog.title}
                    </h2>
                    <div className="flex gap-2 items-center text-xs text-gray-500 mb-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                        {category ? category.name : 'Kategori Yok'}
                      </span>
                      <span>•</span>
                      <span>{formatDate(blog.createdAt)}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {blog.desc}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}