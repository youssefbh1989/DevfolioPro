import { db } from "./db";
import { testimonials } from "@shared/schema";

const sampleTestimonials = [
  {
    clientName: "Ahmed Al-Mansoori",
    clientNameAr: "أحمد المنصوري",
    clientPosition: "CEO",
    clientPositionAr: "الرئيس التنفيذي",
    clientCompany: "Qatar Cafe Group",
    clientCompanyAr: "مجموعة مقهى قطر",
    rating: "5",
    testimonial: "Qatar Digital Solutions transformed our business with their mobile app. The ordering system reduced wait times by 50% and our customers love the seamless experience. Highly professional team!",
    testimonialAr: "حلول قطر الرقمية حولت أعمالنا بتطبيقهم المحمول. نظام الطلب قلل أوقات الانتظار بنسبة 50٪ وعملاؤنا يحبون التجربة السلسة. فريق محترف للغاية!",
    projectType: "mobile",
    avatarUrl: null
  },
  {
    clientName: "Fatima Al-Thani",
    clientNameAr: "فاطمة الثاني",
    clientPosition: "Founder",
    clientPositionAr: "المؤسس",
    clientCompany: "Doha Boutique",
    clientCompanyAr: "بوتيك الدوحة",
    rating: "5",
    testimonial: "The e-commerce app exceeded all expectations. Sales increased by 300% in the first quarter. The Arabic/English support is perfect for our customer base. Exceptional quality!",
    testimonialAr: "تطبيق التجارة الإلكترونية فاق كل التوقعات. زادت المبيعات بنسبة 300٪ في الربع الأول. دعم العربية/الإنجليزية مثالي لقاعدة عملائنا. جودة استثنائية!",
    projectType: "mobile",
    avatarUrl: null
  },
  {
    clientName: "Mohammed Al-Kuwari",
    clientNameAr: "محمد الكواري",
    clientPosition: "Director",
    clientPositionAr: "المدير",
    clientCompany: "Gulf Services LLC",
    clientCompanyAr: "شركة خدمات الخليج",
    rating: "5",
    testimonial: "Working with Qatar Digital was a pleasure. They understood our needs perfectly and delivered a robust booking platform. 500+ providers joined in the first month!",
    testimonialAr: "العمل مع حلول قطر الرقمية كان ممتعًا. فهموا احتياجاتنا تمامًا وقدموا منصة حجز قوية. انضم أكثر من 500 مزود في الشهر الأول!",
    projectType: "mobile",
    avatarUrl: null
  },
  {
    clientName: "Sarah Al-Dosari",
    clientNameAr: "سارة الدوسري",
    clientPosition: "Marketing Director",
    clientPositionAr: "مدير التسويق",
    clientCompany: "Qatar Corporate Ltd",
    clientCompanyAr: "شركة قطر للشركات",
    rating: "5",
    testimonial: "Our new website is stunning! The bilingual design and SEO optimization brought 150% more organic traffic. Professional service from start to finish.",
    testimonialAr: "موقعنا الجديد رائع! التصميم ثنائي اللغة وتحسين محركات البحث جلب 150٪ حركة مرور عضوية أكثر. خدمة احترافية من البداية إلى النهاية.",
    projectType: "website",
    avatarUrl: null
  },
  {
    clientName: "Khalid Al-Marri",
    clientNameAr: "خالد المري",
    clientPosition: "Owner",
    clientPositionAr: "المالك",
    clientCompany: "Doha Retail Store",
    clientCompanyAr: "متجر التجزئة في الدوحة",
    rating: "5",
    testimonial: "The e-commerce platform they built handles thousands of daily orders flawlessly. Payment integration with local gateways works perfectly. Best investment we made!",
    testimonialAr: "منصة التجارة الإلكترونية التي بنوها تتعامل مع آلاف الطلبات اليومية بلا عيوب. تكامل الدفع مع البوابات المحلية يعمل بشكل مثالي. أفضل استثمار قمنا به!",
    projectType: "website",
    avatarUrl: null
  },
  {
    clientName: "Noor Al-Hajri",
    clientNameAr: "نور الحجري",
    clientPosition: "Managing Partner",
    clientPositionAr: "الشريك الإداري",
    clientCompany: "Qatar Professional Services",
    clientCompanyAr: "خدمات قطر المهنية",
    rating: "5",
    testimonial: "The booking portal reduced our administrative work by 80%. Calendar integration and automated reminders are game changers. Excellent team to work with!",
    testimonialAr: "بوابة الحجز خفضت أعمالنا الإدارية بنسبة 80٪. تكامل التقويم والتذكيرات التلقائية غيرت قواعد اللعبة. فريق ممتاز للعمل معه!",
    projectType: "website",
    avatarUrl: null
  },
  {
    clientName: "Abdullah Al-Naimi",
    clientNameAr: "عبدالله النعيمي",
    clientPosition: "Fitness Director",
    clientPositionAr: "مدير اللياقة البدنية",
    clientCompany: "Qatar Fitness Club",
    clientCompanyAr: "نادي قطر للياقة البدنية",
    rating: "5",
    testimonial: "The fitness tracker app revolutionized how our members engage with their health journey. 70% increase in engagement speaks for itself. Outstanding development quality!",
    testimonialAr: "تطبيق تتبع اللياقة أحدث ثورة في كيفية تفاعل أعضائنا مع رحلة صحتهم. زيادة بنسبة 70٪ في التفاعل تتحدث عن نفسها. جودة تطوير متميزة!",
    projectType: "mobile",
    avatarUrl: null
  },
  {
    clientName: "Mariam Al-Attiyah",
    clientNameAr: "مريم العطية",
    clientPosition: "Sales Manager",
    clientPositionAr: "مدير المبيعات",
    clientCompany: "Qatar Real Estate Group",
    clientCompanyAr: "مجموعة قطر العقارية",
    rating: "5",
    testimonial: "The virtual tour feature is incredible! Our property listings get 3x more engagement. Lead conversions up 45%. Best real estate platform in Qatar!",
    testimonialAr: "ميزة الجولة الافتراضية مذهلة! قوائم العقارات لدينا تحصل على 3 أضعاف التفاعل. زيادة تحويلات العملاء المحتملين بنسبة 45٪. أفضل منصة عقارية في قطر!",
    projectType: "website",
    avatarUrl: null
  },
  {
    clientName: "Dr. Hassan Al-Sulaiti",
    clientNameAr: "د. حسن السليطي",
    clientPosition: "Principal",
    clientPositionAr: "المدير",
    clientCompany: "Qatar Education Institute",
    clientCompanyAr: "معهد قطر التعليمي",
    rating: "5",
    testimonial: "Our students love the interactive learning platform! 85% course completion rate and parents are thrilled. The offline mode is perfect for our needs. Exceptional work!",
    testimonialAr: "طلابنا يحبون منصة التعليم التفاعلية! معدل إكمال الدورة 85٪ والآباء متحمسون. وضع عدم الاتصال مثالي لاحتياجاتنا. عمل استثنائي!",
    projectType: "mobile",
    avatarUrl: null
  }
];

async function seedTestimonials() {
  console.log("Seeding testimonials...");
  
  for (const testimonial of sampleTestimonials) {
    try {
      await db.insert(testimonials).values(testimonial);
      console.log(`✓ Added testimonial from: ${testimonial.clientName}`);
    } catch (error) {
      console.error(`✗ Failed to add ${testimonial.clientName}:`, error);
    }
  }
  
  console.log("Testimonials seeding complete!");
  process.exit(0);
}

seedTestimonials().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
