import {
  HostBinding,
  Component,
  Input,
  Output,
  EventEmitter } from '@angular/core';
import { MessageService } from '../message-service/message.service';

@Component({
  templateUrl: './message-widget.component.html',
  selector: 'app-messages',
  styleUrls: ['./message-widget.component.scss'],
})
export class MessageWidgetComponent {
  @HostBinding('style.display') display = 'none';

  message = 'this is a test';

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.showMessage.subscribe(data => {
      this.display = data.show ? 'block' : 'none';

      this.message = data.message;
    });
  }
}
