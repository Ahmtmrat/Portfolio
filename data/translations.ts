export type Lang = "en" | "tr";

/**
 * Lives here rather than in the provider: a `"use client"` module exports
 * client references to the server, not plain values, so `cookies().get()`
 * would silently receive a proxy instead of this string.
 */
export const LANG_COOKIE = "lang";

export function resolveLang(value: string | undefined): Lang {
  return value === "tr" ? "tr" : "en";
}

/**
 * English is primary; `tr` is typed as `Translations`, so a missing or
 * misspelled key is a compile error rather than a blank spot on the page.
 *
 * Section headlines end with a period — the one stylistic borrowing from the
 * product-page genre this design system is built on.
 */
const en = {
  nav: {
    about: "About",
    projects: "Projects",
    experience: "Experience",
    code: "Code",
    skills: "Skills",
    contact: "Contact",
    lets_talk: "Let's Talk",
    skip: "Skip to content",
    menu_open: "Open menu",
    menu_close: "Close menu",
    lang_switch: "Switch to Turkish",
    primary: "Primary navigation",
  },

  hero: {
    badge: "Available for opportunities",
    headline: "Building scalable systems & robust products.",
    lead: "Senior Software Engineer with 4.5+ years of production experience delivering enterprise systems across healthcare, fintech, logistics and industrial automation.",
    cta_projects: "View Projects",
    cta_contact: "Contact Me",
  },

  about: {
    eyebrow: "About",
    title: "Backend first, product always.",
    subtitle:
      "Software engineer with a strong focus on backend systems and architectural design. I thrive on solving complex problems and building products that scale efficiently while maintaining code quality and performance.",
    pillars: {
      backend: {
        eyebrow: "Backend Development",
        title: "APIs that hold under load.",
        body: "Robust REST services, distributed workers and scalable server architectures on modern .NET.",
      },
      integration: {
        eyebrow: "System Integration",
        title: "Devices, ERPs and hubs, in sync.",
        body: "Multi-service ecosystems handling real-time communication, device protocols and ERP connectors with fault tolerance.",
      },
      fullstack: {
        eyebrow: "Full-Stack Delivery",
        title: "REST design to React screen.",
        body: "End-to-end ownership — shipping production systems across healthcare, fintech and industrial domains.",
      },
    },
  },

  projects: {
    eyebrow: "Projects",
    title: "Explore the work.",
    subtitle: "Code sharing restricted — enterprise & regulated systems.",
    action: "Ask about the code",
    walkthrough: "Request a walkthrough",
    select: "Select project",
  },

  experience: {
    eyebrow: "Experience",
    title: "Four and a half years, shipped.",
    subtitle: "Professional background and key contributions.",
    current: "Current",
  },

  skills: {
    eyebrow: "Technical skills",
    title: "The stack, in full.",
    subtitle: "Technologies and tools I work with.",
  },

  code: {
    eyebrow: "Code samples",
    title: "Chosen for clarity, not complexity.",
    subtitle: "Selected snippets from production systems.",
    copy: "Copy",
    copied: "Copied",
    copy_label: "Copy code to clipboard",
    list_label: "Code samples",
  },

  contact: {
    eyebrow: "Contact",
    title: "Let's work together.",
    subtitle:
      "I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out.",
    email_me: "Email Me",
    linkedin: "LinkedIn",
    github: "GitHub",
    chips: ["Istanbul, Turkey", "Remote / hybrid", "EN · TR"],
    form: {
      name: "Name",
      email: "Email",
      message: "What are you building?",
      send: "Send message",
      hint: "Opens your mail client with the message filled in.",
      subject: "Portfolio enquiry",
    },
  },

  footer: {
    note: "Senior Software Engineer — .NET, React, distributed systems. Istanbul, Turkey.",
    email: "Email",
    legal: "All rights reserved.",
    built: "Built with Next.js & Tailwind CSS",
  },

  snippets: {
    perf_middleware: {
      title: "Performance Timing Middleware",
      description:
        "Every request is wrapped with a Stopwatch. Elapsed time is pushed into Serilog's LogContext with IsPerf=true, routing it to a dedicated performance sink — completely separate from the application log.",
    },
    exception_handler: {
      title: "Global Exception Handler",
      description:
        "A single extension method centralises all exception-to-HTTP-status mapping. C# switch expressions keep the mapping declarative and exhaustive — no scattered try/catch blocks in controllers.",
    },
    autofac_module: {
      title: "Autofac IoC — Assembly Scan",
      description:
        "Generic registrations for Repository, Service, UoW, and adapters are handled in one Autofac module. Convention-based assembly scanning eliminates per-class registration — any new class ending in Repository, Service, Generator, or Resolver is wired automatically.",
    },
    jwt_token: {
      title: "JWT — Access + Refresh Token",
      description:
        "Access tokens are signed with HMAC-SHA256 and carry NameIdentifier, Name, Role, and per-audience claims. Refresh tokens are generated with RandomNumberGenerator.GetBytes — no Math.Random, no Guid.",
    },
    can_bus: {
      title: "CAN Bus Frame — Send / Receive",
      description:
        "A SocketCAN wrapper that packs a 16-byte can_frame directly onto the stack with stackalloc — no heap allocation per message. Extended (J1939, 29-bit) and standard (11-bit) IDs are resolved via bit-mask at call time.",
    },
    cqrs_handler: {
      title: "CQRS — MediatR Query Handler",
      description:
        "A vertical-slice query handler using MediatR. AutoMapper's ProjectTo pushes the projection into SQL — no over-fetching. The handler owns its query shape and never leaks domain entities outward.",
    },
    signalr_hub: {
      title: "SignalR Hub — Role-Based Groups",
      description:
        "A typed SignalR Hub that tracks online users in a ConcurrentDictionary and routes every connection into its role group on connect. State is cleaned up automatically on disconnect — no stale connection IDs.",
    },
    erp_worker: {
      title: "Worker Service — Periodic ERP Sync",
      description:
        "A BackgroundService driven by PeriodicTimer (no Thread.Sleep, no timer drift). Each tick opens a fresh DI scope so the EF Core DbContext is never shared across iterations. Failures are logged and swallowed — the worker keeps running.",
    },
    quartz_job: {
      title: "Quartz.NET — Scheduled Visitor Sync",
      description:
        "DisallowConcurrentExecution prevents overlapping runs when a sync cycle outlasts its schedule. Each visitor is validated independently against SmartID — one failure does not abort the batch.",
    },
    permission_auth: {
      title: "Endpoint Authorization — Permission Claims",
      description:
        "A claim-based permission system built on the ASP.NET Core authorization pipeline. A custom attribute maps to a policy derived from the permission value; the handler checks the user's permission claims — roles alone are too coarse.",
    },
    request_response_log: {
      title: "Request / Response Logging Middleware",
      description:
        "Captures method, path, status code, and elapsed time for every HTTP request. The response body is buffered through a MemoryStream so it can be read without being consumed; the original stream is restored before the response is sent. Sensitive headers are masked.",
    },
  },

  cv: {
    personal: {
      title: "Senior Software Engineer",
      subtitle: "Backend & System Architecture",
    },

    metrics: {
      projects: "Production Projects",
      integrations: "Device Integrations",
      years: "Years in Production",
    },

    experiences: {
      filossoft: {
        role: "Senior Software Engineer",
        bullets: [
          "Architected a distributed system of 5 independent services: central REST API (100+ endpoints), React SPA, medical device communicator, ERP integration and print service",
          "Built 6 medical device communication modules (TCP/IP & Serial Port) with real-time result ingestion and race condition handling",
          "Implemented JWT authentication with HMAC-SHA256 tokens, RandomNumberGenerator-based refresh tokens and multi-audience support",
          "Designed an internal message queue (MQMS) supporting mail, print, e-signature and inter-service messaging",
          "Integrated WCF/SOAP government services (identity verification, digital signing)",
          "Built performance monitoring middleware with dual-sink Serilog logging per request",
          "Developed statistical reporting, invoice management and patient admission modules on the React frontend",
          "Sole developer of a visitor and access control system for a financial institution; migrated the database from SQLite to PostgreSQL under production load",
          "Integrated scheduled sync jobs (Quartz.NET), real-time notifications (SignalR), AntiXSS protection and domain restriction middleware",
          "Built a cross-platform desktop app for agricultural machinery telemetry with MVVM architecture, map visualization and Clean Architecture layers",
          "Developed a Logo ERP synchronization service via COM interop and an MS SQL Server data pipeline",
        ],
      },
      d1tech: {
        role: "Software Engineer",
        bullets: [
          "Developed inventory and operational management systems; optimized MS SQL Server query performance and data processing pipelines",
        ],
      },
      bilisim: {
        role: "Software Developer",
        bullets: [
          "Built e-commerce and order management platforms with payment and billing integrations across the full SDLC",
        ],
      },
    },

    projects: {
      lis: {
        label: "Lab System",
        eyebrow: "Healthcare",
        title: "Laboratory Information System",
        description:
          "Enterprise-grade LIS platform with distributed architecture. Central REST API serving 100+ endpoints, connected to a React SPA, medical device communicator, ERP integration and print service — coordinated via SignalR and an internal message queue.",
      },
      acc: {
        label: "Access Platform",
        eyebrow: "Fintech",
        title: "Access Management Platform",
        description:
          "Visitor and access control system for a financial institution. ASP.NET MVC with SmartID integration, scheduled data sync and real-time event notifications.",
      },
      iot: {
        label: "Industrial IoT",
        eyebrow: "Industrial",
        title: "Industrial IoT Desktop Application",
        description:
          "Cross-platform desktop app for agricultural machinery telemetry over CAN Bus (J1939/CANopen), with GPS and sensor visualization on live maps.",
      },
      erp: {
        label: "ERP Sync",
        eyebrow: "Logistics",
        title: "ERP Integration Service",
        description:
          "Worker Service that synchronizes financial and operational data with Logo ERP via COM interop with structured Serilog logging.",
      },
      prt: {
        label: "Print Service",
        eyebrow: "Healthcare",
        title: "Print & Barcode Service",
        description:
          "Dedicated print management Worker Service handling barcode generation and multi-template PDF printing triggered via SignalR.",
      },
    },

    skillCategories: {
      backend: "Backend",
      frontend: "Frontend",
      databases: "Databases",
      architecture: "Architecture",
      integration: "Integration",
      tools: "Tools & DevOps",
    },
  },
};

