import { OnInit } from '@angular/core';
import {
  HostBinding,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  templateUrl: './message-widget.component.html',
  selector: 'app-messages',
  styleUrls: ['./message-widget.component.scss'],
})
export class MessageWidgetComponent implements OnInit {
  @HostBinding('style.display') display = 'none';

  @HostBinding('style.backgroundColor') backgroundColor = '#98FB98';
  @HostBinding('style.boxShadow') boxShadow = '0 0 2px 3px blue';

  // box-shadow: 0 0 2px 3px #98FB98;
  message = 'this is a test';

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.showMessage.subscribe((data) => {
      this.display = data.show ? 'block' : 'none';
      this.backgroundColor = this.getBackgroundColor(data.mode);
      this.boxShadow = ` 0 2px 3px ${this.backgroundColor}`;
      this.message = data.message;
    });
  }

  getBackgroundColor(mode: any) {
    switch (mode) {
      case 'warning':
        return 'orange';
      case 'error':
        return 'red';
      default:
        return '#98FB98';
    }
  }
}
