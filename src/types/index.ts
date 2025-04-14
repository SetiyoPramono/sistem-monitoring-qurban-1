
export interface AnimalStats {
  total: number;
  outOfPen: number;
  slaughtered: number;
}

export interface QurbanData {
  id?: string;
  goats: AnimalStats;
  sheep: AnimalStats;
  cows: AnimalStats;
  packaging: {
    total: number;
    completed: number;
  };
  distribution: {
    total: number;
    completed: number;
  };
  created_at?: string;
  updated_at?: string;
}

export interface QurbanRecord {
  id: string;
  total_goats: number;
  out_of_pen_goats: number;
  slaughtered_goats: number;
  total_sheep: number;
  out_of_pen_sheep: number;
  slaughtered_sheep: number;
  total_cows: number;
  out_of_pen_cows: number;
  slaughtered_cows: number;
  total_packaging: number;
  completed_packaging: number;
  total_distribution: number;
  completed_distribution: number;
  created_at: string;
  updated_at: string;
}
