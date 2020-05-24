import { Task as TaskDAType } from '@linkedout/data-access';

export interface Task extends Omit<TaskDAType, '__typename'> {}
