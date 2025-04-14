
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProgressBar from "@/components/ProgressBar";

interface StatCardProps {
  title: string;
  total: number;
  outCount: number;
  outLabel: string;
  outColor: string;
  slaughteredCount: number;
  slaughteredLabel: string;
  slaughteredColor: string;
}

const StatCard = ({
  title,
  total,
  outCount,
  outLabel,
  outColor,
  slaughteredCount,
  slaughteredLabel,
  slaughteredColor
}: StatCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{title} (Total: {total})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="font-medium">{outLabel}:</span>
            <span className="font-bold">{outCount} ekor</span>
          </div>
          <ProgressBar 
            value={outCount} 
            max={total} 
            color={outColor} 
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="font-medium">{slaughteredLabel}:</span>
            <span className="font-bold">{slaughteredCount} ekor</span>
          </div>
          <ProgressBar 
            value={slaughteredCount} 
            max={total} 
            color={slaughteredColor} 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
