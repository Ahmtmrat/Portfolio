export type Lang = "en" | "tr";

export const translations = {
  en: {
    nav: {
      experience: "Experience",
      projects: "Projects",
      code: "Code",
      skills: "Skills",
      contact: "Contact",
    },
    hero: {
      badge: "Available for opportunities",
      cta_contact: "Get in touch",
      cta_experience: "View experience",
    },
    experience: {
      title: "Experience",
      subtitle: "Professional background and key contributions",
    },
    projects: {
      title: "Projects",
      restricted: "Code sharing restricted — enterprise & regulated systems",
      status_production: "Production",
    },
    code: {
      title: "Code Samples",
      subtitle: "Selected snippets from production systems — chosen for clarity, not complexity.",
    },
    skills: {
      title: "Technical Skills",
    },
    contact: {
      title: "Contact",
      subtitle: "Open to new opportunities, collaborations, and interesting conversations.",
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      built: "Built with Next.js · Deployed on Vercel",
    },
    snippets: {
      perf_middleware: {
        title: "Performance Timing Middleware",
        description: "Every request is wrapped with a Stopwatch. Elapsed time is pushed into Serilog's LogContext with IsPerf=true, routing it to a dedicated performance sink — completely separate from the application log.",
      },
      exception_handler: {
        title: "Global Exception Handler",
        description: "A single extension method centralises all exception-to-HTTP-status mapping. C# switch expressions keep the mapping declarative and exhaustive — no scattered try/catch blocks in controllers.",
      },
      autofac_module: {
        title: "Autofac IoC — Assembly Scan",
        description: "Generic registrations for Repository, Service, UoW, and adapters are handled in one Autofac module. Convention-based assembly scanning eliminates per-class registration — any new class ending in Repository, Service, Generator, or Resolver is wired automatically.",
      },
      jwt_token: {
        title: "JWT — Access + Refresh Token",
        description: "Access tokens are signed with HMAC-SHA256 and carry NameIdentifier, Name, Role, and per-audience claims. Refresh tokens are generated with RandomNumberGenerator.GetBytes — no Math.Random, no Guid.",
      },
      can_bus: {
        title: "CAN Bus Frame — Send / Receive",
        description: "A SocketCAN wrapper that packs a 16-byte can_frame directly onto the stack with stackalloc — no heap allocation per message. Extended (J1939, 29-bit) and standard (11-bit) IDs are resolved via bit-mask at call time.",
      },
      cqrs_handler: {
        title: "CQRS — MediatR Query Handler",
        description: "A vertical-slice query handler using MediatR. AutoMapper ProjectTo pushes the projection down to SQL — no over-fetching. The handler owns its own query shape and never leaks domain entities to callers.",
      },
      signalr_hub: {
        title: "SignalR Hub — Role-Based Groups",
        description: "Typed SignalR hub that tracks online users in a ConcurrentDictionary and routes each connection into a role group on connect. Disconnects clean up state automatically — no stale connection IDs.",
      },
      erp_worker: {
        title: "Worker Service — Periodic ERP Sync",
        description: "BackgroundService using PeriodicTimer (no Thread.Sleep, no timer drift). Each tick opens a fresh DI scope so EF Core DbContext is never shared across cycles. Errors are logged and swallowed — the worker keeps running.",
      },
      quartz_job: {
        title: "Quartz.NET — Scheduled Visitor Sync",
        description: "DisallowConcurrentExecution prevents overlapping runs if a sync cycle exceeds its schedule. Each visitor is verified against SmartID independently — one failure does not abort the batch.",
      },
      permission_auth: {
        title: "Endpoint Authorization — Permission Claims",
        description: "Claim-based permission system built on ASP.NET Core's authorization pipeline. A custom attribute maps to a named policy; the handler checks the user's permission claims — roles alone are too coarse for a multi-tenant medical system.",
      },
      request_response_log: {
        title: "Request / Response Logging Middleware",
        description: "Captures method, path, status code and elapsed time for every HTTP transaction. Response body is buffered through a MemoryStream so it can be read without consuming it. Sensitive headers are masked.",
      },
    },
    cv: {
      personal: {
        title: "Senior Software Engineer",
        subtitle: "Backend & System Architecture",
        summary: [
          "Senior Software Engineer with 4.5+ years of production experience delivering enterprise systems across healthcare, fintech, logistics, and industrial automation.",
          "Specializes in distributed service architectures, real-time communication, and full-stack .NET + React development. Designed and shipped multi-service systems from architecture to production — covering REST APIs, frontend SPAs, background workers, device integrations, and ERP connectors.",
        ],
      },
      metrics: ["Production Projects", "Device Integrations"],
      experiences: [
        {
          projects: [
            {
              bullets: [
                "Architected a distributed system of 5 independent services: central REST API (100+ endpoints), React SPA, medical device communicator, ERP integration, and print service",
                "Built 6 medical device communication modules (TCP/IP & Serial Port) with real-time result ingestion and race condition handling",
                "Implemented JWT authentication with HMAC-SHA256 tokens, RandomNumberGenerator-based refresh tokens, and multi-audience support",
                "Designed an internal message queue (MQMS) supporting mail, print, e-signature, and inter-service messaging",
                "Integrated WCF/SOAP government services (identity verification, digital signing)",
                "Built performance monitoring middleware with dual-sink Serilog logging per request",
                "Developed statistical reporting, invoice management, and patient admission modules on React frontend",
              ],
            },
            {
              bullets: [
                "Sole developer of a visitor and access control system for a financial institution; migrated database from SQLite to PostgreSQL under production load",
                "Integrated scheduled sync jobs (Quartz.NET), real-time notifications (SignalR), AntiXSS protection, and domain restriction middleware",
              ],
            },
            {
              bullets: [
                "Cross-platform desktop app for agricultural machinery telemetry with MVVM architecture, map visualization, and Clean Architecture layers",
              ],
            },
            {
              bullets: [
                "Logo ERP synchronization service via COM interop and MS SQL Server data pipeline",
              ],
            },
          ],
        },
        {
          projects: [
            {
              bullets: [
                "Developed inventory and operational management systems; optimized MS SQL Server query performance and data processing pipelines",
              ],
            },
          ],
        },
        {
          projects: [
            {
              bullets: [
                "Built e-commerce and order management platforms with payment and billing integrations across the full SDLC",
              ],
            },
          ],
        },
      ],
      projects: [
        {
          title: "Laboratory Information System",
          domain: "Healthcare",
          description: "Enterprise-grade LIS platform with distributed architecture. Central REST API serving 100+ endpoints, connected to a React SPA, medical device communicator, ERP integration, and print service — coordinated via SignalR and an internal message queue.",
          highlights: ["5 services", "6 device integrations", "Real-time", "WCF/SOAP"],
          tech: [".NET", "React", "TypeScript", "PostgreSQL", "SignalR", "EF Core", "MediatR"],
        },
        {
          title: "Access Management Platform",
          domain: "Fintech / Security",
          description: "Visitor and access control system for a financial institution. ASP.NET MVC with SmartID integration, scheduled data sync, and real-time event notifications.",
          highlights: ["Sole developer", "Zero-downtime migration", "AntiXSS", "Domain middleware"],
          tech: [".NET", "ASP.NET MVC", "PostgreSQL", "Quartz.NET", "SignalR"],
        },
        {
          title: "Industrial IoT Desktop Application",
          domain: "AgriTech / Industrial",
          description: "Cross-platform desktop app for agricultural machinery telemetry over CAN Bus (J1939/CANopen), with GPS and sensor visualization on live maps.",
          highlights: ["Cross-platform", "CAN Bus telemetry", "Map visualization", "Clean Arch"],
          tech: [".NET", "Avalonia UI", "CAN Bus J1939", "EF Core", "MVVM", "Mapsui"],
        },
        {
          title: "ERP Integration Service",
          domain: "Logistics / Finance",
          description: "Worker Service that synchronizes financial and operational data with Logo ERP via COM interop with structured Serilog logging.",
          highlights: ["Automated sync", "Error recovery", "Structured logging"],
          tech: [".NET", "Worker Service", "MS SQL Server", "COM Interop", "Serilog"],
        },
        {
          title: "Print & Barcode Service",
          domain: "Healthcare",
          description: "Dedicated print management Worker Service handling barcode generation and multi-template PDF printing triggered via SignalR.",
          highlights: ["Multi-template", "Barcode gen", "Queue-based"],
          tech: [".NET", "Worker Service", "SignalR", "FreeSpire.Barcode", "PdfiumViewer"],
        },
      ],
      skillCategories: {
        "Backend":        "Backend",
        "Frontend":       "Frontend",
        "Databases":      "Databases",
        "Architecture":   "Architecture",
        "Integration":    "Integration",
        "Tools & DevOps": "Tools & DevOps",
      },
    },
  },

  tr: {
    nav: {
      experience: "Deneyim",
      projects: "Projeler",
      code: "Kod",
      skills: "Beceriler",
      contact: "İletişim",
    },
    hero: {
      badge: "Yeni fırsatlara açık",
      cta_contact: "İletişime geç",
      cta_experience: "Deneyimi gör",
    },
    experience: {
      title: "Deneyim",
      subtitle: "Profesyonel geçmiş ve temel katkılar",
    },
    projects: {
      title: "Projeler",
      restricted: "Kod paylaşımı kısıtlıdır — kurumsal ve düzenlenmiş sistemler",
      status_production: "Yayında",
    },
    code: {
      title: "Kod Örnekleri",
      subtitle: "Üretim sistemlerinden seçilmiş snippet'lar — karmaşıklık değil, netlik ön planda.",
    },
    skills: {
      title: "Teknik Beceriler",
    },
    contact: {
      title: "İletişim",
      subtitle: "Yeni fırsatlara, iş birliklerine ve ilgi çekici sohbetlere açığım.",
      email: "E-posta",
      linkedin: "LinkedIn",
      github: "GitHub",
      built: "Next.js ile geliştirildi · Vercel üzerinde yayında",
    },
    snippets: {
      perf_middleware: {
        title: "Performans Zamanlama Middleware",
        description: "Her istek bir Stopwatch ile sarmalanır. Geçen süre, Serilog'un LogContext'ine IsPerf=true özelliğiyle eklenerek uygulama loglarından tamamen ayrı, özel bir performans akışına yönlendirilir.",
      },
      exception_handler: {
        title: "Global Exception Handler",
        description: "Tek bir extension method, tüm exception-HTTP durum kodu eşlemesini merkezileştirir. C# switch ifadeleri eşlemeyi bildirimsel ve kapsamlı tutar — controller'larda dağınık try/catch bloğu olmaz.",
      },
      autofac_module: {
        title: "Autofac IoC — Assembly Tarama",
        description: "Repository, Service, UoW ve adapter'lar için genel kayıtlar tek bir Autofac modülünde yönetilir. Convention tabanlı assembly taraması, sınıf başına kayıt zorunluluğunu ortadan kaldırır — Repository, Service, Generator veya Resolver ile biten her yeni sınıf otomatik olarak bağlanır.",
      },
      jwt_token: {
        title: "JWT — Erişim + Yenileme Token'ı",
        description: "Erişim token'ları HMAC-SHA256 ile imzalanır ve NameIdentifier, Name, Role ile hedef kitle claim'lerini taşır. Yenileme token'ları RandomNumberGenerator.GetBytes ile üretilir — Math.Random veya Guid kullanılmaz.",
      },
      can_bus: {
        title: "CAN Bus Frame — Gönder / Al",
        description: "16 byte'lık can_frame'i stackalloc ile doğrudan stack'e yerleştiren bir SocketCAN sarmalayıcı — mesaj başına heap tahsisi yok. Extended (J1939, 29-bit) ve standart (11-bit) ID'ler çağrı zamanında bit maskesi ile çözümlenir.",
      },
      cqrs_handler: {
        title: "CQRS — MediatR Query Handler",
        description: "MediatR kullanan dikey dilim sorgu işleyicisi. AutoMapper ProjectTo, projeksiyon sorgusunu doğrudan SQL'e iter — fazla veri çekilmez. Handler kendi sorgu şeklini yönetir ve domain entity'leri asla dışarı sızdırmaz.",
      },
      signalr_hub: {
        title: "SignalR Hub — Role Bazlı Gruplar",
        description: "Çevrimiçi kullanıcıları ConcurrentDictionary'de izleyen ve her bağlantıyı bağlanma anında rol grubuna yönlendiren tipli SignalR Hub'ı. Bağlantı kesilmelerinde durum otomatik temizlenir — eski bağlantı ID'si kalmaz.",
      },
      erp_worker: {
        title: "Worker Service — Periyodik ERP Senkronizasyonu",
        description: "PeriodicTimer kullanan BackgroundService (Thread.Sleep yok, zamanlayıcı kayması yok). Her tetiklemede yeni DI scope açılır; EF Core DbContext döngüler arasında paylaşılmaz. Hatalar loglanır ve yutulur — worker çalışmaya devam eder.",
      },
      quartz_job: {
        title: "Quartz.NET — Zamanlanmış Ziyaretçi Senkronizasyonu",
        description: "DisallowConcurrentExecution, bir sync döngüsü zamanlamasını aşarsa çakışan çalışmaları engeller. Her ziyaretçi SmartID'ye karşı bağımsız doğrulanır — tek hata toplu işlemi durdurmaz.",
      },
      permission_auth: {
        title: "Endpoint Yetkilendirme — Permission Claim'leri",
        description: "ASP.NET Core yetkilendirme pipeline'ı üzerine inşa edilmiş claim tabanlı izin sistemi. Özel bir attribute, izin değerinden türetilen bir policy'ye eşlenir; handler kullanıcının permission claim'lerini kontrol eder — roller tek başına çok kaba kalır.",
      },
      request_response_log: {
        title: "Request / Response Loglama Middleware",
        description: "Her HTTP isteği için method, path, durum kodu ve geçen süreyi yakalar. Response body, tüketilmeden okunabilmesi için MemoryStream üzerinden tamponlanır; orijinal stream gönderimden önce geri yüklenir. Hassas header'lar maskelenir.",
      },
    },
    cv: {
      personal: {
        title: "Kıdemli Yazılım Mühendisi",
        subtitle: "Backend ve Sistem Mimarisi",
        summary: [
          "Sağlık bilişimi, fintek, lojistik ve endüstriyel otomasyon alanlarında kurumsal sistemler geliştiren, 4,5+ yıllık üretim deneyimine sahip Kıdemli Yazılım Mühendisi.",
          "Dağıtık servis mimarileri, gerçek zamanlı iletişim ve tam yığın .NET + React geliştirme konularında uzmanlaşmıştır. Mimari tasarımdan üretime kadar çok servisli sistemler kurmuş; REST API'ler, frontend SPA'lar, arka plan işçileri, cihaz entegrasyonları ve ERP bağlantıları geliştirmiştir.",
        ],
      },
      metrics: ["Üretim Projesi", "Cihaz Entegrasyonu"],
      experiences: [
        {
          projects: [
            {
              bullets: [
                "5 bağımsız servisten oluşan dağıtık sistem mimarisi kurgulandı: merkezi REST API (100+ endpoint), React SPA, tıbbi cihaz iletişimci, ERP entegrasyonu ve baskı servisi",
                "Gerçek zamanlı sonuç işleme ve yarış koşulu yönetimiyle 6 tıbbi cihaz iletişim modülü geliştirildi (TCP/IP ve Seri Port)",
                "HMAC-SHA256 token, RandomNumberGenerator tabanlı yenileme token ve çoklu hedef kitle desteğiyle JWT kimlik doğrulama uygulandı",
                "Posta, baskı, e-imza ve servisler arası mesajlaşmayı destekleyen dahili mesaj kuyruğu (MQMS) tasarlandı",
                "WCF/SOAP devlet servisleri entegre edildi (kimlik doğrulama, dijital imza)",
                "İstek başına çift havuzlu Serilog kaydıyla performans izleme middleware'i geliştirildi",
                "React frontend'de istatistiksel raporlama, fatura yönetimi ve hasta kabul modülleri geliştirildi",
              ],
            },
            {
              bullets: [
                "Bir finansal kurum için ziyaretçi ve erişim kontrol sisteminin tek geliştiricisi; veritabanı üretim yükü altında SQLite'tan PostgreSQL'e taşındı",
                "Zamanlanmış senkronizasyon görevleri (Quartz.NET), gerçek zamanlı bildirimler (SignalR), AntiXSS koruması ve domain kısıtlama middleware'i entegre edildi",
              ],
            },
            {
              bullets: [
                "MVVM mimarisi, harita görselleştirme ve Temiz Mimari katmanlarıyla tarım makinesi telemetrisi için çapraz platform masaüstü uygulaması",
              ],
            },
            {
              bullets: [
                "COM interop ve MS SQL Server veri hattı üzerinden Logo ERP senkronizasyon servisi",
              ],
            },
          ],
        },
        {
          projects: [
            {
              bullets: [
                "Stok ve operasyonel yönetim sistemleri geliştirildi; MS SQL Server sorgu performansı ve veri işleme hatları optimize edildi",
              ],
            },
          ],
        },
        {
          projects: [
            {
              bullets: [
                "SDLC boyunca ödeme ve fatura entegrasyonlarıyla e-ticaret ve sipariş yönetimi platformları geliştirildi",
              ],
            },
          ],
        },
      ],
      projects: [
        {
          title: "Laboratuvar Bilgi Sistemi",
          domain: "Sağlık Bilişimi",
          description: "Dağıtık mimariye sahip kurumsal ölçekli LIS platformu. 100+ endpoint sunan merkezi REST API; React SPA, tıbbi cihaz iletişimci, ERP entegrasyonu ve baskı servisine bağlanıyor — SignalR ve dahili mesaj kuyruğuyla koordineli çalışıyor.",
          highlights: ["5 servis", "6 cihaz entegrasyonu", "Gerçek zamanlı", "WCF/SOAP"],
          tech: [".NET", "React", "TypeScript", "PostgreSQL", "SignalR", "EF Core", "MediatR"],
        },
        {
          title: "Erişim Yönetim Platformu",
          domain: "Fintek / Güvenlik",
          description: "Bir finans kurumu için ziyaretçi ve erişim kontrol sistemi. SmartID entegrasyonlu ASP.NET MVC, zamanlanmış veri senkronizasyonu ve gerçek zamanlı olay bildirimleri.",
          highlights: ["Tek geliştirici", "Kesintisiz geçiş", "AntiXSS", "Domain middleware"],
          tech: [".NET", "ASP.NET MVC", "PostgreSQL", "Quartz.NET", "SignalR"],
        },
        {
          title: "Endüstriyel IoT Masaüstü Uygulaması",
          domain: "Tarım Teknolojisi / Endüstriyel",
          description: "CAN Bus (J1939/CANopen) üzerinden tarım makinesi telemetrisi için çapraz platform masaüstü uygulaması; GPS ve sensör verilerini canlı haritalarda görselleştirir.",
          highlights: ["Çapraz platform", "CAN Bus telemetrisi", "Harita görselleştirme", "Temiz Mimari"],
          tech: [".NET", "Avalonia UI", "CAN Bus J1939", "EF Core", "MVVM", "Mapsui"],
        },
        {
          title: "ERP Entegrasyon Servisi",
          domain: "Lojistik / Finans",
          description: "Finansal ve operasyonel verileri Logo ERP ile COM interop üzerinden senkronize eden, yapılandırılmış Serilog kaydıyla Worker Service.",
          highlights: ["Otomatik senkronizasyon", "Hata kurtarma", "Yapılandırılmış kayıt"],
          tech: [".NET", "Worker Service", "MS SQL Server", "COM Interop", "Serilog"],
        },
        {
          title: "Baskı ve Barkod Servisi",
          domain: "Sağlık Bilişimi",
          description: "SignalR üzerinden tetiklenen barkod üretimi ve çok şablonlu PDF baskısını yöneten özel baskı Worker Service.",
          highlights: ["Çok şablonlu", "Barkod üretimi", "Kuyruk tabanlı"],
          tech: [".NET", "Worker Service", "SignalR", "FreeSpire.Barcode", "PdfiumViewer"],
        },
      ],
      skillCategories: {
        "Backend":        "Backend",
        "Frontend":       "Ön Yüz",
        "Databases":      "Veritabanları",
        "Architecture":   "Mimari",
        "Integration":    "Entegrasyon",
        "Tools & DevOps": "Araçlar & DevOps",
      },
    },
  },
};

export type Translations = typeof translations.en;
