
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProgressBar from "@/components/ProgressBar";

interface ProcessCardProps {
  title: string;
  total: number;
  completed: number;
  label: string;
  color: string;
}

const ProcessCard = ({
  title,
  total,
  completed,
  label,
  color
}: ProcessCardProps) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg sm:text-xl break-words">{title} (Total: {total})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap justify-between mb-1 gap-1">
          <span className="font-medium text-sm sm:text-base">{label}:</span>
          <span className="font-bold text-sm sm:text-base">{completed} bungkus</span>
        </div>
        <ProgressBar value={completed} max={total} color={color} />
      </CardContent>
    </Card>
  );
};

export default ProcessCard;
