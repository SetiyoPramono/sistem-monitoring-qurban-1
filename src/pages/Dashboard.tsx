
import { useQurban } from "@/contexts/QurbanContext";
import AppLayout from "@/components/AppLayout";
import PieChart from "@/components/PieChart";
import StatCard from "@/components/StatCard";
import ProcessCard from "@/components/ProcessCard";
import Clock from "@/components/Clock";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { isAuthenticated } from "@/utils/auth";

const Dashboard = () => {
  const { data, isLoading } = useQurban();
  const isAdmin = isAuthenticated();

  if (isLoading) {
    return (
      <AppLayout>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4 text-center">Status Penyembelihan</h2>
                <div className="flex items-center justify-center h-[300px]">
                  <Skeleton className="h-[250px] w-[250px] rounded-full" />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(5)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <Skeleton className="h-6 w-[200px] mb-4" />
                    <Skeleton className="h-4 w-[150px] mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-[150px] mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4 text-center">Status Penyembelihan</h2>
                <PieChart data={data} />
                <Clock />
              </CardContent>
              {!isAdmin && (
                <CardFooter className="flex justify-center pb-6">
                  <Link to="/login">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Login Admin
                    </Button>
                  </Link>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard
              title="Kambing"
              total={data.goats.total}
              outCount={data.goats.outOfPen}
              outLabel="Keluar Kandang"
              outColor="#4caf50"
              slaughteredCount={data.goats.slaughtered}
              slaughteredLabel="Terpotong"
              slaughteredColor="#8bc34a"
            />

            <StatCard
              title="Domba"
              total={data.sheep.total}
              outCount={data.sheep.outOfPen}
              outLabel="Keluar Kandang"
              outColor="#ff9800"
              slaughteredCount={data.sheep.slaughtered}
              slaughteredLabel="Terpotong"
              slaughteredColor="#f57c00"
            />

            <StatCard
              title="Sapi"
              total={data.cows.total}
              outCount={data.cows.outOfPen}
              outLabel="Keluar Kandang"
              outColor="#2196f3"
              slaughteredCount={data.cows.slaughtered}
              slaughteredLabel="Terpotong"
              slaughteredColor="#03a9f4"
            />

            <ProcessCard
              title="Packing Daging"
              total={data.packaging.total}
              completed={data.packaging.completed}
              label="Progres Packing"
              color="#ff5722"
            />

            <ProcessCard
              title="Distribusi Daging"
              total={data.distribution.total}
              completed={data.distribution.completed}
              label="Progres Distribusi"
              color="#f44336"
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
