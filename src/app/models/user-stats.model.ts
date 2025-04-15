export interface UserStatsResponse {
  totalUsers: number;
  countBySexe: { [key: string]: number };
  countByRole: { [key: string]: number };
  loginsPerDay: { [date: string]: number }; // ✅ nouveau
  activeUsers: number;                      // ✅ nouveau
  inactiveUsers: number;                    // ✅ nouveau
  avgLastSeenDays: number;                  // ✅ nouveau
}
