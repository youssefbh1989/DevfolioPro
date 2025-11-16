import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { storage } from "./storage";

const app = express();

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}
app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

async function seedData() {
  // Seed blog posts if none exist
  const existingPosts = await storage.getAllBlogPosts();
  if (existingPosts.length === 0) {
    const blogPosts = [
      {
        title: "Building Scalable Mobile Apps in Qatar",
        titleAr: "بناء تطبيقات جوال قابلة للتوسع في قطر",
        content: "Learn how we develop mobile applications that scale with your business growth in the Qatari market. We focus on performance, security, and user experience...",
        contentAr: "تعرف على كيفية تطوير تطبيقات الجوال التي تنمو مع نمو عملك في السوق القطري. نحن نركز على الأداء والأمان وتجربة المستخدم...",
        author: "Qatar Digital Solutions Team",
        authorAr: "فريق حلول قطر الرقمية",
        slug: "scalable-mobile-apps-qatar",
        excerpt: "Best practices for building mobile apps that grow with your business",
        excerptAr: "أفضل الممارسات لبناء تطبيقات الجوال التي تنمو مع عملك",
        category: "Mobile Development",
        categoryAr: "تطوير تطبيقات الجوال",
        imageUrl: "/attached_assets/mobile1.webp",
        publishedAt: new Date("2024-11-01"),
      },
      {
        title: "Modern Web Development Trends in Qatar 2024",
        titleAr: "اتجاهات تطوير الويب الحديثة في قطر 2024",
        content: "Explore the latest web development technologies and trends shaping the digital landscape in Qatar. From progressive web apps to modern frameworks...",
        contentAr: "استكشف أحدث تقنيات واتجاهات تطوير الويب التي تشكل المشهد الرقمي في قطر. من تطبيقات الويب التقدمية إلى الأطر الحديثة...",
        author: "Qatar Digital Solutions Team",
        authorAr: "فريق حلول قطر الرقمية",
        slug: "web-development-trends-qatar-2024",
        excerpt: "Stay ahead with the latest web development technologies",
        excerptAr: "ابق في المقدمة مع أحدث تقنيات تطوير الويب",
        category: "Web Development",
        categoryAr: "تطوير المواقع",
        imageUrl: "/attached_assets/website1.webp",
        publishedAt: new Date("2024-10-15"),
      },
      {
        title: "Digital Transformation for Qatari Businesses",
        titleAr: "التحول الرقمي للشركات القطرية",
        content: "How digital solutions can transform your business operations and drive growth in Qatar's competitive market. Real case studies and insights...",
        contentAr: "كيف يمكن للحلول الرقمية تحويل عمليات عملك ودفع النمو في سوق قطر التنافسي. دراسات حالة حقيقية ورؤى...",
        author: "Qatar Digital Solutions Team",
        authorAr: "فريق حلول قطر الرقمية",
        slug: "digital-transformation-qatar",
        excerpt: "Transform your business with digital solutions",
        excerptAr: "حوّل عملك بالحلول الرقمية",
        category: "Digital Strategy",
        categoryAr: "الاستراتيجية الرقمية",
        imageUrl: "/attached_assets/mobile2.webp",
        publishedAt: new Date("2024-09-20"),
      },
    ];

    for (const post of blogPosts) {
      await storage.createBlogPost(post);
    }
    log("✅ Seeded blog posts");
  }

  // Seed careers if none exist
  const existingCareers = await storage.getAllCareers();
  if (existingCareers.length === 0) {
    const careers = [
      {
        title: "Senior Mobile App Developer",
        titleAr: "مطور تطبيقات جوال أول",
        department: "Engineering",
        departmentAr: "الهندسة",
        location: "Doha, Qatar",
        locationAr: "الدوحة، قطر",
        type: "Full-time",
        typeAr: "دوام كامل",
        description: "We're looking for an experienced mobile app developer to join our growing team in Doha. You'll work on cutting-edge mobile applications for leading Qatari businesses.",
        descriptionAr: "نبحث عن مطور تطبيقات جوال ذو خبرة للانضمام إلى فريقنا المتنامي في الدوحة. ستعمل على تطبيقات جوال متطورة للشركات القطرية الرائدة.",
        requirements: [
          "5+ years of mobile development experience",
          "Expert in React Native or Flutter",
          "Strong knowledge of iOS and Android platforms",
          "Experience with Arabic RTL layouts",
          "Excellent problem-solving skills",
        ],
        requirementsAr: [
          "أكثر من 5 سنوات من الخبرة في تطوير تطبيقات الجوال",
          "خبير في React Native أو Flutter",
          "معرفة قوية بمنصات iOS وAndroid",
          "خبرة في تخطيطات RTL العربية",
          "مهارات ممتازة في حل المشكلات",
        ],
        responsibilities: [
          "Develop high-quality mobile applications",
          "Collaborate with design and backend teams",
          "Write clean, maintainable code",
          "Mentor junior developers",
        ],
        responsibilitiesAr: [
          "تطوير تطبيقات جوال عالية الجودة",
          "التعاون مع فرق التصميم والخادم",
          "كتابة كود نظيف وقابل للصيانة",
          "توجيه المطورين المبتدئين",
        ],
        status: "open",
      },
      {
        title: "Full Stack Web Developer",
        titleAr: "مطور ويب متكامل",
        department: "Engineering",
        departmentAr: "الهندسة",
        location: "Doha, Qatar",
        locationAr: "الدوحة، قطر",
        type: "Full-time",
        typeAr: "دوام كامل",
        description: "Join our web development team to build modern, responsive websites for Qatar's leading businesses. Work with latest technologies and frameworks.",
        descriptionAr: "انضم إلى فريق تطوير الويب لدينا لبناء مواقع حديثة ومتجاوبة للشركات القطرية الرائدة. اعمل مع أحدث التقنيات والأطر.",
        requirements: [
          "3+ years of full stack development",
          "Proficient in React, Node.js, TypeScript",
          "Experience with databases (PostgreSQL, MongoDB)",
          "Understanding of Arabic content and RTL layouts",
          "Strong communication skills",
        ],
        requirementsAr: [
          "أكثر من 3 سنوات في التطوير المتكامل",
          "إتقان React وNode.js وTypeScript",
          "خبرة في قواعد البيانات (PostgreSQL، MongoDB)",
          "فهم المحتوى العربي وتخطيطات RTL",
          "مهارات تواصل قوية",
        ],
        responsibilities: [
          "Build responsive web applications",
          "Design and implement RESTful APIs",
          "Optimize application performance",
          "Work closely with designers and clients",
        ],
        responsibilitiesAr: [
          "بناء تطبيقات ويب متجاوبة",
          "تصميم وتنفيذ واجهات RESTful",
          "تحسين أداء التطبيقات",
          "العمل عن كثب مع المصممين والعملاء",
        ],
        status: "open",
      },
      {
        title: "UI/UX Designer",
        titleAr: "مصمم واجهات وتجربة مستخدم",
        department: "Design",
        departmentAr: "التصميم",
        location: "Doha, Qatar",
        locationAr: "الدوحة، قطر",
        type: "Full-time",
        typeAr: "دوام كامل",
        description: "Create beautiful, intuitive designs for mobile apps and websites that resonate with Qatari users. Join our creative team in Doha.",
        descriptionAr: "أنشئ تصاميم جميلة وبديهية لتطبيقات الجوال والمواقع الإلكترونية التي تلقى صدى لدى المستخدمين القطريين. انضم إلى فريقنا الإبداعي في الدوحة.",
        requirements: [
          "3+ years of UI/UX design experience",
          "Strong portfolio showcasing mobile and web projects",
          "Proficient in Figma, Adobe XD, or Sketch",
          "Understanding of Arabic design aesthetics",
          "Experience with design systems",
        ],
        requirementsAr: [
          "أكثر من 3 سنوات من الخبرة في تصميم UI/UX",
          "محفظة قوية تعرض مشاريع الجوال والويب",
          "إتقان Figma أو Adobe XD أو Sketch",
          "فهم جماليات التصميم العربي",
          "خبرة في أنظمة التصميم",
        ],
        responsibilities: [
          "Design user interfaces for mobile and web",
          "Create wireframes and prototypes",
          "Conduct user research and testing",
          "Collaborate with development teams",
        ],
        responsibilitiesAr: [
          "تصميم واجهات المستخدم للجوال والويب",
          "إنشاء إطارات سلكية ونماذج أولية",
          "إجراء بحوث واختبارات المستخدمين",
          "التعاون مع فرق التطوير",
        ],
        status: "open",
      },
    ];

    for (const career of careers) {
      await storage.createCareer(career);
    }
    log("✅ Seeded careers");
  }
}

(async () => {
  const server = await registerRoutes(app);
  
  // Seed initial data
  await seedData();

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Serve attached assets (images, etc.) as static files
  app.use("/attached_assets", express.static("attached_assets"));

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
