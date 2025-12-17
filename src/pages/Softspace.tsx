import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import SoftCard from "@/components/SoftCard";

const tones = [
  { id: "global", label: "Global" },
  { id: "south-asian", label: "South Asian" },
  { id: "east-asian", label: "East Asian" },
  { id: "western", label: "Western" },
];

const Softspace = () => {
  const navigate = useNavigate();
  const [reflection, setReflection] = useState("");
  const [selectedTone, setSelectedTone] = useState("global");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!reflection.trim()) return;
    
    setIsSubmitting(true);
    
    // Navigate to response page with the reflection
    navigate("/softspace/response", {
      state: { reflection, tone: selectedTone },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Soft background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 right-10 w-72 h-72 bg-lavender-light rounded-full blur-3xl opacity-30 animate-float" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-sky-light rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: "1.5s" }} />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-24 pb-12">
        <div className="w-full max-w-xl mx-auto">
          <SoftCard className="bg-card/90 backdrop-blur-sm">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-foreground mb-6 text-center leading-relaxed"
            >
              What's been sitting quietly on your mind?
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="You don't have to explain it perfectly. Just write."
                className="min-h-[180px] bg-muted/50 border-border/50 rounded-2xl resize-none text-foreground placeholder:text-muted-foreground/60 focus:ring-sage/30 focus:border-sage/50 transition-all duration-300"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8"
            >
              <p className="text-sm text-muted-foreground mb-4">
                Choose a tone that feels closest to you
              </p>
              <div className="flex flex-wrap gap-2">
                {tones.map((tone) => (
                  <button
                    key={tone.id}
                    onClick={() => setSelectedTone(tone.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      selectedTone === tone.id
                        ? "bg-sage text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {tone.label}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex justify-center"
            >
              <Button
                onClick={handleSubmit}
                disabled={!reflection.trim() || isSubmitting}
                variant="sage"
                size="lg"
                className="min-w-[180px]"
              >
                {isSubmitting ? "Holding..." : "Hold this for me"}
              </Button>
            </motion.div>
          </SoftCard>
        </div>
      </main>
    </div>
  );
};

export default Softspace;
