export interface Habit {
  id: string;
  name: string;
  color: string;
  trackedDays: {
    [dateKey: string]: boolean;
  };
  createdAt: string;
}