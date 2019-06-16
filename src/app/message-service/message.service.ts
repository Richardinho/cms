const MESSAGE_DURATION = 4000;

export class MessageService {
  public message: string;
  public showMessage: boolean = false;

  show(message: string) {
    this.message = message;
    this.showMessage = true;

    setTimeout(() => {
      this.showMessage = false;
    }, MESSAGE_DURATION);
  }
}
