import { JQ_TOKEN } from './jQuery.service';
import { Component, Input, ViewChild, ElementRef, Inject } from '@angular/core';

@Component({
  selector: 'simple-modal',
  template: `
  <div id="{{elementId}}" #modalContainer class="modal fade" tabIndex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">
            <span>&times;</span>
          </button>
          <h4 class="modal-title">{{title}}</h4>
        </div>
        <div class="modal-body" (click)="closeModal()">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .modal-body { height: 250px; overflow-y: scroll;}
  `]
})
export class SimpleModalComponent {
@Input() title: string;
@Input() elementId: string;
@Input() closeOnBodyClick: string; // navbar component has ref to this input element to have an option to close modal on click of the list or opposite;
@ViewChild('modalContainer',  {static: false}) containerEl: ElementRef; // the same as elementRef in modalTrigger;

constructor(@Inject(JQ_TOKEN) private $: any) {}

  closeModal() {
    if (this.closeOnBodyClick.toLocaleLowerCase() === 'true') {
      this.$(this.containerEl.nativeElement).modal('hide');
    }
  }

}
