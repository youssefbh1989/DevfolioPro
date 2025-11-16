import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import type { BlogPost } from "@shared/schema";

interface BlogPageProps {
  language: "en" | "ar";
}

const content = {
  en: {
    title: "Our Blog",
    subtitle: "Insights, tips, and news from the world of digital solutions",
    noPosts: "No blog posts yet. Check back soon!",
    readMore: "Read More",
  },
  ar: {
    title: "مدونتنا",
    subtitle: "رؤى ونصائح وأخبار من عالم الحلول الرقمية",
    noPosts: "لا توجد مقالات بعد. تحقق مرة أخرى قريباً!",
    readMore: "اقرأ المزيد",
  },
};

export default function Blog({ language }: BlogPageProps) {
  const t = content[language];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(language === "ar" ? "ar-QA" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 to-accent/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-serif font-bold text-4xl md:text-6xl text-foreground mb-6" data-testid="text-blog-title">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-blog-subtitle">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 md:py-24" ref={ref}>
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="text-center text-muted-foreground">Loading...</div>
          ) : posts.length === 0 ? (
            <div className="text-center text-muted-foreground py-12" data-testid="text-no-posts">
              {t.noPosts}
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {posts.map((post, index) => (
                <motion.div key={post.id} variants={staggerItem}>
                  <Card className="h-full hover-elevate transition-all duration-300 overflow-hidden" data-testid={`card-post-${index}`}>
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={language === "ar" ? post.titleAr : post.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        data-testid={`img-post-${index}`}
                      />
                    </div>
                    <CardHeader>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="secondary" data-testid={`badge-category-${index}`}>
                          {language === "ar" ? post.categoryAr : post.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl line-clamp-2" data-testid={`text-post-title-${index}`}>
                        {language === "ar" ? post.titleAr : post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-4" data-testid={`text-post-excerpt-${index}`}>
                        {language === "ar" ? post.excerptAr : post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{language === "ar" ? post.authorAr : post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.publishedAt.toString())}</span>
                        </div>
                      </div>
                      <a
                        href={`/blog/${post.slug}`}
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        data-testid={`link-read-more-${index}`}
                      >
                        {t.readMore} →
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
