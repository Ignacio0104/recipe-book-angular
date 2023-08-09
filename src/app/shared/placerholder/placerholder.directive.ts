import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlacerholder]',
})
export class PlacerHolderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
