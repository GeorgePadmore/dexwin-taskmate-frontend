import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Edit2, Trash2 } from 'lucide-react'

interface TaskProps {
  id: string
  title: string
  description: string
  dueDate: string
  category: string
  priority: 'low' | 'medium' | 'high'
  completed: boolean
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onToggleComplete: (id: string, completed: boolean) => void
}

export function Task({
  id,
  title,
  description,
  dueDate,
  category,
  priority,
  completed,
  onEdit,
  onDelete,
  onToggleComplete,
}: TaskProps) {
  const [isChecked, setIsChecked] = useState(completed)

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked)
    onToggleComplete(id, checked)
  }

  const priorityColors = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-[12px] shadow-sm border border-[#E5E7EB] dark:border-gray-700 p-4 transition-all duration-200 hover:shadow-md">
      <div className="flex items-start gap-3">
        <Checkbox
          checked={isChecked}
          onCheckedChange={handleCheckboxChange}
          className="mt-1"
        />
        
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className={`text-[16px] font-medium ${completed ? 'text-[#9CA3AF] dark:text-gray-500 line-through' : 'text-[#1C1E21] dark:text-white'}`}>
                {title}
              </h3>
              <p className={`text-[14px] mt-1 ${completed ? 'text-[#9CA3AF] dark:text-gray-500' : 'text-[#6B7280] dark:text-gray-400'}`}>
                {description}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(id)}
                className="h-8 w-8 text-[#6B7280] dark:text-gray-400 hover:text-[#4461F2] dark:hover:text-[#4461F2] hover:bg-[#EEF2FF] dark:hover:bg-gray-700"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(id)}
                className="h-8 w-8 text-[#6B7280] dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-3">
            <span className={`text-[12px] px-2 py-1 rounded-full ${priorityColors[priority]}`}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </span>
            <span className="text-[12px] px-2 py-1 rounded-full bg-[#F3F4F6] dark:bg-gray-700 text-[#4B5563] dark:text-gray-300">
              {category}
            </span>
            <span className="text-[12px] text-[#6B7280] dark:text-gray-400">
              Due {new Date(dueDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
} 