export interface Alert {
  type: AlertType;
  content: string;
}

export type AlertType = 'success' | 'danger';
