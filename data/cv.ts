/**
 * Language-independent CV structure.
 *
 * Everything translatable lives in `data/translations.ts`, keyed by the same
 * `id` used here — never by array index, so reordering either file is safe.
 */

export const personal = {
  name: "Ahmet Murat Yıldırım",
  location: "Istanbul, Turkey",
  email: "yildirimahmetmurat@gmail.com",
  linkedin: "https://linkedin.com/in/ahmet-murat-yildirim",
  github: "https://github.com/Ahmtmrat",
  site: "https://ahmetmuratyildirim.dev",
};

export type ExperienceId = "filossoft" | "d1tech" | "bilisim";

export const experiences: {
  id: ExperienceId;
  company: string;
  period: string;
  location: string;
  current: boolean;
  tags: string[];
}[] = [
  {
    id: "filossoft",
    company: "FilosSoft",
    period: "January 2023 – Present",
    location: "Istanbul, Turkey",
    current: true,
    tags: [".NET", "React", "PostgreSQL", "SignalR"],
  },
  {
    id: "d1tech",
    company: "D1-Tech",
    period: "June 2022 – December 2022",
    location: "Istanbul, Turkey",
    current: false,
    tags: ["MS SQL Server", ".NET"],
  },
  {
    id: "bilisim",
    company: "Bilişim Education Center",
    period: "October 2021 – June 2022",
    location: "Istanbul, Turkey",
    current: false,
    tags: ["E-commerce", "Payments"],
  },
];

export type ProjectId = "lis" | "acc" | "iot" | "erp" | "prt";

/** The three star-tint glass families cards and rail tiles cycle through. */
export type Tint = 1 | 2 | 3;

/**
 * The design system has no photography, so each project is identified by a
 * three-letter mono glyph on a tinted glass panel.
 */
export const projects: {
  id: ProjectId;
  glyph: string;
  tint: Tint;
  tech: string[];
}[] = [
  {
    id: "lis",
    glyph: "LIS",
    tint: 1,
    tech: [".NET", "React", "TypeScript", "PostgreSQL", "SignalR", "EF Core", "MediatR"],
  },
  {
    id: "acc",
    glyph: "ACC",
    tint: 2,
    tech: [".NET", "ASP.NET MVC", "PostgreSQL", "Quartz.NET", "SignalR"],
  },
  {
    id: "iot",
    glyph: "IOT",
    tint: 3,
    tech: [".NET", "Avalonia UI", "CAN Bus J1939", "EF Core", "MVVM", "Mapsui"],
  },
  {
    id: "erp",
    glyph: "ERP",
    tint: 1,
    tech: [".NET", "Worker Service", "MS SQL Server", "COM Interop", "Serilog"],
  },
  {
    id: "prt",
    glyph: "PRT",
    tint: 2,
    tech: [".NET", "Worker Service", "SignalR", "FreeSpire.Barcode", "PdfiumViewer"],
  },
];

export type SkillCategoryId =
  | "backend"
  | "frontend"
  | "databases"
  | "architecture"
  | "integration"
  | "tools";

export const skills: { id: SkillCategoryId; items: string[] }[] = [
  {
    id: "backend",
    items: [
      "ASP.NET Core Web API",
      "ASP.NET MVC",
      ".NET",
      "Entity Framework Core",
      "MediatR (CQRS)",
      "Autofac IoC",
      "Quartz.NET",
      "FluentValidation",
      "AutoMapper",
      "Serilog",
      "WCF / SOAP",
    ],
  },
  {
    id: "frontend",
    items: [
      "React",
      "TypeScript",
      "State Management",
      "REST & SignalR",
      "Data Visualization",
      "Responsive Design",
    ],
  },
  {
    id: "databases",
    items: [
      "PostgreSQL",
      "MS SQL Server",
      "SQLite",
      "EF Core Migrations",
      "Query Optimization",
      "Index Strategy",
    ],
  },
  {
    id: "architecture",
    items: [
      "Clean Architecture",
      "N-Layer",
      "CQRS",
      "Worker Service",
      "Distributed Systems",
      "Modular Monolith",
    ],
  },
  {
    id: "integration",
    items: [
      "SignalR (MessagePack)",
      "TCP/IP",
      "Serial Port",
      "CAN Bus (J1939/CANopen)",
      "COM Interop",
      "JWT (HMAC-SHA256)",
    ],
  },
  {
    id: "tools",
    items: [
      "Git",
      "Azure DevOps",
      "Docker",
      "GitHub Actions",
      "Swagger / OpenAPI",
      "Avalonia UI",
    ],
  },
];

export type MetricId = "projects" | "integrations" | "years";

export const metrics: { id: MetricId; value: string }[] = [
  { id: "projects", value: "7+" },
  { id: "integrations", value: "50+" },
  { id: "years", value: "4.5+" },
];

export const education = {
  university: "Karabük University",
  department: "Railway Systems Engineering",
};
