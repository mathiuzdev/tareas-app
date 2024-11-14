export interface Tag {
    id: string;
    name: string;
    color: string;
  }
  
  export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'in progress' | 'completed';
    dueDate: string;
    tags?: Tag[];
  }

  export interface TaskTag {
    taskId: number;
    tagId: number;
  }
  
  export type TaskStatus = Task['status'] | 'All';
  
  export interface TaskFilters {
    status?: string;
    tags?: Tag[]; 
  }