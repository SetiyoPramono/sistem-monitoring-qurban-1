
import { useQurban } from "@/contexts/QurbanContext";
import AppLayout from "@/components/AppLayout";
import AdminFormCard from "@/components/AdminFormCard";
import ProcessFormCard from "@/components/ProcessFormCard";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

const Admin = () => {
  const { 
    data, 
    isLoading,
    updateGoats, 
    updateSheep, 
    updateCows, 
    updatePackaging, 
    updateDistribution,
    resetToDefaults
  } = useQurban();

  if (isLoading) {
    return (
      <AppLayout>
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">
            Gunakan halaman ini untuk mengelola data monitoring qurban.
          </p>
        </div>

        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Loading Data</AlertTitle>
          <AlertDescription>
            Mohon tunggu, data sedang dimuat dari database.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border rounded-lg p-6">
              <Skeleton className="h-6 w-[150px] mb-4" />
              <div className="space-y-4">
                <div>
                  <Skeleton className="h-4 w-[100px] mb-2" />
                  <Skeleton className="h-10 w-full mb-4" />
                </div>
                <div>
                  <Skeleton className="h-4 w-[150px] mb-2" />
                  <div className="flex space-x-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-[50px]" />
                  </div>
                </div>
                <div>
                  <Skeleton className="h-4 w-[130px] mb-2" />
                  <div className="flex space-x-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-[50px]" />
                  </div>
                </div>
                <Skeleton className="h-10 w-full mt-4" />
              </div>
            </div>
          ))}
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">
          Gunakan halaman ini untuk mengelola data monitoring qurban.
        </p>
      </div>

      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Perhatian</AlertTitle>
        <AlertDescription>
          Pastikan data yang dimasukkan sudah benar. Data akan otomatis disimpan saat diperbarui.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AdminFormCard
          title="Kambing"
          total={data.goats.total}
          outCount={data.goats.outOfPen}
          slaughteredCount={data.goats.slaughtered}
          onUpdate={updateGoats}
          color="#4caf50"
        />

        <AdminFormCard
          title="Domba"
          total={data.sheep.total}
          outCount={data.sheep.outOfPen}
          slaughteredCount={data.sheep.slaughtered}
          onUpdate={updateSheep}
          color="#ff9800"
        />

        <AdminFormCard
          title="Sapi"
          total={data.cows.total}
          outCount={data.cows.outOfPen}
          slaughteredCount={data.cows.slaughtered}
          onUpdate={updateCows}
          color="#2196f3"
        />

        <ProcessFormCard
          title="Packing Daging"
          total={data.packaging.total}
          completed={data.packaging.completed}
          onUpdate={updatePackaging}
          color="#ff5722"
        />

        <ProcessFormCard
          title="Distribusi Daging"
          total={data.distribution.total}
          completed={data.distribution.completed}
          onUpdate={updateDistribution}
          color="#f44336"
        />
      </div>

      <div className="mt-8 text-center">
        <Button 
          variant="destructive"
          onClick={resetToDefaults}
          className="w-full md:w-auto"
        >
          Reset ke Default
        </Button>
      </div>
    </AppLayout>
  );
};

export default Admin;
