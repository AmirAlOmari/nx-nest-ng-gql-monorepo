import { User as UserDAType } from '@linkedout/data-access';

export interface User extends Omit<UserDAType, '__typename'> {}
