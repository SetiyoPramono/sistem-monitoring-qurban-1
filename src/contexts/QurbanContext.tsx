
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { QurbanData, AnimalStats } from '@/types';
import { loadData, saveData } from '@/lib/db';
import { toast } from '@/hooks/use-toast';

interface QurbanContextType {
  data: QurbanData;
  updateGoats: (stats: Partial<AnimalStats>) => void;
  updateSheep: (stats: Partial<AnimalStats>) => void;
  updateCows: (stats: Partial<AnimalStats>) => void;
  updatePackaging: (total: number | undefined, completed: number | undefined) => void;
  updateDistribution: (total: number | undefined, completed: number | undefined) => void;
  resetToDefaults: () => void;
}

const QurbanContext = createContext<QurbanContextType | undefined>(undefined);

export const QurbanProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<QurbanData>(loadData());

  useEffect(() => {
    // Save data whenever it changes
    saveData(data);
  }, [data]);

  const updateGoats = (stats: Partial<AnimalStats>) => {
    setData(prev => {
      const updated = {
        ...prev,
        goats: { ...prev.goats, ...stats }
      };
      
      // Validation
      if (updated.goats.outOfPen > updated.goats.total) {
        toast({
          title: "Validasi Gagal",
          description: "Jumlah keluar kandang tidak boleh melebihi total kambing",
          variant: "destructive"
        });
        return prev;
      }
      
      if (updated.goats.slaughtered > updated.goats.outOfPen) {
        toast({
          title: "Validasi Gagal",
          description: "Jumlah disembelih tidak boleh melebihi jumlah keluar kandang",
          variant: "destructive"
        });
        return prev;
      }
      
      toast({
        title: "Data Berhasil Diperbarui",
        description: "Data kambing telah diperbarui",
      });
      
      return updated;
    });
  };

  const updateSheep = (stats: Partial<AnimalStats>) => {
    setData(prev => {
      const updated = {
        ...prev,
        sheep: { ...prev.sheep, ...stats }
      };
      
      // Validation
      if (updated.sheep.outOfPen > updated.sheep.total) {
        toast({
          title: "Validasi Gagal",
          description: "Jumlah keluar kandang tidak boleh melebihi total domba",
          variant: "destructive"
        });
        return prev;
      }
      
      if (updated.sheep.slaughtered > updated.sheep.outOfPen) {
        toast({
          title: "Validasi Gagal",
          description: "Jumlah disembelih tidak boleh melebihi jumlah keluar kandang",
          variant: "destructive"
        });
        return prev;
      }
      
      toast({
        title: "Data Berhasil Diperbarui",
        description: "Data domba telah diperbarui",
      });
      
      return updated;
    });
  };

  const updateCows = (stats: Partial<AnimalStats>) => {
    setData(prev => {
      const updated = {
        ...prev,
        cows: { ...prev.cows, ...stats }
      };
      
      // Validation
      if (updated.cows.outOfPen > updated.cows.total) {
        toast({
          title: "Validasi Gagal",
          description: "Jumlah keluar kandang tidak boleh melebihi total sapi",
          variant: "destructive"
        });
        return prev;
      }
      
      if (updated.cows.slaughtered > updated.cows.outOfPen) {
        toast({
          title: "Validasi Gagal",
          description: "Jumlah disembelih tidak boleh melebihi jumlah keluar kandang",
          variant: "destructive"
        });
        return prev;
      }
      
      toast({
        title: "Data Berhasil Diperbarui",
        description: "Data sapi telah diperbarui",
      });
      
      return updated;
    });
  };

  const updatePackaging = (total: number | undefined, completed: number | undefined) => {
    setData(prev => {
      const newTotal = total !== undefined ? total : prev.packaging.total;
      const newCompleted = completed !== undefined ? completed : prev.packaging.completed;
      
      // Validation
      if (newCompleted > newTotal) {
        toast({
          title: "Validasi Gagal",
          description: "Jumlah packing selesai tidak boleh melebihi total packing",
          variant: "destructive"
        });
        return prev;
      }
      
      toast({
        title: "Data Berhasil Diperbarui",
        description: "Data packing telah diperbarui",
      });
      
      return {
        ...prev,
        packaging: { total: newTotal, completed: newCompleted }
      };
    });
  };

  const updateDistribution = (total: number | undefined, completed: number | undefined) => {
    setData(prev => {
      const newTotal = total !== undefined ? total : prev.distribution.total;
      const newCompleted = completed !== undefined ? completed : prev.distribution.completed;
      
      // Validation
      if (newCompleted > newTotal) {
        toast({
          title: "Validasi Gagal",
          description: "Jumlah distribusi selesai tidak boleh melebihi total distribusi",
          variant: "destructive"
        });
        return prev;
      }
      
      toast({
        title: "Data Berhasil Diperbarui",
        description: "Data distribusi telah diperbarui",
      });
      
      return {
        ...prev,
        distribution: { total: newTotal, completed: newCompleted }
      };
    });
  };

  const resetToDefaults = () => {
    const defaultData = loadData();
    setData(defaultData);
    toast({
      title: "Data Direset",
      description: "Semua data telah direset ke nilai default",
    });
  };

  return (
    <QurbanContext.Provider
      value={{
        data,
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
