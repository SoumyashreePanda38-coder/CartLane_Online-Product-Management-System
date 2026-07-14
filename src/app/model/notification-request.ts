export class NotificationRequest {

  userId!: number;

  title!: string;

  message!: string;

  type!: string;

  isRead!: boolean;

  constructor(
    userId?: number,
    title?: string,
    message?: string,
    type?: string,
    isRead?: boolean
  ) {

    this.userId = userId ?? 0;
    this.title = title ?? '';
    this.message = message ?? '';
    this.type = type ?? '';
    this.isRead = isRead ?? false;

  }

}