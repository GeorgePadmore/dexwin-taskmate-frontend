import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus, Filter } from 'lucide-react'
import { Task as TaskComponent } from '@/components/Task'
import { TaskDialog } from '@/components/TaskDialog'
import { useTaskContext } from '@/store/TaskContext'
import { Task, TaskStatus } from '@/types/task'

export default function DashboardPage() {
  const { tasks, deleteTask, toggleTaskComplete } = useTaskContext()
  const [searchQuery, setSearchQuery] = useState('')
  const [status, setStatus] = useState<TaskStatus>('all')
  const [category, setCategory] = useState('')
  const [sortBy, setSortBy] = useState<keyof Task>('dueDate')
  const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>('ascending')
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | undefined>()
  const [showFilters, setShowFilters] = useState(false)

  const filteredTasks = tasks
    .filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = status === 'all' || 
        (status === 'completed' ? task.completed : !task.completed)
      const matchesCategory = !category || task.category === category

      return matchesSearch && matchesStatus && matchesCategory
    })
    .sort((a, b) => {
      const aValue = a[sortBy]
      const bValue = b[sortBy]
      const modifier = sortDirection === 'ascending' ? 1 : -1

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * modifier
      }
      if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
        return (aValue === bValue ? 0 : aValue ? 1 : -1) * modifier
      }
      return 0
    })

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] font-semibold text-[#1C1E21] dark:text-white">Your Tasks</h1>
          <Button
            className="bg-[#4461F2] hover:bg-[#2941dc] text-white rounded-[8px] h-12 px-4 flex items-center gap-2"
            onClick={() => setIsAddTaskOpen(true)}
          >
            <Plus className="w-5 h-5" />
            Add Task
          </Button>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280] dark:text-gray-400" />
            <Input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-10 pr-3 text-[16px] rounded-[8px] border border-[#E5E7EB] dark:border-gray-700 bg-white dark:bg-gray-800 placeholder:text-[#9CA3AF] dark:placeholder:text-gray-500 focus:border-[#4461F2] focus:ring-1 focus:ring-[#4461F2] dark:text-white"
            />
          </div>
          <Button
            variant="outline"
            className="h-12 gap-2 dark:border-gray-700 dark:text-white"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-5 h-5" />
            Filters
          </Button>
        </div>

        {showFilters && (
          <div className="p-6 bg-white dark:bg-gray-800 rounded-[12px] border border-[#E5E7EB] dark:border-gray-700 space-y-6">
            <div className="flex items-center gap-6">
              <div className="space-x-2">
                <input
                  type="radio"
                  id="all"
                  name="status"
                  value="all"
                  checked={status === 'all'}
                  onChange={(e) => setStatus(e.target.value as TaskStatus)}
                  className="text-[#4461F2] focus:ring-[#4461F2] dark:bg-gray-700"
                />
                <label htmlFor="all" className="text-[16px] text-[#1C1E21] dark:text-white">
                  All
                </label>
              </div>
              <div className="space-x-2">
                <input
                  type="radio"
                  id="active"
                  name="status"
                  value="active"
                  checked={status === 'active'}
                  onChange={(e) => setStatus(e.target.value as TaskStatus)}
                  className="text-[#4461F2] focus:ring-[#4461F2] dark:bg-gray-700"
                />
                <label htmlFor="active" className="text-[16px] text-[#1C1E21] dark:text-white">
                  Active
                </label>
              </div>
              <div className="space-x-2">
                <input
                  type="radio"
                  id="completed"
                  name="status"
                  value="completed"
                  checked={status === 'completed'}
                  onChange={(e) => setStatus(e.target.value as TaskStatus)}
                  className="text-[#4461F2] focus:ring-[#4461F2] dark:bg-gray-700"
                />
                <label htmlFor="completed" className="text-[16px] text-[#1C1E21] dark:text-white">
                  Completed
                </label>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label htmlFor="category" className="block text-[16px] font-medium text-[#1C1E21] dark:text-white mb-1.5">
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-12 px-3 text-[16px] rounded-[8px] border border-[#E5E7EB] dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white focus:border-[#4461F2] focus:ring-1 focus:ring-[#4461F2]"
                >
                  <option value="">All Categories</option>
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                  <option value="shopping">Shopping</option>
                  <option value="health">Health</option>
                  <option value="others">Others</option>
                </select>
              </div>

              <div className="flex-1">
                <label htmlFor="sortBy" className="block text-[16px] font-medium text-[#1C1E21] dark:text-white mb-1.5">
                  Sort By
                </label>
                <select
                  id="sortBy"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as keyof Task)}
                  className="w-full h-12 px-3 text-[16px] rounded-[8px] border border-[#E5E7EB] dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white focus:border-[#4461F2] focus:ring-1 focus:ring-[#4461F2]"
                >
                  <option value="dueDate">Due Date</option>
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                  <option value="status">Status</option>
                </select>
              </div>

              <div className="flex-1">
                <label htmlFor="sortDirection" className="block text-[16px] font-medium text-[#1C1E21] dark:text-white mb-1.5">
                  Sort Direction
                </label>
                <select
                  id="sortDirection"
                  value={sortDirection}
                  onChange={(e) => setSortDirection(e.target.value as 'ascending' | 'descending')}
                  className="w-full h-12 px-3 text-[16px] rounded-[8px] border border-[#E5E7EB] dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white focus:border-[#4461F2] focus:ring-1 focus:ring-[#4461F2]"
                >
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskComponent
                key={task.id}
                {...task}
                onEdit={() => handleEditTask(task)}
                onDelete={deleteTask}
                onToggleComplete={toggleTaskComplete}
              />
            ))
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-none border border-[#E5E7EB] dark:border-gray-700 p-8 text-center">
              <h2 className="text-[24px] font-semibold text-[#1C1E21] dark:text-white mb-2">No tasks found</h2>
              <p className="text-[16px] text-[#6B7280] dark:text-gray-400">
                You don't have any tasks matching your current filters.
              </p>
              <Button
                className="mt-6 bg-[#4461F2] hover:bg-[#2941dc] text-white rounded-[8px] h-12 px-6 flex items-center gap-2 mx-auto"
                onClick={() => setIsAddTaskOpen(true)}
              >
                <Plus className="w-5 h-5" />
                Create a new task
              </Button>
            </div>
          )}
        </div>

        <TaskDialog
          open={isAddTaskOpen || !!editingTask}
          onOpenChange={(open) => {
            setIsAddTaskOpen(open)
            if (!open) setEditingTask(undefined)
          }}
          task={editingTask}
        />
      </div>
    </DashboardLayout>
  )
} 