import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Soft background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-sage-light rounded-full blur-3xl opacity-40 animate-float" />
        <div className="absolute top-40 right-20 w-48 h-48 bg-peach-light rounded-full blur-3xl opacity-40 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 left-1/3 w-56 h-56 bg-lavender-light rounded-full blur-3xl opacity-40 animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-20">
        <div className="max-w-2xl mx-auto text-center stagger-children">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-bold text-foreground mb-4 tracking-tight"
          >
            Elowen
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 font-medium"
          >
            A gentle place to pause.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-lg mx-auto"
          >
            Elowen is a quiet space for emotional reflection.
            <br />
            No fixing. No judgment. Just room to be heard.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col items-center gap-4"
          >
            <Button asChild variant="sage" size="xl">
              <Link to="/softspace">Enter Softspace</Link>
            </Button>

            <p className="text-sm text-muted-foreground mt-4">
              No login required. Your words stay yours.
            </p>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="absolute bottom-8 text-xs text-muted-foreground/60 text-center px-6"
        >
          Elowen is a reflective space, not a substitute for professional care.
        </motion.p>
      </main>
    </div>
  );
};

export default Index;
