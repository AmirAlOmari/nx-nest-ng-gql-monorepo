import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgMaterialModule } from '../ng-material/ng-material.module';
import { AuthModule } from '../auth/auth.module';

import { TasksPageComponent } from './pages/tasks-page/tasks-page.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { CreateTaskDialogComponent } from './dialogs/create-task-dialog/create-task-dialog.component';
import { RemoveTaskDialogComponent } from './dialogs/remove-task-dialog/remove-task-dialog.component';
import { UpdateTaskDialogComponent } from './dialogs/update-task-dialog/update-task-dialog.component';
import { TasksRoutingModule } from './tasks-routing.module';

@NgModule({
  declarations: [
    TasksPageComponent,
    TaskListComponent,
    CreateTaskDialogComponent,
    RemoveTaskDialogComponent,
    UpdateTaskDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    NgMaterialModule,

    TasksRoutingModule,
    AuthModule,
  ],
})
export class TasksModule {}
