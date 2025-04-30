import api from './api'

export interface Category {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  active_status: boolean
  del_status: boolean
  userId: string
}

export interface Priority {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  code: string
  active_status: boolean
  del_status: boolean
}

export interface Todo {
  id: string
  createdAt: string
  updatedAt: string
  title: string
  description: string
  dueDate: string
  priorityId: string
  categoryId: string
  userId: string
  status: string
  active_status: boolean
  del_status: boolean
  category?: Category
  priority?: Priority
}

export interface TodosResponse {
  response_code: string
  response_desc: string
  success: boolean
  data: Todo[]
}

export interface TodoResponse {
  response_code: string
  response_desc: string
  success: boolean
  data: Todo
}

export interface AddTodoRequest {
  title: string
  description: string
  dueDate: string
  priorityId: string
  categoryId: string
}

export interface EditTodoRequest {
  title?: string
  description?: string
  dueDate?: string
  priorityId?: string
  categoryId?: string
}

export interface CategoriesResponse {
  response_code: string
  response_desc: string
  success: boolean
  data: Category[]
}

export interface PrioritiesResponse {
  response_code: string
  response_desc: string
  success: boolean
  data: Priority[]
}

const todosService = {
  getTodos: async (): Promise<TodosResponse> => {
    const response = await api.get<TodosResponse>('/todos')
    return response as unknown as TodosResponse
  },
  addTodo: async (data: AddTodoRequest): Promise<TodoResponse> => {
    const response = await api.post<TodoResponse>('/todos', data)
    return response as unknown as TodoResponse
  },
  getTodo: async (id: string): Promise<TodoResponse> => {
    const response = await api.get<TodoResponse>(`/todos/${id}`)
    return response as unknown as TodoResponse
  },
  editTodo: async (id: string, data: EditTodoRequest): Promise<TodoResponse> => {
    const response = await api.patch<TodoResponse>(`/todos/${id}`, data)
    return response as unknown as TodoResponse
  },
  deleteTodo: async (id: string): Promise<{ response_code: string; response_desc: string; success: boolean; data: null }> => {
    const response = await api.delete(`/todos/${id}`)
    return response as unknown as { response_code: string; response_desc: string; success: boolean; data: null }
  },
  toggleTodoStatus: async (id: string): Promise<TodoResponse> => {
    const response = await api.patch<TodoResponse>(`/todos/${id}/toggle`)
    return response as unknown as TodoResponse
  },
  getCategories: async (): Promise<CategoriesResponse> => {
    const response = await api.get<CategoriesResponse>('/categories')
    return response as unknown as CategoriesResponse
  },
  getPriorities: async (): Promise<PrioritiesResponse> => {
    const response = await api.get<PrioritiesResponse>('/priorities')
    return response as unknown as PrioritiesResponse
  },
}

export default todosService 