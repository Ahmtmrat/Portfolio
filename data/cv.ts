export const personal = {
  name: "Ahmet Murat Yıldırım",
  location: "Istanbul, Turkey",
  email: "yildirimahmetmurat@gmail.com",
  linkedin: "https://linkedin.com/in/ahmet-murat-yildirim",
  github: "https://github.com/Ahmtmrat",
};

export const experiences = [
  {
    company: "FilosSoft",
    role: "Senior Software Engineer",
    period: "January 2023 – Present",
    location: "Istanbul, Turkey",
    projects: [
      { name: "Laboratory Information System",  tags: [".NET", "React", "PostgreSQL", "SignalR"] },
      { name: "Access Management Platform",      tags: [".NET", "ASP.NET MVC", "PostgreSQL"] },
      { name: "Industrial IoT Desktop Application", tags: [".NET", "Avalonia UI", "CAN Bus J1939/CANopen"] },
      { name: "ERP Integration Service",         tags: [".NET", "Worker Service", "MS SQL Server"] },
    ],
  },
  {
    company: "D1-Tech",
    role: "Software Engineer",
    period: "June 2022 – December 2022",
    location: "Istanbul, Turkey",
    projects: [{ name: "", tags: [] }],
  },
  {
    company: "Bilişim Education Center",
    role: "Software Developer",
    period: "October 2021 – June 2022",
    location: "Istanbul, Turkey",
    projects: [{ name: "", tags: [] }],
  },
];

export const skills = [
  { category: "Backend",        items: ["ASP.NET Core Web API", "ASP.NET MVC", ".NET", "Entity Framework Core", "MediatR (CQRS)", "Autofac IoC", "Quartz.NET", "FluentValidation", "AutoMapper", "Serilog", "WCF / SOAP"] },
  { category: "Frontend",       items: ["React", "TypeScript", "State Management", "REST & SignalR", "Data Visualization", "Responsive Design"] },
  { category: "Databases",      items: ["PostgreSQL", "MS SQL Server", "SQLite", "EF Core Migrations", "Query Optimization", "Index Strategy"] },
  { category: "Architecture",   items: ["Clean Architecture", "N-Layer", "CQRS", "Worker Service", "Distributed Systems", "Modular Monolith"] },
  { category: "Integration",    items: ["SignalR (MessagePack)", "TCP/IP", "Serial Port", "CAN Bus (J1939/CANopen)", "COM Interop", "JWT (HMAC-SHA256)"] },
  { category: "Tools & DevOps", items: ["Git", "Azure DevOps", "Docker", "GitHub Actions", "Swagger / OpenAPI", "Avalonia UI"] },
];

export const metrics = [
  { value: "7+" },
  { value: "50+" },
];

export const education = {
  university: "Karabük University",
  department: "Railway Systems Engineering",
};
