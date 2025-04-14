
import { QurbanData, QurbanRecord } from "@/types";
import { supabase } from "@/integrations/supabase/client";

// Initial default data
const DEFAULT_DATA: QurbanData = {
  goats: {
    total: 200,
    outOfPen: 0,
    slaughtered: 0
  },
  sheep: {
    total: 500,
    outOfPen: 0,
    slaughtered: 0
  },
  cows: {
    total: 50,
    outOfPen: 0,
    slaughtered: 0
  },
  packaging: {
    total: 1500,
    completed: 0
  },
  distribution: {
    total: 1500,
    completed: 0
  }
};

// Convert database record to app data format
const mapRecordToData = (record: QurbanRecord): QurbanData => {
  return {
    id: record.id,
    goats: {
      total: record.total_goats,
      outOfPen: record.out_of_pen_goats,
      slaughtered: record.slaughtered_goats
    },
    sheep: {
      total: record.total_sheep,
      outOfPen: record.out_of_pen_sheep,
      slaughtered: record.slaughtered_sheep
    },
    cows: {
      total: record.total_cows,
      outOfPen: record.out_of_pen_cows,
      slaughtered: record.slaughtered_cows
    },
    packaging: {
      total: record.total_packaging,
      completed: record.completed_packaging
    },
    distribution: {
      total: record.total_distribution,
      completed: record.completed_distribution
    },
    created_at: record.created_at,
    updated_at: record.updated_at
  };
};

// Convert app data format to database record format
const mapDataToRecord = (data: QurbanData): Omit<QurbanRecord, 'id' | 'created_at' | 'updated_at'> => {
  return {
    total_goats: data.goats.total,
    out_of_pen_goats: data.goats.outOfPen,
    slaughtered_goats: data.goats.slaughtered,
    total_sheep: data.sheep.total,
    out_of_pen_sheep: data.sheep.outOfPen,
    slaughtered_sheep: data.sheep.slaughtered,
    total_cows: data.cows.total,
    out_of_pen_cows: data.cows.outOfPen,
    slaughtered_cows: data.cows.slaughtered,
    total_packaging: data.packaging.total,
    completed_packaging: data.packaging.completed,
    total_distribution: data.distribution.total,
    completed_distribution: data.distribution.completed
  };
};

// Load data from Supabase
export const loadData = async (): Promise<QurbanData> => {
  try {
    const { data, error } = await supabase
      .from('qurban_data')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    if (error) {
      console.error('Error fetching data:', error);
      return DEFAULT_DATA;
    }
    
    return mapRecordToData(data as QurbanRecord);
  } catch (e) {
    console.error('Error loading data:', e);
    return DEFAULT_DATA;
  }
};

// Save data to Supabase
export const saveData = async (data: QurbanData): Promise<QurbanData> => {
  try {
    if (data.id) {
      // Update existing record
      const { data: updatedData, error } = await supabase
        .from('qurban_data')
        .update(mapDataToRecord(data))
        .eq('id', data.id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating data:', error);
        throw error;
      }
      
      return mapRecordToData(updatedData as QurbanRecord);
    } else {
      // Create new record
      const { data: newData, error } = await supabase
        .from('qurban_data')
        .insert(mapDataToRecord(data))
        .select()
        .single();
      
      if (error) {
        console.error('Error creating data:', error);
        throw error;
      }
      
      return mapRecordToData(newData as QurbanRecord);
    }
  } catch (e) {
    console.error('Error saving data:', e);
    throw e;
  }
};

// Reset to default data
export const resetData = async (): Promise<QurbanData> => {
  try {
    // Get current record ID if it exists
    const { data: currentData } = await supabase
      .from('qurban_data')
      .select('id')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    if (currentData?.id) {
      // Update existing record with default values
      const { data: resetData, error } = await supabase
        .from('qurban_data')
        .update(mapDataToRecord(DEFAULT_DATA))
        .eq('id', currentData.id)
        .select()
        .single();
      
      if (error) {
        console.error('Error resetting data:', error);
        throw error;
      }
      
      return mapRecordToData(resetData as QurbanRecord);
    } else {
      // Create new record with default values
      const { data: newData, error } = await supabase
        .from('qurban_data')
        .insert(mapDataToRecord(DEFAULT_DATA))
        .select()
        .single();
      
      if (error) {
        console.error('Error creating default data:', error);
        throw error;
      }
      
      return mapRecordToData(newData as QurbanRecord);
    }
  } catch (e) {
    console.error('Error resetting data:', e);
    throw e;
  }
};
