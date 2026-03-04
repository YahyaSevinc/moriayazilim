import { Metadata } from 'next';
import BlogDetailClient from './BlogDetailClient';

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

// Blog verilerini çeken fonksiyon - API yerine direkt database
async function getBlog(slug: string): Promise<Blog | null> {
  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    
    const blog = await prisma.blog.findUnique({
      where: { id: slug }
    });
    
    await prisma.$disconnect();
    
    if (!blog) return null;
    
    return {
      ...blog,
      paragraphs: blog.paragraphs as Paragraph[] | undefined,
      createdAt: blog.createdAt.toISOString(),
      updatedAt: blog.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error('Blog fetch hatası:', error);
    // Hata durumunda null döndür, 500 hatası vermesin
    return null;
  }
}

// Dynamic metadata oluşturma
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const blog = await getBlog(params.slug);
    
    if (!blog) {
      return {
        title: 'Blog Bulunamadı | Moria Yazılım',
        description: 'Aradığınız blog bulunamadı.',
      };
    }

    const blogUrl = `https://www.moriayazilim.com/blog/${blog.id}`;
    
    // Görsel URL'sini tam URL yap
    const imageUrl = blog.image.startsWith('http') 
      ? blog.image 
      : `https://www.moriayazilim.com${blog.image}`;
    
    return {
      title: `${blog.title} | Moria Yazılım`,
      description: blog.desc,
      keywords: ['blog', 'yazılım', 'web tasarım', 'moria yazılım', blog.title],
      authors: [{ name: 'Moria Yazılım' }],
      creator: 'Moria Yazılım',
      publisher: 'Moria Yazılım',
      
      // Open Graph
      openGraph: {
        title: blog.title,
        description: blog.desc,
        url: blogUrl,
        siteName: 'Moria Yazılım',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ],
        locale: 'tr_TR',
        type: 'article',
        publishedTime: blog.createdAt,
        modifiedTime: blog.updatedAt,
        section: 'Technology',
        tags: ['yazılım', 'web tasarım', 'teknoloji'],
      },
      
      // Twitter Card
      twitter: {
        card: 'summary_large_image',
        title: blog.title,
        description: blog.desc,
        images: [imageUrl],
        creator: '@moriayazilim',
        site: '@moriayazilim',
      },
      
      // WhatsApp özel meta etiketleri
      other: {
        'whatsapp:title': blog.title,
        'whatsapp:description': blog.desc,
        'whatsapp:image': imageUrl,
        'whatsapp:url': blogUrl,
      },
      
      // Canonical URL
      alternates: {
        canonical: blogUrl,
      },
      
      // Robots
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  } catch (error) {
    console.error('Metadata generation hatası:', error);
    // Hata durumunda fallback metadata
    return {
      title: 'Blog | Moria Yazılım',
      description: 'Moria Yazılım blog yazıları',
    };
  }
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = await getBlog(params.slug);
  return <BlogDetailClient slug={params.slug} initialBlog={blog} />;
} 