import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner';
import { PlacerHolderDirective } from './placerholder/placerholder.directive';
import { DropDownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlacerHolderDirective,
    DropDownDirective,
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlacerHolderDirective,
    DropDownDirective,
    CommonModule,
  ],
})
export class SharedModule {}
