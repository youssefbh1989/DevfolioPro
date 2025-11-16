import { db } from "./db";
import { portfolioProjects } from "@shared/schema";

const sampleProjects = [
  {
    title: "Qatar Cafe Mobile App",
    titleAr: "تطبيق مقهى قطر",
    category: "Restaurant Ordering App",
    categoryAr: "تطبيق طلب مطعم",
    description: "Online ordering and table booking system",
    descriptionAr: "نظام طلب عبر الإنترنت وحجز الطاولات",
    type: "mobile",
    client: "Qatar Cafe Group",
    clientAr: "مجموعة مقهى قطر",
    challenge: "The client needed a seamless mobile ordering experience that would reduce wait times and improve customer satisfaction during peak hours.",
    challengeAr: "احتاج العميل إلى تجربة طلب سلسة عبر الجوال تقلل من أوقات الانتظار وتحسن رضا العملاء خلال ساعات الذروة.",
    solution: "We developed a native mobile app with real-time menu updates, table booking, and integrated payment processing. The app features Arabic/English support and Qatar-specific payment methods.",
    solutionAr: "قمنا بتطوير تطبيق جوال أصلي مع تحديثات القائمة في الوقت الفعلي وحجز الطاولات ومعالجة الدفع المتكاملة. يدعم التطبيق اللغتين العربية والإنجليزية وطرق الدفع الخاصة بقطر.",
    results: "50% reduction in order processing time, 200+ daily active users within first month, 4.8/5 app store rating",
    resultsAr: "انخفاض بنسبة 50٪ في وقت معالجة الطلب، أكثر من 200 مستخدم نشط يوميًا في الشهر الأول، تقييم 4.8/5 في متجر التطبيقات",
    technologies: ["React Native", "Node.js", "PostgreSQL", "Stripe", "Firebase"],
    imageUrl: "/attached_assets/generated_images/Mobile_app_mockup_clean_d2c9db56.png"
  },
  {
    title: "Doha Fashion Boutique",
    titleAr: "بوتيك الدوحة للأزياء",
    category: "E-commerce Mobile App",
    categoryAr: "تطبيق تجارة إلكترونية",
    description: "Fashion retail mobile shopping experience",
    descriptionAr: "تجربة تسوق أزياء عبر الجوال",
    type: "mobile",
    client: "Doha Boutique",
    clientAr: "بوتيك الدوحة",
    challenge: "Create a luxury shopping experience on mobile that showcases high-end fashion while maintaining performance and supporting Arabic RTL layout.",
    challengeAr: "إنشاء تجربة تسوق فاخرة على الهاتف المحمول تعرض الأزياء الراقية مع الحفاظ على الأداء ودعم التخطيط العربي من اليمين إلى اليسار.",
    solution: "Built a React Native app with advanced image optimization, AR try-on features, and seamless checkout. Integrated with local payment gateways and delivery services.",
    solutionAr: "أنشأنا تطبيق React Native مع تحسين متقدم للصور وميزات تجربة الواقع المعزز وعملية دفع سلسة. تم الدمج مع بوابات الدفع المحلية وخدمات التوصيل.",
    results: "300% increase in mobile sales, 85% customer retention rate, Featured in Qatar's top shopping apps",
    resultsAr: "زيادة بنسبة 300٪ في المبيعات عبر الهاتف المحمول، معدل الاحتفاظ بالعملاء 85٪، مميز في أفضل تطبيقات التسوق في قطر",
    technologies: ["React Native", "TypeScript", "GraphQL", "AWS", "AR Kit"],
    imageUrl: "/attached_assets/generated_images/Mobile_app_mockup_clean_d2c9db56.png"
  },
  {
    title: "Gulf Home Services",
    titleAr: "خدمات الخليج المنزلية",
    category: "Service Booking App",
    categoryAr: "تطبيق حجز خدمات",
    description: "Home services scheduling platform",
    descriptionAr: "منصة جدولة الخدمات المنزلية",
    type: "mobile",
    client: "Gulf Services LLC",
    clientAr: "شركة خدمات الخليج",
    challenge: "Connect homeowners with verified service providers for cleaning, maintenance, and repairs while ensuring quality and reliability.",
    challengeAr: "ربط أصحاب المنازل بمزودي الخدمات الموثقين للتنظيف والصيانة والإصلاحات مع ضمان الجودة والموثوقية.",
    solution: "Developed a marketplace app with real-time booking, GPS tracking, in-app payments, and rating system. Implemented verification process for service providers.",
    solutionAr: "قمنا بتطوير تطبيق سوق مع الحجز في الوقت الفعلي وتتبع GPS والدفع داخل التطبيق ونظام التقييم. تم تطبيق عملية التحقق من مزودي الخدمة.",
    results: "500+ verified service providers, 2,000+ bookings in first quarter, 4.7/5 average service rating",
    resultsAr: "أكثر من 500 مزود خدمة موثق، أكثر من 2000 حجز في الربع الأول، متوسط تقييم الخدمة 4.7/5",
    technologies: ["Flutter", "Firebase", "Google Maps API", "Twilio", "Stripe"],
    imageUrl: "/attached_assets/generated_images/Mobile_app_mockup_clean_d2c9db56.png"
  },
  {
    title: "Qatar Corporate Solutions",
    titleAr: "حلول قطر للشركات",
    category: "Business Website",
    categoryAr: "موقع أعمال",
    description: "Corporate website with Arabic/English support",
    descriptionAr: "موقع شركة بدعم العربية والإنجليزية",
    type: "website",
    client: "Qatar Corporate Ltd",
    clientAr: "شركة قطر للشركات",
    challenge: "Create a professional bilingual corporate website that reflects the company's premium brand while being fully accessible and SEO-optimized.",
    challengeAr: "إنشاء موقع شركة احترافي ثنائي اللغة يعكس علامة الشركة المميزة مع كونه متاحًا بالكامل ومحسنًا لمحركات البحث.",
    solution: "Built a modern React website with full RTL support, dynamic content management, and optimized performance. Implemented advanced SEO strategies for both languages.",
    solutionAr: "أنشأنا موقع React حديث مع دعم RTL الكامل وإدارة المحتوى الديناميكي والأداء المحسن. طبقنا استراتيجيات SEO متقدمة لكلا اللغتين.",
    results: "150% increase in organic traffic, 40% improvement in lead generation, 95/100 Lighthouse score",
    resultsAr: "زيادة بنسبة 150٪ في حركة المرور العضوية، تحسن بنسبة 40٪ في توليد العملاء المحتملين، درجة Lighthouse 95/100",
    technologies: ["React", "Next.js", "Tailwind CSS", "Vercel", "Google Analytics"],
    imageUrl: "/attached_assets/generated_images/Website_laptop_mockup_elegant_a69c9d74.png"
  },
  {
    title: "Doha Retail E-commerce",
    titleAr: "التجارة الإلكترونية للتجزئة في الدوحة",
    category: "E-commerce Site",
    categoryAr: "موقع تجارة إلكترونية",
    description: "Full-featured online shopping platform",
    descriptionAr: "منصة تسوق متكاملة عبر الإنترنت",
    type: "website",
    client: "Doha Retail Store",
    clientAr: "متجر التجزئة في الدوحة",
    challenge: "Build a scalable e-commerce platform that handles high traffic, supports multiple payment gateways, and integrates with local delivery services.",
    challengeAr: "بناء منصة تجارة إلكترونية قابلة للتطوير تتعامل مع حركة مرور عالية وتدعم بوابات دفع متعددة وتتكامل مع خدمات التوصيل المحلية.",
    solution: "Developed a full-stack e-commerce solution with advanced product filtering, real-time inventory, secure payments, and automated order fulfillment.",
    solutionAr: "قمنا بتطوير حل تجارة إلكترونية متكامل مع تصفية المنتجات المتقدمة والمخزون في الوقت الفعلي والمدفوعات الآمنة وتنفيذ الطلبات الآلي.",
    results: "QR 2M+ in online sales, 10,000+ registered customers, 30% conversion rate improvement",
    resultsAr: "أكثر من 2 مليون ريال قطري في المبيعات عبر الإنترنت، أكثر من 10،000 عميل مسجل، تحسن بنسبة 30٪ في معدل التحويل",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis", "AWS S3"],
    imageUrl: "/attached_assets/generated_images/Website_laptop_mockup_elegant_a69c9d74.png"
  },
  {
    title: "Professional Services Portal",
    titleAr: "بوابة الخدمات المهنية",
    category: "Booking Portal",
    categoryAr: "بوابة حجز",
    description: "Service booking and management system",
    descriptionAr: "نظام حجز وإدارة الخدمات",
    type: "website",
    client: "Qatar Professional Services",
    clientAr: "خدمات قطر المهنية",
    challenge: "Create an intuitive booking system for consulting services with calendar integration, automated reminders, and client management.",
    challengeAr: "إنشاء نظام حجز بديهي لخدمات الاستشارات مع تكامل التقويم والتذكيرات الآلية وإدارة العملاء.",
    solution: "Built a comprehensive booking portal with Google Calendar integration, automated email/SMS notifications, payment processing, and admin dashboard.",
    solutionAr: "أنشأنا بوابة حجز شاملة مع تكامل تقويم Google والإشعارات الآلية عبر البريد الإلكتروني/الرسائل القصيرة ومعالجة الدفع ولوحة تحكم المسؤول.",
    results: "80% reduction in booking management time, 95% customer satisfaction rate, 250+ monthly bookings",
    resultsAr: "انخفاض بنسبة 80٪ في وقت إدارة الحجز، معدل رضا العملاء 95٪، أكثر من 250 حجزًا شهريًا",
    technologies: ["React", "Express", "PostgreSQL", "Google Calendar API", "SendGrid"],
    imageUrl: "/attached_assets/generated_images/Website_laptop_mockup_elegant_a69c9d74.png"
  }
];

async function seedProjects() {
  console.log("Seeding portfolio projects...");
  
  for (const project of sampleProjects) {
    try {
      await db.insert(portfolioProjects).values(project);
      console.log(`✓ Added: ${project.title}`);
    } catch (error) {
      console.error(`✗ Failed to add ${project.title}:`, error);
    }
  }
  
  console.log("Seeding complete!");
  process.exit(0);
}

seedProjects().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
