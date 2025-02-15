import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    HighlightDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    LoadingSpinnerComponent,
    HighlightDirective
  ]
})
export class SharedModule { }
