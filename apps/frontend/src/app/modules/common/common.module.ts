import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';

import { NgMaterialModule } from '../ng-material/ng-material.module';

import { ThemePickerComponent } from './components/theme-picker/theme-picker.component';

@NgModule({
  declarations: [ThemePickerComponent],
  imports: [NgMaterialModule, NgCommonModule],
  exports: [NgCommonModule, NgMaterialModule, ThemePickerComponent],
})
export class CommonModule {}
