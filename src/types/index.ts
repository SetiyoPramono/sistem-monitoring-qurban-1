
export interface AnimalStats {
  total: number;
  outOfPen: number;
  slaughtered: number;
}

export interface QurbanData {
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
}
