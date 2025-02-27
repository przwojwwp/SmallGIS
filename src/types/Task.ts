export interface Task {
  id: string;
  title: string;
  status: 'Active' | 'Completed';
  createdAt: Date;
}
