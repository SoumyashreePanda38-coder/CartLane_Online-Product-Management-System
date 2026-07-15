import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { NotificationResponse } from 'src/app/model/notification-response';
import { NotificationRequest } from 'src/app/model/notification-request';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = 'https://cartlane-backend-production-170d.up.railway.app/api/notifications';

  constructor(private http: HttpClient) { }

  /**
   * Create Notification
   */
  createNotification(
    request: NotificationRequest
  ): Observable<NotificationResponse> {

    return this.http.post<NotificationResponse>(
      this.apiUrl,
      request
    );

  }

  /**
   * Get All Notifications
   */
  getAllNotifications(): Observable<NotificationResponse[]> {

    return this.http.get<NotificationResponse[]>(this.apiUrl);

  }

  /**
   * Get Notification By ID
   */
  getNotificationById(
    notificationId: number
  ): Observable<NotificationResponse> {

    return this.http.get<NotificationResponse>(
      `${this.apiUrl}/${notificationId}`
    );

  }

  /**
   * Get Notifications By User
   */
  getNotificationsByUser(
    userId: number
  ): Observable<NotificationResponse[]> {

    return this.http.get<NotificationResponse[]>(
      `${this.apiUrl}/user/${userId}`
    );

  }

  /**
   * Get Notifications By Type
   */
  getNotificationsByType(
    type: string
  ): Observable<NotificationResponse[]> {

    return this.http.get<NotificationResponse[]>(
      `${this.apiUrl}/type/${type}`
    );

  }

  /**
   * Get Notifications By Read Status
   */
  getNotificationsByReadStatus(
    isRead: boolean
  ): Observable<NotificationResponse[]> {

    return this.http.get<NotificationResponse[]>(
      `${this.apiUrl}/status/${isRead}`
    );

  }

  /**
   * Update Notification
   */
  updateNotification(
    notificationId: number,
    request: NotificationRequest
  ): Observable<NotificationResponse> {

    return this.http.put<NotificationResponse>(
      `${this.apiUrl}/${notificationId}`,
      request
    );

  }

  /**
   * Mark Notification As Read
   */
  markAsRead(
    notificationId: number
  ): Observable<NotificationResponse> {

    return this.http.put<NotificationResponse>(
      `${this.apiUrl}/${notificationId}/read`,
      {}
    );

  }

  /**
   * Delete Notification
   */
  deleteNotification(
    notificationId: number
  ): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${notificationId}`
    );

  }

}