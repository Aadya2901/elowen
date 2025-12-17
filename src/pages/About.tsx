import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import SoftCard from "@/components/SoftCard";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Soft background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 right-20 w-64 h-64 bg-sky-light rounded-full blur-3xl opacity-30 animate-float" />
        <div className="absolute bottom-24 left-20 w-56 h-56 bg-sage-light rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-24 pb-16">
        <div className="max-w-xl mx-auto">
          <SoftCard className="bg-card/90 backdrop-blur-sm">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-semibold text-foreground mb-8 text-center"
            >
              About Elowen
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 text-foreground leading-relaxed"
            >
              <p>
                Elowen was created to help people slow down and reflect safely,
                especially in cultures where emotional expression feels difficult.
              </p>

              <p>
                Elowen does not replace professional mental health care.
                It exists to offer space, warmth, and emotional awareness.
              </p>

              <p className="text-muted-foreground text-sm pt-4">
                Sometimes we just need a quiet place to pause. Elowen is that place.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 pt-8 border-t border-border/50 text-center"
            >
              <p className="text-sm text-muted-foreground">
                Built with care during PeerBridge Mental Health Hacks 2025.
              </p>
            </motion.div>
          </SoftCard>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xs text-muted-foreground/60 text-center mt-8 px-4"
          >
            Elowen is a reflective space, not a substitute for professional care.
          </motion.p>
        </div>
      </main>
    </div>
  );
};

export default About;
