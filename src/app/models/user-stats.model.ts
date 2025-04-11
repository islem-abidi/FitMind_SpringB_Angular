export interface UserStatsResponse {
  totalUsers: number;
  countBySexe: { [key: string]: number };
  countByRole: { [key: string]: number };

  }
  