export type Priority = 'low' | 'medium' | 'high'
export type Category = 'work' | 'personal' | 'shopping' | 'health' | 'others'
export type TaskStatus = 'all' | 'active' | 'completed'

export interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  category: Category
  priority: Priority
  completed: boolean
  createdAt: string
  updatedAt: string
} 