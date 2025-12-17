import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SoftCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const SoftCard = ({ children, className, delay = 0 }: SoftCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={cn(
        "bg-card rounded-3xl p-8 shadow-gentle border border-border/30",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default SoftCard;
