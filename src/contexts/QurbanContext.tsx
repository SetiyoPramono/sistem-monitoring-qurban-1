
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { QurbanData, AnimalStats } from '@/types';
import { loadData, saveData, resetData } from '@/lib/db';
import { toast } from '@/hooks/use-toast';

interface QurbanContextType {
  data: QurbanData;
  isLoading: boolean;
  updateGoats: (stats: Partial<AnimalStats>) => Promise<void>;
  updateSheep: (stats: Partial<AnimalStats>) => Promise<void>;
  updateCows: (stats: Partial<AnimalStats>) => Promise<void>;
  updatePackaging: (total: number | undefined, completed: number | undefined) => Promise<void>;
  updateDistribution: (total: number | undefined, completed: number | undefined) => Promise<void>;
  resetToDefaults: () => Promise<void>;
}

const QurbanContext = createContext<QurbanContextType | undefined>(undefined);

export const QurbanProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<QurbanData>({
    goats: { total: 0, outOfPen: 0, slaughtered: 0 },
    sheep: { total: 0, outOfPen: 0, slaughtered: 0 },
    cows: { total: 0, outOfPen: 0, slaughtered: 0 },
    packaging: { total: 0, completed: 0 },
    distribution: { total: 0, completed: 0 }
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const qurbanData = await loadData();
        setData(qurbanData);
      } catch (error) {
        console.error("Failed to load data:", error);
        toast({
          title: "Error Loading Data",
          description: "Failed to load qurban data from the database.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateGoats = async (stats: Partial<AnimalStats>) => {
    try {
      const updated = {
        ...data,
        goats: { ...data.goats, ...stats }
      };
      
      // Validation
      if (updated.goats.outOfPen > updated.goats.total) {
        toast({
          title: "Validasi Gagal",
          description: "Jumlah keluar kandang tidak boleh melebihi total kambing",
          variant: "destructive"
        });
        return;
      }
      
      if (updated.goats.slaughtered > updated.goats.outOfPen) {
        toast({
          title: "Validasi Gagal",
          description: "Jumlah disembelih tidak boleh melebihi jumlah keluar kandang",
          variant: "destructive"
        });
        return;
      }
      
      const savedData = await saveData(updated);
      setData(savedData);
      
      toast({
        title: "Data Berhasil Diperbarui",
        description: "Data kambing telah diperbarui",
      });
    } catch (error) {
      toast({
        title: "Error Updating Data",
        description: "Failed to update goat data.",
        variant: "destructive"
      });
    }
  };

  const updateSheep = async (stats: Partial<AnimalStats>) => {
    try {
      const updated = {
        ...data,
        sheep: { ...data.sheep, ...stats }
      };
      
      // Validation
      if (updated.sheep.outOfPen > updated.sheep.total) {
        toast({
          title: "Validasi Gagal",
          description: "Jumlah keluar kandang tidak boleh melebihi total domba",
          variant: "destructive"
        });
        return;
      }
      
      if (updated.sheep.slaughtered > updated.sheep.outOfPen) {
        toast({
          title: "Validasi Gagal",
          description: "Jumlah disembelih tidak boleh melebihi jumlah keluar kandang",
          variant: "destructive"
        });
        return;
      }
      
      const savedData = await saveData(updated);
      setData(savedData);
      
      toast({
        title: "Data Berhasil Diperbarui",
        description: "Data domba telah diperbarui",
      });
    } catch (error) {
      toast({
        title: "Error Updating Data",
        description: "Failed to update sheep data.",
        variant: "destructive"
      });
    }
  };

  const updateCows = async (stats: Partial<AnimalStats>) => {
    try {
      const updated = {
        ...data,
        cows: { ...data.cows, ...stats }
      };
      
      // Validation
      if (updated.cows.outOfPen > updated.cows.total) {
        toast({
          title: "Validasi Gagal",
          description: "Jumlah keluar kandang tidak boleh melebihi total sapi",
          variant: "destructive"
        });
        return;
      }
      
      if (updated.cows.slaughtered > updated.cows.outOfPen) {
        toast({
          title: "Validasi Gagal",
          description: "Jumlah disembelih tidak boleh melebihi jumlah keluar kandang",
          variant: "destructive"
        });
        return;
      }
      
      const savedData = await saveData(updated);
      setData(savedData);
      
      toast({
        title: "Data Berhasil Diperbarui",
        description: "Data sapi telah diperbarui",
      });
    } catch (error) {
      toast({
        title: "Error Updating Data",
        description: "Failed to update cow data.",
        variant: "destructive"
      });
    }
  };

  const updatePackaging = async (total: number | undefined, completed: number | undefined) => {
    try {
      const newTotal = total !== undefined ? total : data.packaging.total;
      const newCompleted = completed !== undefined ? completed : data.packaging.completed;
      
      // Validation
      if (newCompleted > newTotal) {
        toast({
          title: "Validasi Gagal",
          description: "Jumlah packing selesai tidak boleh melebihi total packing",
          variant: "destructive"
        });
        return;
      }
      
      const updated = {
        ...data,
        packaging: { total: newTotal, completed: newCompleted }
      };
      
      const savedData = await saveData(updated);
      setData(savedData);
      
      toast({
        title: "Data Berhasil Diperbarui",
        description: "Data packing telah diperbarui",
      });
    } catch (error) {
      toast({
        title: "Error Updating Data",
        description: "Failed to update packaging data.",
        variant: "destructive"
      });
    }
  };

  const updateDistribution = async (total: number | undefined, completed: number | undefined) => {
    try {
      const newTotal = total !== undefined ? total : data.distribution.total;
      const newCompleted = completed !== undefined ? completed : data.distribution.completed;
      
      // Validation
      if (newCompleted > newTotal) {
        toast({
          title: "Validasi Gagal",
          description: "Jumlah distribusi selesai tidak boleh melebihi total distribusi",
          variant: "destructive"
        });
        return;
      }
      
      const updated = {
        ...data,
        distribution: { total: newTotal, completed: newCompleted }
      };
      
      const savedData = await saveData(updated);
      setData(savedData);
      
      toast({
        title: "Data Berhasil Diperbarui",
        description: "Data distribusi telah diperbarui",
      });
    } catch (error) {
      toast({
        title: "Error Updating Data",
        description: "Failed to update distribution data.",
        variant: "destructive"
      });
    }
  };

  const resetToDefaults = async () => {
    try {
      const defaultData = await resetData();
      setData(defaultData);
      toast({
        title: "Data Direset",
        description: "Semua data telah direset ke nilai default",
      });
    } catch (error) {
      toast({
        title: "Error Resetting Data",
        description: "Failed to reset data to defaults.",
        variant: "destructive"
      });
    }
  };

  return (
    <QurbanContext.Provider
      value={{
        data,
        isLoading,
        updateGoats,
        updateSheep,
        updateCows,
        updatePackaging,
        updateDistribution,
        resetToDefaults
      }}
    >
      {children}
    </QurbanContext.Provider>
  );
};

export const useQurban = () => {
  const context = useContext(QurbanContext);
  if (context === undefined) {
    throw new Error('useQurban must be used within a QurbanProvider');
  }
  return context;
};
