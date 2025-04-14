
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
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{title} (Total: {total})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-1">
          <span className="font-medium">{label}:</span>
          <span className="font-bold">{completed} bungkus</span>
        </div>
        <ProgressBar value={completed} max={total} color={color} />
      </CardContent>
    </Card>
  );
};

export default ProcessCard;
