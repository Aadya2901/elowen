import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";

interface SharedReflection {
  id: number;
  excerpt: string;
  relateCount: number;
  timestamp: string;
}

const SharedReflections = () => {
  const [reflections, setReflections] = useState<SharedReflection[]>([]);
  const [relatedIds, setRelatedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Load shared reflections
    const saved = JSON.parse(localStorage.getItem("sharedReflections") || "[]");
    
    // Add some seed reflections if empty
    if (saved.length === 0) {
      const seedReflections: SharedReflection[] = [
        {
          id: 1,
          excerpt: "Sometimes I feel like I'm carrying expectations that were handed to me before I could understand them. I don't know if they're mine anymore.",
          relateCount: 23,
          timestamp: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: 2,
          excerpt: "I've been feeling disconnected lately, like I'm watching my life from the outside. It's hard to explain to anyone without feeling like a burden.",
          relateCount: 45,
          timestamp: new Date(Date.now() - 172800000).toISOString(),
        },
        {
          id: 3,
          excerpt: "There's a tiredness that sleep doesn't fix. I wonder if others feel this too, or if I'm just not trying hard enough.",
          relateCount: 67,
          timestamp: new Date(Date.now() - 259200000).toISOString(),
        },
        {
          id: 4,
          excerpt: "I wish someone would just sit with me without trying to solve anything. Sometimes presence is enough.",
          relateCount: 89,
          timestamp: new Date(Date.now() - 345600000).toISOString(),
        },
      ];
      setReflections(seedReflections);
    } else {
      setReflections(saved);
    }

    // Load related IDs from session
    const savedRelated = JSON.parse(sessionStorage.getItem("relatedReflections") || "[]");
    setRelatedIds(new Set(savedRelated));
  }, []);

  const handleRelate = (id: number) => {
    if (relatedIds.has(id)) return;

    const newRelatedIds = new Set(relatedIds);
    newRelatedIds.add(id);
    setRelatedIds(newRelatedIds);
    sessionStorage.setItem("relatedReflections", JSON.stringify([...newRelatedIds]));

    setReflections((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, relateCount: r.relateCount + 1 } : r
      )
    );
  };

  const pastelColors = [
    "bg-sage-light",
    "bg-peach-light",
    "bg-lavender-light",
    "bg-sky-light",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Soft background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-48 h-48 bg-lavender-light rounded-full blur-3xl opacity-30 animate-float" />
        <div className="absolute bottom-40 right-1/4 w-56 h-56 bg-peach-light rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: "1.5s" }} />
      </div>

      <main className="relative z-10 pt-28 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl font-semibold text-foreground mb-4">
              Small pieces of honesty, shared gently.
            </h1>
            <p className="text-muted-foreground">
              You're not alone in feeling this way.
            </p>
          </motion.div>

          <div className="space-y-6">
            {reflections.map((reflection, index) => (
              <motion.div
                key={reflection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${pastelColors[index % pastelColors.length]} rounded-3xl p-6 shadow-card`}
              >
                <p className="text-foreground leading-relaxed mb-6">
                  {reflection.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleRelate(reflection.id)}
                    disabled={relatedIds.has(reflection.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      relatedIds.has(reflection.id)
                        ? "bg-foreground/10 text-foreground cursor-default"
                        : "bg-card text-foreground hover:bg-card/80 shadow-soft"
                    }`}
                  >
                    {relatedIds.has(reflection.id) ? "You relate" : "I relate"}
                  </button>
                  <span className="text-sm text-muted-foreground">
                    {reflection.relateCount} others relate
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {reflections.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-muted-foreground mt-12"
            >
              No reflections shared yet. Be the first to share gently.
            </motion.p>
          )}
        </div>
      </main>
    </div>
  );
};

export default SharedReflections;
