
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ProcessFormCardProps {
  title: string;
  total: number;
  completed: number;
  onUpdate: (total?: number, completed?: number) => void;
  color: string;
}

const ProcessFormCard = ({
  title,
  total,
  completed,
  onUpdate,
  color
}: ProcessFormCardProps) => {
  const [newTotal, setNewTotal] = useState(total.toString());
  const [newCompleted, setNewCompleted] = useState(completed.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onUpdate(
      parseInt(newTotal) || 0,
      parseInt(newCompleted) || 0
    );
  };

  const incrementCompleted = () => {
    const currentCompleted = parseInt(newCompleted) || 0;
    if (currentCompleted < total) {
      setNewCompleted((currentCompleted + 1).toString());
      onUpdate(undefined, currentCompleted + 1);
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
            <Label htmlFor={`${title}-completed`}>Jumlah Selesai</Label>
            <div className="flex space-x-2">
              <Input
                id={`${title}-completed`}
                type="number"
                min="0"
                max={total}
                value={newCompleted}
                onChange={(e) => setNewCompleted(e.target.value)}
              />
              <Button 
                type="button" 
                onClick={incrementCompleted}
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

export default ProcessFormCard;
