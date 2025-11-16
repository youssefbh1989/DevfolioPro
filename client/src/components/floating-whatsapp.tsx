import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";

interface FloatingWhatsAppProps {
  language?: "en" | "ar";
}

const WHATSAPP_NUMBER = "97412345678";

export function FloatingWhatsApp({ language = "en" }: FloatingWhatsAppProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = async () => {
    await apiRequest("POST", "/api/analytics/whatsapp", {}).catch(() => {});
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank", "noopener,noreferrer");
  };

  const tooltipText = language === "ar" ? "تواصل عبر واتساب" : "Chat on WhatsApp";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20 
          }}
          className="fixed bottom-6 right-6 z-50 group"
          data-testid="floating-whatsapp"
        >
          <div className="relative">
            <motion.div
              className="absolute -top-12 right-0 bg-card border shadow-lg rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
            >
              <p className="text-sm font-medium">{tooltipText}</p>
            </motion.div>
            
            <motion.button
              onClick={handleClick}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-lg transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              data-testid="button-floating-whatsapp"
            >
              <MessageCircle className="h-7 w-7" />
            </motion.button>
            
            <motion.div
              className="absolute inset-0 rounded-full bg-[#25D366] -z-10"
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.7, 0, 0.7]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
