export interface Alert {
  type: AlertType;
  message: string;
  duration?: number;
  autoClose?: boolean;
  confirmButtonText: string;
  closeButtonText: string;
}

export enum AlertType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}
