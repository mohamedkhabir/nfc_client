import {Directive, ElementRef, Input} from '@angular/core';
enum FlexLayout {
  'row' = 'row',
  'column' = 'column'
}
enum FlexLayoutAlign {
  'flex-start' = 'flex-start',
  'center' = 'center',
  'flex-end' = 'flex-end',
  'space-between' = 'space-between',
  'space-around' = 'space-around',
  'space-evenly' = 'space-evenly',
}
@Directive({
  selector: '[flex]'
})
export class FlexLayoutDirective {
  @Input() set fxLayout(value:string) {
    this.el.nativeElement.style.flexDirection = value;
  };
  @Input() set fxLayoutGap(value:string) {
    this.el.nativeElement.style.gap = value;
  };
  @Input() set fxFlex(value:number) {
    this.el.nativeElement.style.width = value.toString()+'%';
  };
  @Input() set fxLayoutAlign (value:string){
    let align  = value.split(' ')
    align[0]?this.el.nativeElement.style.justifyContent = align[0]:'';
    align[1]?this.el.nativeElement.style.alignItems = align[1]:'';
  }
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.display = 'flex';
  }

}
