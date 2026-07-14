export class NotificationResponse {

  notificationId!: number;

  userId!: number;

  title!: string;

  message!: string;

  type!: string;

  
    referenceId!: number;

  isRead!: boolean;

  createdAt!: string;

  updatedAt!: string;

  constructor(
    notificationId?: number,
    userId?: number,
    title?: string,
    message?: string,
    type?: string,
    referenceId?: number,
    isRead?: boolean,
    createdAt?: string,
    updatedAt?: string
  ) {

    this.notificationId = notificationId ?? 0;
    this.userId = userId ?? 0;
    this.title = title ?? '';
    this.message = message ?? '';
    this.type = type ?? '';
    this.referenceId = referenceId ?? 0;
    this.isRead = isRead ?? false;
    this.createdAt = createdAt ?? '';
    this.updatedAt = updatedAt ?? '';

  }

}