export type Translations = typeof en;

const tr: Translations = {
  nav: {
    about: "Hakkımda",
    projects: "Projeler",
    experience: "Deneyim",
    code: "Kod",
    skills: "Beceriler",
    contact: "İletişim",
    lets_talk: "İletişime Geç",
    skip: "İçeriğe atla",
    menu_open: "Menüyü aç",
    menu_close: "Menüyü kapat",
    lang_switch: "İngilizceye geç",
    primary: "Ana menü",
  },

  hero: {
    badge: "Yeni fırsatlara açık",
    headline: "Ölçeklenebilir sistemler ve güçlü ürünler kuruyorum.",
    lead: "Sağlık bilişimi, fintek, lojistik ve endüstriyel otomasyon alanlarında kurumsal sistemler geliştiren, 4,5+ yıllık üretim deneyimine sahip Kıdemli Yazılım Mühendisi.",
    cta_projects: "Projeleri Gör",
    cta_contact: "İletişime Geç",
  },

  about: {
    eyebrow: "Hakkımda",
    title: "Önce backend, her zaman ürün.",
    subtitle:
      "Backend sistemleri ve mimari tasarım odaklı yazılım mühendisi. Karmaşık sorunları çözmek ve kod kalitesini korurken verimli ölçeklenen ürünler geliştirmek benim için tutkudan öte.",
    pillars: {
      backend: {
        eyebrow: "Backend Geliştirme",
        title: "Yük altında ayakta kalan API'ler.",
        body: "Modern .NET üzerinde güçlü REST servisleri, dağıtık arka plan işçileri ve ölçeklenebilir sunucu mimarileri.",
      },
      integration: {
        eyebrow: "Sistem Entegrasyonu",
        title: "Cihazlar, ERP'ler ve hub'lar; senkron.",
        body: "Gerçek zamanlı iletişim, cihaz protokolleri ve ERP bağlantılarını hata toleransıyla yöneten çok servisli ekosistemler.",
      },
      fullstack: {
        eyebrow: "Tam Yığın Teslimat",
        title: "REST tasarımından React ekranına.",
        body: "Uçtan uca sahiplik — sağlık bilişimi, fintek ve endüstriyel alanlarda üretim sistemleri.",
      },
    },
  },

  projects: {
    eyebrow: "Projeler",
    title: "İşlere göz atın.",
    subtitle: "Kod paylaşımı kısıtlıdır — kurumsal ve düzenlenmiş sistemler.",
    action: "Kod hakkında sorun",
    walkthrough: "Detaylı anlatım isteyin",
    select: "Proje seçin",
  },

  experience: {
    eyebrow: "Deneyim",
    title: "Dört buçuk yıl, sahaya çıkmış işler.",
    subtitle: "Profesyonel geçmiş ve temel katkılar.",
    current: "Devam ediyor",
  },

  skills: {
    eyebrow: "Teknik beceriler",
    title: "Kullandığım yığının tamamı.",
    subtitle: "Birlikte çalıştığım teknolojiler ve araçlar.",
  },

  code: {
    eyebrow: "Kod örnekleri",
    title: "Karmaşıklık için değil, netlik için seçildi.",
    subtitle: "Üretim sistemlerinden seçilmiş snippet'lar.",
    copy: "Kopyala",
    copied: "Kopyalandı",
    copy_label: "Kodu panoya kopyala",
    list_label: "Kod örnekleri",
  },

  contact: {
    eyebrow: "İletişim",
    title: "Birlikte çalışalım.",
    subtitle:
      "Yeni projeler ve fırsatlar hakkında konuşmaya her zaman açığım. Bir sorunuz varsa ya da sadece merhaba demek istiyorsanız, çekinmeden yazın.",
    email_me: "E-posta Gönder",
    linkedin: "LinkedIn",
    github: "GitHub",
    chips: ["İstanbul, Türkiye", "Uzaktan / hibrit", "EN · TR"],
    form: {
      name: "Ad",
      email: "E-posta",
      message: "Ne geliştiriyorsunuz?",
      send: "Mesajı gönder",
      hint: "Mesaj doldurulmuş hâlde e-posta uygulamanızı açar.",
      subject: "Portfolyo üzerinden iletişim",
    },
  },

  footer: {
    note: "Kıdemli Yazılım Mühendisi — .NET, React, dağıtık sistemler. İstanbul, Türkiye.",
    email: "E-posta",
    legal: "Tüm hakları saklıdır.",
    built: "Next.js & Tailwind CSS ile geliştirildi",
  },

  snippets: {
    perf_middleware: {
      title: "Performans Zamanlama Middleware",
      description:
        "Her istek bir Stopwatch ile sarmalanır. Geçen süre, Serilog'un LogContext'ine IsPerf=true özelliğiyle eklenerek uygulama loglarından tamamen ayrı, özel bir performans akışına yönlendirilir.",
    },
    exception_handler: {
      title: "Global Exception Handler",
      description:
        "Tek bir extension method, tüm exception-HTTP durum kodu eşlemesini merkezileştirir. C# switch ifadeleri eşlemeyi bildirimsel ve kapsamlı tutar — controller'larda dağınık try/catch bloğu olmaz.",
    },
    autofac_module: {
      title: "Autofac IoC — Assembly Tarama",
      description:
        "Repository, Service, UoW ve adapter'lar için genel kayıtlar tek bir Autofac modülünde yönetilir. Convention tabanlı assembly taraması, sınıf başına kayıt zorunluluğunu ortadan kaldırır — Repository, Service, Generator veya Resolver ile biten her yeni sınıf otomatik olarak bağlanır.",
    },
    jwt_token: {
      title: "JWT — Erişim + Yenileme Token'ı",
      description:
        "Erişim token'ları HMAC-SHA256 ile imzalanır ve NameIdentifier, Name, Role ile hedef kitle claim'lerini taşır. Yenileme token'ları RandomNumberGenerator.GetBytes ile üretilir — Math.Random veya Guid kullanılmaz.",
    },
    can_bus: {
      title: "CAN Bus Frame — Gönder / Al",
      description:
        "16 byte'lık can_frame'i stackalloc ile doğrudan stack'e yerleştiren bir SocketCAN sarmalayıcı — mesaj başına heap tahsisi yok. Extended (J1939, 29-bit) ve standart (11-bit) ID'ler çağrı zamanında bit maskesi ile çözümlenir.",
    },
    cqrs_handler: {
      title: "CQRS — MediatR Query Handler",
      description:
        "MediatR kullanan dikey dilim sorgu işleyicisi. AutoMapper ProjectTo, projeksiyon sorgusunu doğrudan SQL'e iter — fazla veri çekilmez. Handler kendi sorgu şeklini yönetir ve domain entity'leri asla dışarı sızdırmaz.",
    },
    signalr_hub: {
      title: "SignalR Hub — Role Bazlı Gruplar",
      description:
        "Çevrimiçi kullanıcıları ConcurrentDictionary'de izleyen ve her bağlantıyı bağlanma anında rol grubuna yönlendiren tipli SignalR Hub'ı. Bağlantı kesilmelerinde durum otomatik temizlenir — eski bağlantı ID'si kalmaz.",
    },
    erp_worker: {
      title: "Worker Service — Periyodik ERP Senkronizasyonu",
      description:
        "PeriodicTimer kullanan BackgroundService (Thread.Sleep yok, zamanlayıcı kayması yok). Her tetiklemede yeni DI scope açılır; EF Core DbContext döngüler arasında paylaşılmaz. Hatalar loglanır ve yutulur — worker çalışmaya devam eder.",
    },
    quartz_job: {
      title: "Quartz.NET — Zamanlanmış Ziyaretçi Senkronizasyonu",
      description:
        "DisallowConcurrentExecution, bir sync döngüsü zamanlamasını aşarsa çakışan çalışmaları engeller. Her ziyaretçi SmartID'ye karşı bağımsız doğrulanır — tek hata toplu işlemi durdurmaz.",
    },
    permission_auth: {
      title: "Endpoint Yetkilendirme — Permission Claim'leri",
      description:
        "ASP.NET Core yetkilendirme pipeline'ı üzerine inşa edilmiş claim tabanlı izin sistemi. Özel bir attribute, izin değerinden türetilen bir policy'ye eşlenir; handler kullanıcının permission claim'lerini kontrol eder — roller tek başına çok kaba kalır.",
    },
    request_response_log: {
      title: "Request / Response Loglama Middleware",
      description:
        "Her HTTP isteği için method, path, durum kodu ve geçen süreyi yakalar. Response body, tüketilmeden okunabilmesi için MemoryStream üzerinden tamponlanır; orijinal stream gönderimden önce geri yüklenir. Hassas header'lar maskelenir.",
    },
  },

  cv: {
    personal: {
      title: "Kıdemli Yazılım Mühendisi",
      subtitle: "Backend ve Sistem Mimarisi",
    },

    metrics: {
      projects: "Üretim Projesi",
      integrations: "Cihaz Entegrasyonu",
      years: "Yıllık Üretim Deneyimi",
    },

    experiences: {
      filossoft: {
        role: "Kıdemli Yazılım Mühendisi",
        bullets: [
          "5 bağımsız servisten oluşan dağıtık sistem mimarisi kurgulandı: merkezi REST API (100+ endpoint), React SPA, tıbbi cihaz iletişimci, ERP entegrasyonu ve baskı servisi",
          "Gerçek zamanlı sonuç işleme ve yarış koşulu yönetimiyle 6 tıbbi cihaz iletişim modülü geliştirildi (TCP/IP ve Seri Port)",
          "HMAC-SHA256 token, RandomNumberGenerator tabanlı yenileme token ve çoklu hedef kitle desteğiyle JWT kimlik doğrulama uygulandı",
          "Posta, baskı, e-imza ve servisler arası mesajlaşmayı destekleyen dahili mesaj kuyruğu (MQMS) tasarlandı",
          "WCF/SOAP devlet servisleri entegre edildi (kimlik doğrulama, dijital imza)",
          "İstek başına çift havuzlu Serilog kaydıyla performans izleme middleware'i geliştirildi",
          "React frontend'de istatistiksel raporlama, fatura yönetimi ve hasta kabul modülleri geliştirildi",
          "Bir finansal kurum için ziyaretçi ve erişim kontrol sisteminin tek geliştiricisi; veritabanı üretim yükü altında SQLite'tan PostgreSQL'e taşındı",
          "Zamanlanmış senkronizasyon görevleri (Quartz.NET), gerçek zamanlı bildirimler (SignalR), AntiXSS koruması ve domain kısıtlama middleware'i entegre edildi",
          "MVVM mimarisi, harita görselleştirme ve Temiz Mimari katmanlarıyla tarım makinesi telemetrisi için çapraz platform masaüstü uygulaması geliştirildi",
          "COM interop ve MS SQL Server veri hattı üzerinden Logo ERP senkronizasyon servisi geliştirildi",
        ],
      },
      d1tech: {
        role: "Yazılım Mühendisi",
        bullets: [
          "Stok ve operasyonel yönetim sistemleri geliştirildi; MS SQL Server sorgu performansı ve veri işleme hatları optimize edildi",
        ],
      },
      bilisim: {
        role: "Yazılım Geliştirici",
        bullets: [
          "SDLC boyunca ödeme ve fatura entegrasyonlarıyla e-ticaret ve sipariş yönetimi platformları geliştirildi",
        ],
      },
    },

    projects: {
      lis: {
        label: "Laboratuvar Sistemi",
        eyebrow: "Sağlık Bilişimi",
        title: "Laboratuvar Bilgi Sistemi",
        description:
          "Dağıtık mimariye sahip kurumsal ölçekli LIS platformu. 100+ endpoint sunan merkezi REST API; React SPA, tıbbi cihaz iletişimci, ERP entegrasyonu ve baskı servisine bağlanıyor — SignalR ve dahili mesaj kuyruğuyla koordineli çalışıyor.",
      },
      acc: {
        label: "Erişim Platformu",
        eyebrow: "Fintek",
        title: "Erişim Yönetim Platformu",
        description:
          "Bir finans kurumu için ziyaretçi ve erişim kontrol sistemi. SmartID entegrasyonlu ASP.NET MVC, zamanlanmış veri senkronizasyonu ve gerçek zamanlı olay bildirimleri.",
      },
      iot: {
        label: "Endüstriyel IoT",
        eyebrow: "Endüstriyel",
        title: "Endüstriyel IoT Masaüstü Uygulaması",
        description:
          "CAN Bus (J1939/CANopen) üzerinden tarım makinesi telemetrisi için çapraz platform masaüstü uygulaması; GPS ve sensör verilerini canlı haritalarda görselleştirir.",
      },
      erp: {
        label: "ERP Senkronizasyonu",
        eyebrow: "Lojistik",
        title: "ERP Entegrasyon Servisi",
        description:
          "Finansal ve operasyonel verileri Logo ERP ile COM interop üzerinden senkronize eden, yapılandırılmış Serilog kaydıyla Worker Service.",
      },
      prt: {
        label: "Baskı Servisi",
        eyebrow: "Sağlık Bilişimi",
        title: "Baskı ve Barkod Servisi",
        description:
          "SignalR üzerinden tetiklenen barkod üretimi ve çok şablonlu PDF baskısını yöneten özel baskı Worker Service.",
      },
    },

    skillCategories: {
      backend: "Backend",
      frontend: "Ön Yüz",
      databases: "Veritabanları",
      architecture: "Mimari",
      integration: "Entegrasyon",
      tools: "Araçlar & DevOps",
    },
  },
};

export const translations: Record<Lang, Translations> = { en, tr };
