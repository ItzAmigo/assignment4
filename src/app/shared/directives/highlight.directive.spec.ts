// highlight.directive.ts
import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  @Input('appHighlight') highlightColor: string = '#e6f3ff';
  private originalBackground: string = '';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.originalBackground = this.el.nativeElement.style.backgroundColor;
    this.renderer.setStyle(
      this.el.nativeElement,
      'backgroundColor',
      this.highlightColor
    );
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'backgroundColor',
      this.originalBackground || 'transparent'
    );
  }
}
