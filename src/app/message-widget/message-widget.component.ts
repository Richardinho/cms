import { Component } from '@angular/core';
import { MessageService } from '../message-service/message.service';

@Component({
  templateUrl: './message-widget.component.html',
  selector: 'message-widget',
  styleUrls: ['./message-widget.component.scss'],
})
export class MessageWidgetComponent {

  constructor(private messageService: MessageService) {}

  getMessage() {
    return this.messageService.message;
  }

  showMessage() {
    return this.messageService.showMessage;
  }
}
