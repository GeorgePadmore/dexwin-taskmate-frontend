import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Task } from '@/types/task'
import type { AddTodoRequest, Category, Priority } from '@/services/todos'

interface TaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task?: Task
  categories: Category[]
  priorities: Priority[]
  loadingMeta?: boolean
  errorMeta?: string
  onAdd: (data: AddTodoRequest) => Promise<void>
  onEdit: (id: string, data: AddTodoRequest) => Promise<void>
}

export function TaskDialog({ open, onOpenChange, task, categories, priorities, loadingMeta, errorMeta, onAdd, onEdit }: TaskDialogProps) {
  const [formData, setFormData] = useState<AddTodoRequest>({
    title: task?.title || '',
    description: task?.description || '',
    dueDate: task?.dueDate?.split('T')[0] || '',
    categoryId:
      (task?.category && typeof task.category === 'object'
        ? (task.category as { id: string }).id
        : (task as Task & { categoryId?: string })?.categoryId) || (categories && categories.length > 0 ? categories[0].id : ''),
    priorityId:
      (task?.priority && typeof task.priority === 'object'
        ? (task.priority as { id: string }).id
        : (task as Task & { priorityId?: string })?.priorityId) || (priorities && priorities.length > 0 ? priorities[0].id : ''),
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setFormData({
      title: task?.title || '',
      description: task?.description || '',
      dueDate: task?.dueDate?.split('T')[0] || '',
      categoryId:
        (task?.category && typeof task.category === 'object'
          ? (task.category as { id: string }).id
          : (task as Task & { categoryId?: string })?.categoryId) || (categories && categories.length > 0 ? categories[0].id : ''),
      priorityId:
        (task?.priority && typeof task.priority === 'object'
          ? (task.priority as { id: string }).id
          : (task as Task & { priorityId?: string })?.priorityId) || (priorities && priorities.length > 0 ? priorities[0].id : ''),
    })
    setError('')
  }, [task, open, categories, priorities])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    try {
      if (task) {
        await onEdit(task.id, formData)
      } else {
        await onAdd(formData)
      }
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectClassName = "w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring dark:border-gray-700 dark:bg-gray-800 dark:text-white"

  if (loadingMeta) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogTitle className="sr-only">Loading</DialogTitle>
          <DialogDescription className="sr-only">Loading categories and priorities</DialogDescription>
          <div className="p-8 text-center">Loading...</div>
        </DialogContent>
      </Dialog>
    )
  }

  if (errorMeta) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogTitle>Error</DialogTitle>
          <DialogDescription>{errorMeta}</DialogDescription>
          <div className="p-8 text-center text-red-500">{errorMeta}</div>
        </DialogContent>
      </Dialog>
    )
  }

  if (!categories || !priorities || categories.length === 0 || priorities.length === 0) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogTitle className="sr-only">Loading</DialogTitle>
          <DialogDescription className="sr-only">Loading categories and priorities</DialogDescription>
          <div className="p-8 text-center">Loading...</div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] dark:bg-gray-900 dark:border-gray-800">
        <DialogHeader>
          <DialogTitle className="dark:text-white">{task ? 'Edit Task' : 'Add New Task'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-2 text-sm text-red-500 bg-red-50 rounded-md">{error}</div>}
          <div className="space-y-2">
            <Label htmlFor="title" className="dark:text-gray-200">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Task title"
              required
              className="dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="dark:text-gray-200">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Task description"
              className="dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dueDate" className="dark:text-gray-200">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
              required
              className="dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="categoryId" className="dark:text-gray-200">Category</Label>
            <select
              id="categoryId"
              value={formData.categoryId}
              onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
              className={selectClassName}
              disabled={isSubmitting}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="priorityId" className="dark:text-gray-200">Priority</Label>
            <select
              id="priorityId"
              value={formData.priorityId}
              onChange={(e) => setFormData(prev => ({ ...prev, priorityId: e.target.value }))}
              className={selectClassName}
              disabled={isSubmitting}
            >
              {priorities.map(pri => (
                <option key={pri.id} value={pri.id}>{pri.name}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#4461F2] hover:bg-[#2941dc] text-white" disabled={isSubmitting}>
              {isSubmitting ? (task ? 'Updating...' : 'Adding...') : (task ? 'Update Task' : 'Add Task')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 