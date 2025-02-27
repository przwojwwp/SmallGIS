export interface Task {
  id: number;
  title: string;
  status: 'Active' | 'Completed';
  createdAt: Date;
}
