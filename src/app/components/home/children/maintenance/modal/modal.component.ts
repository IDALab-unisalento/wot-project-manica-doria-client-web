import { Step } from './../../../../../models/step';
import { Attachment } from './../../../../../models/attachment';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() attachmentList: Attachment[];
  @Input() stepSelected: Step;

  constructor() { }

  ngOnInit(): void {
  }

}
