import { EventEmitter } from '@angular/core';

const MESSAGE_DURATION = 4000;
export const INFO = 'info';
export const WARNING = 'warning';
export const ERROR = 'error';

export class MessageService {
  showMessage = new EventEmitter();

  show(message: string, mode: string = INFO) {

    this.showMessage.emit({
      message,
      mode,
      show: true,
    });

    setTimeout(() => {
      this.showMessage.emit({
        show: false,
      });
    }, MESSAGE_DURATION);
  }
}
