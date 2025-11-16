import { motion } from "framer-motion";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft } from "lucide-react";
import type { BlogPost } from "@shared/schema";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const content = {
  en: {
    backToBlog: "Back to Blog",
    loading: "Loading...",
    notFound: "Blog post not found",
    notFoundDescription: "The blog post you're looking for doesn't exist or has been removed.",
  },
  ar: {
    backToBlog: "العودة إلى المدونة",
    loading: "جارٍ التحميل...",
    notFound: "المقال غير موجود",
    notFoundDescription: "المقال الذي تبحث عنه غير موجود أو تم حذفه.",
  },
};

export default function BlogPostPage() {
  const { language } = useLanguage();
  const t = content[language];
  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const { data: post, isLoading, isError } = useQuery<BlogPost>({
    queryKey: ["/api/blog", slug],
  });

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(language === "ar" ? "ar-QA" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className={`min-h-screen bg-background ${language === "ar" ? "rtl" : ""}`}>
      <Navigation />

      <div className="py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Button */}
          <Link href="/blog">
            <Button variant="ghost" className="mb-8" data-testid="button-back-to-blog">
              <ArrowLeft className={`h-4 w-4 ${language === "ar" ? "ml-2" : "mr-2"}`} />
              {t.backToBlog}
            </Button>
          </Link>

          {isLoading ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-xl" data-testid="text-loading">
                {t.loading}
              </p>
            </div>
          ) : isError || !post ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="text-not-found">
                {t.notFound}
              </h1>
              <p className="text-muted-foreground text-lg" data-testid="text-not-found-description">
                {t.notFoundDescription}
              </p>
            </motion.div>
          ) : (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Featured Image */}
              <div className="aspect-video overflow-hidden rounded-lg mb-8">
                <img
                  src={post.imageUrl}
                  alt={language === "ar" ? post.titleAr : post.title}
                  className="w-full h-full object-cover"
                  data-testid="img-post-featured"
                />
              </div>

              {/* Post Header */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" data-testid="badge-category">
                    {language === "ar" ? post.categoryAr : post.category}
                  </Badge>
                </div>
                <h1 className="font-serif font-bold text-4xl md:text-5xl text-foreground mb-6" data-testid="text-post-title">
                  {language === "ar" ? post.titleAr : post.title}
                </h1>
                <div className="flex items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <span className="text-lg" data-testid="text-author">
                      {language === "ar" ? post.authorAr : post.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span className="text-lg" data-testid="text-date">
                      {formatDate(post.publishedAt.toString())}
                    </span>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <Card>
                <CardContent className="prose prose-lg dark:prose-invert max-w-none pt-6">
                  <div
                    className="leading-relaxed text-foreground whitespace-pre-line"
                    data-testid="text-post-content"
                  >
                    {language === "ar" ? post.contentAr : post.content}
                  </div>
                </CardContent>
              </Card>
            </motion.article>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
