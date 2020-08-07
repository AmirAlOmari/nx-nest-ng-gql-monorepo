import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksPageComponent } from './pages/tasks-page/tasks-page.component';

export const routes: Routes = [
  {
    path: '',
    component: TasksPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
