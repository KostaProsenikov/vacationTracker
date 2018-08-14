import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appHighlight]'
})
export class HighLightDirective {
    constructor(private el: ElementRef) {
        this.el.nativeElement.style.backgroundColor =
        'yellow';
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.highlight('yellow');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.highlight('green');
    }

    private highlight(color: string) {
        this.el.nativeElement.style.backgroundColor =
        color;
    }
}
