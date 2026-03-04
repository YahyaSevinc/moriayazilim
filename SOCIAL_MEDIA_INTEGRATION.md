# Sosyal Medya Entegrasyonu Rehberi

Bu rehber, blog sayfalarınızın X (Twitter), WhatsApp, Facebook ve LinkedIn gibi sosyal medya platformlarında güzel görünmesi için yapılan entegrasyonları açıklar.

## 🚀 Yapılan Değişiklikler

### 1. Dynamic Metadata (Blog Detay Sayfaları)
- `src/app/blog/[slug]/page.tsx` dosyasına `generateMetadata` fonksiyonu eklendi
- Her blog için özel meta etiketleri oluşturuluyor
- Open Graph, Twitter Card ve WhatsApp meta etiketleri dahil

### 2. Sosyal Medya Paylaşım Butonları
- `src/app/blog/[slug]/BlogDetailClient.tsx` dosyasına paylaşım butonları eklendi
- WhatsApp, X (Twitter), Facebook ve LinkedIn paylaşım linkleri

### 3. Ana Layout Meta Etiketleri
- `src/app/layout.tsx` dosyasına genel meta etiketleri eklendi

## 📋 Gerekli Ayarlar

### 1. Environment Variables
`.env.local` dosyası oluşturun ve aşağıdaki değişkeni ekleyin:

```env
NEXT_PUBLIC_BASE_URL=https://www.moriayazilim.com
```

### 2. Twitter Handle Güncellemesi
`src/app/blog/[slug]/page.tsx` dosyasında aşağıdaki satırları bulun ve gerçek Twitter handle'ınızla değiştirin:

```typescript
creator: '@moriayazilim', // Buraya gerçek Twitter handle'ınızı yazın
site: '@moriayazilim',
```

### 3. Ana Layout Twitter Handle
`src/app/layout.tsx` dosyasında da aynı şekilde güncelleyin:

```typescript
creator: '@moriayazilim',
site: '@moriayazilim',
```

## 🎯 Meta Etiketleri

### Open Graph Etiketleri
```html
<meta property="og:title" content="Blog Başlığı" />
<meta property="og:description" content="Blog açıklaması" />
<meta property="og:url" content="https://www.moriayazilim.com/blog/slug" />
<meta property="og:site_name" content="Moria Yazılım" />
<meta property="og:image" content="https://www.moriayazilim.com/blog-image.jpg" />
<meta property="og:type" content="article" />
<meta property="og:locale" content="tr_TR" />
```

### Twitter Card Etiketleri
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Blog Başlığı" />
<meta name="twitter:description" content="Blog açıklaması" />
<meta name="twitter:image" content="https://www.moriayazilim.com/blog-image.jpg" />
<meta name="twitter:creator" content="@moriayazilim" />
<meta name="twitter:site" content="@moriayazilim" />
```

### WhatsApp Özel Etiketleri
```html
<meta name="whatsapp:title" content="Blog Başlığı" />
<meta name="whatsapp:description" content="Blog açıklaması" />
<meta name="whatsapp:image" content="https://www.moriayazilim.com/blog-image.jpg" />
<meta name="whatsapp:url" content="https://www.moriayazilim.com/blog/slug" />
```

## 🧪 Test Etme

### 1. Facebook Debugger
- https://developers.facebook.com/tools/debug/ adresine gidin
- Blog URL'nizi test edin

### 2. Twitter Card Validator
- https://cards-dev.twitter.com/validator adresine gidin
- Blog URL'nizi test edin

### 3. WhatsApp Test
- WhatsApp'ta blog linkini paylaşın
- Preview'ın doğru göründüğünü kontrol edin

## 📱 Sosyal Medya Paylaşım Butonları

Blog detay sayfalarında aşağıdaki paylaşım butonları eklendi:

- **WhatsApp**: `https://wa.me/?text=...` formatında
- **X (Twitter)**: `https://twitter.com/intent/tweet?...` formatında
- **Facebook**: `https://www.facebook.com/sharer/sharer.php?...` formatında
- **LinkedIn**: `https://www.linkedin.com/sharing/share-offsite/?url=...` formatında

## 🔧 Gelişmiş Özellikler

### 1. Görsel Optimizasyonu
- Blog görselleri 1200x630 boyutunda olmalı (Open Graph standartı)
- Görsellerin alt text'leri blog başlığı ile aynı

### 2. SEO Optimizasyonu
- Canonical URL'ler eklendi
- Robots meta etiketleri optimize edildi
- Keywords meta etiketleri eklendi

### 3. Performance
- Server-side metadata generation
- Client-side hydration ile hızlı yükleme

## 🚨 Önemli Notlar

1. **Environment Variable**: `NEXT_PUBLIC_BASE_URL` mutlaka production URL'nizi içermeli
2. **Twitter Handle**: Gerçek Twitter handle'ınızı güncelleyin
3. **Görsel Boyutları**: Blog görselleri 1200x630 boyutunda olmalı
4. **Cache**: Meta etiketleri server-side generate edildiği için cache sorunları yaşanabilir

## 📈 Sonuç

Bu entegrasyon ile blog yazılarınız:
- ✅ X (Twitter)'da güzel card preview'ları gösterecek
- ✅ WhatsApp'ta zengin link preview'ları olacak
- ✅ Facebook'ta optimize edilmiş paylaşımlar yapabilecek
- ✅ LinkedIn'de profesyonel görünüm sağlayacak
- ✅ SEO performansı artacak

Her yeni blog yazısı otomatik olarak bu meta etiketleri alacak ve sosyal medyada güzel görünecektir.
