import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import SoftCard from "@/components/SoftCard";

interface AIResponse {
  feelings: string;
  gentleThought: string;
  quietQuestion: string;
}

const SoftspaceResponse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [showSharedMessage, setShowSharedMessage] = useState(false);

  const reflection = location.state?.reflection || "";
  const tone = location.state?.tone || "global";

  useEffect(() => {
    if (!reflection) {
      navigate("/softspace");
      return;
    }

    // Simulate AI response generation
    const generateResponse = async () => {
      setIsLoading(true);
      
      // In production, this would call an AI edge function
      // For now, we'll generate a gentle, contextual response
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const responses = getContextualResponse(reflection, tone);
      setResponse(responses);
      setIsLoading(false);
    };

    generateResponse();
  }, [reflection, tone, navigate]);

  const getContextualResponse = (text: string, culturalTone: string): AIResponse => {
    // Contextual responses based on common emotional themes
    const lowerText = text.toLowerCase();
    
    let feelings = "";
    let gentleThought = "";
    let quietQuestion = "";

    if (lowerText.includes("tired") || lowerText.includes("exhausted") || lowerText.includes("overwhelm")) {
      feelings = "This feels like a heaviness that has been building quietly. There might be some weariness underneath, and perhaps a quiet longing for rest.";
      gentleThought = "It takes strength to notice when you are carrying too much.";
      quietQuestion = "What might it feel like to set something down, even briefly?";
    } else if (lowerText.includes("alone") || lowerText.includes("lonely") || lowerText.includes("disconnect")) {
      feelings = "There seems to be a quiet ache here, something like loneliness. Perhaps also a gentle hope for connection, even if it feels distant right now.";
      gentleThought = "Loneliness often comes from caring deeply about connection.";
      quietQuestion = "When was a time you felt truly seen by someone?";
    } else if (lowerText.includes("anxious") || lowerText.includes("worry") || lowerText.includes("scared")) {
      feelings = "This feels like there is something stirring beneath the surface, perhaps worry or unease. There might also be a quiet courage in acknowledging it.";
      gentleThought = "Your mind is trying to protect you, even when the worry feels heavy.";
      quietQuestion = "What would feel like safety right now, even in a small way?";
    } else if (lowerText.includes("sad") || lowerText.includes("grief") || lowerText.includes("loss")) {
      feelings = "There is a tenderness here, perhaps grief or a deep sadness. Underneath it, there might also be love for something or someone that mattered.";
      gentleThought = "Sadness often points to what we hold dear.";
      quietQuestion = "What might you want to honor about what you are feeling?";
    } else if (lowerText.includes("angry") || lowerText.includes("frustrat") || lowerText.includes("unfair")) {
      feelings = "This feels like something is asking to be heard, perhaps frustration or a sense of injustice. There might also be a boundary wanting to be acknowledged.";
      gentleThought = "Anger can be a messenger for what matters to you.";
      quietQuestion = "What need might be asking for attention here?";
    } else {
      feelings = "There seems to be something sitting quietly with you, perhaps a mix of feelings that are hard to name. Sometimes things settle in places words cannot easily reach.";
      gentleThought = "Not everything needs to be understood right away.";
      quietQuestion = "What might it feel like to simply let this be here for now?";
    }

    // Add cultural sensitivity based on tone
    if (culturalTone === "south-asian" || culturalTone === "east-asian") {
      gentleThought = gentleThought + " Sometimes the expectations we carry are not entirely our own.";
    }

    return { feelings, gentleThought, quietQuestion };
  };

  const handleKeepPrivate = () => {
    navigate("/softspace");
  };

  const handleShare = () => {
    // Save to shared reflections (in production, this would save to database)
    const existingShared = JSON.parse(localStorage.getItem("sharedReflections") || "[]");
    existingShared.unshift({
      id: Date.now(),
      excerpt: reflection.slice(0, 150) + (reflection.length > 150 ? "..." : ""),
      relateCount: 0,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("sharedReflections", JSON.stringify(existingShared.slice(0, 50)));
    
    setShowSharedMessage(true);
    setTimeout(() => {
      navigate("/shared");
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="flex flex-col items-center justify-center min-h-screen px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sage-light animate-gentle-pulse" />
            <p className="text-lg text-muted-foreground">
              Holding this gently...
            </p>
          </motion.div>
        </main>
      </div>
    );
  }

  if (showSharedMessage) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="flex flex-col items-center justify-center min-h-screen px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sage flex items-center justify-center">
              <svg className="w-8 h-8 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg text-foreground">
              Shared gently.
            </p>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Soft background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-10 w-64 h-64 bg-peach-light rounded-full blur-3xl opacity-30 animate-float" />
        <div className="absolute bottom-32 right-10 w-72 h-72 bg-sage-light rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-24 pb-12">
        <div className="w-full max-w-xl mx-auto">
          <SoftCard className="bg-card/90 backdrop-blur-sm">
            {response && (
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                    What this feels like
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    {response.feelings}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                    A gentle thought
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    {response.gentleThought}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                    A quiet question
                  </h3>
                  <p className="text-foreground leading-relaxed italic">
                    {response.quietQuestion}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="pt-6 flex flex-col sm:flex-row gap-3 justify-center"
                >
                  <Button
                    onClick={handleKeepPrivate}
                    variant="sage"
                    size="lg"
                  >
                    Keep this private
                  </Button>
                  <Button
                    onClick={handleShare}
                    variant="soft"
                    size="lg"
                  >
                    Share this gently
                  </Button>
                </motion.div>
              </div>
            )}
          </SoftCard>
        </div>
      </main>
    </div>
  );
};

export default SoftspaceResponse;
