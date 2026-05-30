# Görseller / Images

Bu klasör projede kullanılan tüm statik görseller içindir.
Next.js'te `public/` altındaki dosyalar tarayıcıdan kök yolundan erişilebilir.

Örnek:
- Dosya: `public/images/hero/panel.jpg`
- Kod içinde yolu: `/images/hero/panel.jpg`

## Önerilen klasör yapısı

```
public/images/
├── hero/             → Hero bölümündeki büyük akustik panel görseli
│   └── panel.jpg     (önerilen: 1200×1800, .jpg veya .webp)
│
├── interior/         → "Architecture that breathes quietly" sahnesi
│   └── living-room.jpg  (önerilen: 1920×1200)
│
├── products/         → Ürün kartları (5 adet)
│   ├── comfort-9.jpg
│   ├── trend-20.jpg
│   ├── mila-9.jpg
│   ├── wave.jpg
│   └── beats.jpg     (her biri önerilen: 900×1200, dikey 3:4)
│
└── manufacturing/    → "Crafted in Türkiye" fabrika sahnesi
    └── factory.jpg   (önerilen: 1200×1500)
```

## Format önerileri

- **Format:** `.webp` (en küçük dosya) veya `.jpg` (uyumluluk)
- **Hero & Manufacturing:** koyu / sinematik aydınlatma tercih edin
- **Products:** doğal meşe doku makro çekimi, dikey kompozisyon
- **Interior:** geniş açı modern oturma odası, doğal ışık

Görselleri buraya koyduktan sonra söyle, ben CSS ile çizilmiş sahneleri
gerçek `<Image>` bileşenleri ile değiştireyim.
