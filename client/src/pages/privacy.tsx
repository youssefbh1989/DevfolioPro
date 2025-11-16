import { motion } from "framer-motion";

interface PrivacyPageProps {
  language: "en" | "ar";
}

const content = {
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: November 2025",
    sections: [
      {
        title: "1. Information We Collect",
        content: "When you contact us through our website, we collect personal information that you voluntarily provide, including your name, company name, email address, phone number, and project details. This information is necessary to respond to your inquiries and provide our services.",
      },
      {
        title: "2. How We Use Your Information",
        content: "We use the information we collect to: respond to your consultation requests, provide quotes and proposals for our services, communicate about projects and updates, improve our website and services, and comply with legal obligations. We do not sell or share your personal information with third parties for marketing purposes.",
      },
      {
        title: "3. Data Storage and Security",
        content: "Your information is stored securely in our database with industry-standard encryption and security measures. We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.",
      },
      {
        title: "4. Your Rights",
        content: "Under Qatar's data protection regulations, you have the right to: access your personal data, request correction of inaccurate data, request deletion of your data, object to processing of your data, and withdraw consent at any time. To exercise these rights, please contact us at privacy@qatardigitalsolutions.com.",
      },
      {
        title: "5. Cookies and Tracking",
        content: "Our website uses essential cookies to ensure proper functionality. We do not use tracking cookies or third-party analytics without your explicit consent. You can control cookie preferences through your browser settings.",
      },
      {
        title: "6. Third-Party Services",
        content: "We may use trusted third-party services to support our operations, such as email providers and hosting services. These providers are contractually obligated to protect your data and use it only for the specified purposes.",
      },
      {
        title: "7. Data Retention",
        content: "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Contact form submissions are retained for up to 2 years, after which they are securely deleted.",
      },
      {
        title: "8. Changes to This Policy",
        content: "We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page with an updated 'Last Updated' date. We encourage you to review this policy periodically.",
      },
      {
        title: "9. Contact Us",
        content: "If you have any questions about this Privacy Policy or our data practices, please contact us at: Email: privacy@qatardigitalsolutions.com, Phone: +974 XXXX XXXX, Address: Doha, Qatar",
      },
    ],
  },
  ar: {
    title: "سياسة الخصوصية",
    lastUpdated: "آخر تحديث: نوفمبر 2025",
    sections: [
      {
        title: "1. المعلومات التي نجمعها",
        content: "عندما تتصل بنا من خلال موقعنا، نجمع المعلومات الشخصية التي تقدمها طواعية، بما في ذلك اسمك واسم الشركة وعنوان البريد الإلكتروني ورقم الهاتف وتفاصيل المشروع. هذه المعلومات ضرورية للرد على استفساراتك وتقديم خدماتنا.",
      },
      {
        title: "2. كيف نستخدم معلوماتك",
        content: "نستخدم المعلومات التي نجمعها للرد على طلبات الاستشارة الخاصة بك، وتقديم عروض الأسعار والمقترحات لخدماتنا، والتواصل حول المشاريع والتحديثات، وتحسين موقعنا وخدماتنا، والامتثال للالتزامات القانونية. نحن لا نبيع أو نشارك معلوماتك الشخصية مع أطراف ثالثة لأغراض تسويقية.",
      },
      {
        title: "3. تخزين البيانات والأمان",
        content: "يتم تخزين معلوماتك بشكل آمن في قاعدة بياناتنا مع تدابير التشفير والأمان القياسية في الصناعة. نقوم بتنفيذ التدابير التقنية والتنظيمية المناسبة لحماية بياناتك الشخصية ضد الوصول غير المصرح به أو التغيير أو الكشف أو التدمير.",
      },
      {
        title: "4. حقوقك",
        content: "بموجب لوائح حماية البيانات في قطر، لديك الحق في: الوصول إلى بياناتك الشخصية، وطلب تصحيح البيانات غير الدقيقة، وطلب حذف بياناتك، والاعتراض على معالجة بياناتك، وسحب الموافقة في أي وقت. لممارسة هذه الحقوق، يرجى الاتصال بنا على privacy@qatardigitalsolutions.com.",
      },
      {
        title: "5. ملفات تعريف الارتباط والتتبع",
        content: "يستخدم موقعنا ملفات تعريف الارتباط الأساسية لضمان الوظائف المناسبة. لا نستخدم ملفات تعريف الارتباط للتتبع أو التحليلات من جهات خارجية بدون موافقتك الصريحة. يمكنك التحكم في تفضيلات ملفات تعريف الارتباط من خلال إعدادات المتصفح.",
      },
      {
        title: "6. خدمات الطرف الثالث",
        content: "قد نستخدم خدمات طرف ثالث موثوقة لدعم عملياتنا، مثل مزودي البريد الإلكتروني وخدمات الاستضافة. هؤلاء المزودون ملزمون تعاقديًا بحماية بياناتك واستخدامها فقط للأغراض المحددة.",
      },
      {
        title: "7. الاحتفاظ بالبيانات",
        content: "نحتفظ بمعلوماتك الشخصية فقط طالما كان ذلك ضروريًا لتحقيق الأغراض الموضحة في هذه السياسة، أو كما يقتضي القانون. يتم الاحتفاظ بنماذج الاتصال لمدة تصل إلى عامين، وبعد ذلك يتم حذفها بشكل آمن.",
      },
      {
        title: "8. التغييرات على هذه السياسة",
        content: "قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنخطرك بأي تغييرات كبيرة عن طريق نشر السياسة الجديدة على هذه الصفحة مع تاريخ 'آخر تحديث' محدث. نشجعك على مراجعة هذه السياسة بشكل دوري.",
      },
      {
        title: "9. اتصل بنا",
        content: "إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه أو ممارسات البيانات لدينا، يرجى الاتصال بنا على: البريد الإلكتروني: privacy@qatardigitalsolutions.com، الهاتف: +974 XXXX XXXX، العنوان: الدوحة، قطر",
      },
    ],
  },
};

export default function Privacy({ language }: PrivacyPageProps) {
  const t = content[language];

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 to-accent/5">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif font-bold text-4xl md:text-6xl text-foreground mb-4" data-testid="text-privacy-title">
              {t.title}
            </h1>
            <p className="text-muted-foreground" data-testid="text-last-updated">
              {t.lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-12">
            {t.sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                data-testid={`section-${index}`}
              >
                <h2 className="font-serif font-bold text-2xl text-foreground mb-4" data-testid={`section-title-${index}`}>
                  {section.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed" data-testid={`section-content-${index}`}>
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
