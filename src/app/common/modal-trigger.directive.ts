import { Directive, Inject, OnInit, ElementRef, Input} from '@angular/core';
import { JQ_TOKEN } from './jQuery.service';

@Directive({
  selector: '[modal-trigger]'
})
export class ModalTriggerDirective implements OnInit {
  private el: HTMLElement;
  @Input('modal-trigger') modalId: string;

  constructor(ref: ElementRef, @Inject(JQ_TOKEN) private $: any) {
    this.el = ref.nativeElement;
  }

  ngOnInit() {
    // adding event Listener for the modal (JQuery)
    this.el.addEventListener('click', e => {
      // dynamic ID
    this.$(`#${this.modalId}`).modal({});
  });
  }

  // elementRef used to bring the element from HTML which is button in nav.component.html and
  // on click of that we need to listen that event from that particular button and trigger the modal that is jQuery;

}
