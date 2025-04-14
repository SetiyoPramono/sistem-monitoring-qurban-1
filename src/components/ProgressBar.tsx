
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  color: string;
  label?: string;
  className?: string;
}

const ProgressBar = ({ value, max, color, label, className }: ProgressBarProps) => {
  const percentage = max > 0 ? Math.min(Math.round((value / max) * 100), 100) : 0;
  
  return (
    <div className={cn("w-full bg-gray-200 rounded-full h-6 overflow-hidden", className)}>
      <div 
        className="h-full flex items-center justify-center text-white text-sm font-medium transition-all duration-300 ease-in-out"
        style={{ 
          width: `${percentage}%`, 
          backgroundColor: color 
        }}
      >
        {label || `${percentage}%`}
      </div>
    </div>
  );
};

export default ProgressBar;
