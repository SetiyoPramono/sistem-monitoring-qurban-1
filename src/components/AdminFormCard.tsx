
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface AdminFormCardProps {
  title: string;
  total: number;
  outCount: number;
  slaughteredCount: number;
  onUpdate: (data: { total?: number; outOfPen?: number; slaughtered?: number }) => void;
  color: string;
}

const AdminFormCard = ({
  title,
  total,
  outCount,
  slaughteredCount,
  onUpdate,
  color
}: AdminFormCardProps) => {
  const [newTotal, setNewTotal] = useState(total.toString());
  const [newOutCount, setNewOutCount] = useState(outCount.toString());
  const [newSlaughteredCount, setNewSlaughteredCount] = useState(slaughteredCount.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onUpdate({
      total: parseInt(newTotal) || 0,
      outOfPen: parseInt(newOutCount) || 0,
      slaughtered: parseInt(newSlaughteredCount) || 0
    });
  };

  const incrementOut = () => {
    const currentOut = parseInt(newOutCount) || 0;
    if (currentOut < total) {
      setNewOutCount((currentOut + 1).toString());
      onUpdate({ outOfPen: currentOut + 1 });
    }
  };

  const incrementSlaughtered = () => {
    const currentOut = parseInt(newOutCount) || 0;
    const currentSlaughtered = parseInt(newSlaughteredCount) || 0;
    if (currentSlaughtered < currentOut) {
      setNewSlaughteredCount((currentSlaughtered + 1).toString());
      onUpdate({ slaughtered: currentSlaughtered + 1 });
    }
  };

  return (
    <Card className="border-t-4" style={{ borderTopColor: color }}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`${title}-total`}>Total</Label>
            <Input
              id={`${title}-total`}
              type="number"
              min="0"
              value={newTotal}
              onChange={(e) => setNewTotal(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`${title}-out`}>Keluar Kandang</Label>
            <div className="flex space-x-2">
              <Input
                id={`${title}-out`}
                type="number"
                min="0"
                max={total}
                value={newOutCount}
                onChange={(e) => setNewOutCount(e.target.value)}
              />
              <Button 
                type="button" 
                onClick={incrementOut}
                variant="outline"
              >
                +1
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`${title}-slaughtered`}>Terpotong</Label>
            <div className="flex space-x-2">
              <Input
                id={`${title}-slaughtered`}
                type="number"
                min="0"
                max={outCount}
                value={newSlaughteredCount}
                onChange={(e) => setNewSlaughteredCount(e.target.value)}
              />
              <Button 
                type="button" 
                onClick={incrementSlaughtered}
                variant="outline"
              >
                +1
              </Button>
            </div>
          </div>
          
          <Button type="submit" className="w-full">Update {title}</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminFormCard;
