
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
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg sm:text-xl break-words">{title} (Total: {total})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex flex-wrap justify-between mb-1 gap-1">
            <span className="font-medium text-sm sm:text-base">{outLabel}:</span>
            <span className="font-bold text-sm sm:text-base">{outCount} ekor</span>
          </div>
          <ProgressBar 
            value={outCount} 
            max={total} 
            color={outColor} 
          />
        </div>
        
        <div>
          <div className="flex flex-wrap justify-between mb-1 gap-1">
            <span className="font-medium text-sm sm:text-base">{slaughteredLabel}:</span>
            <span className="font-bold text-sm sm:text-base">{slaughteredCount} ekor</span>
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
