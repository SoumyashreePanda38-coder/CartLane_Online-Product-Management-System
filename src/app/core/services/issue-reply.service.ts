import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssueReplyService {

  private apiUrl = 'http://localhost:8080/api/issue-replies';

  constructor(private http: HttpClient) { }

  /**
   * Create a new reply
   */
  createReply(reply: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, reply);
  }

  /**
   * Get all replies
   */
  getAllReplies(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /**
   * Get reply by Reply ID
   */
  getReplyById(replyId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${replyId}`);
  }

  /**
   * Get all replies for a specific issue
   */
  getRepliesByIssue(issueId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/issue/${issueId}`);
  }

  /**
   * Update a reply
   */
  updateReply(replyId: number, reply: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${replyId}`, reply);
  }

  /**
   * Delete a reply
   */
  deleteReply(replyId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${replyId}`);
  }

  /**
   * Search replies
   */
  searchReplies(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/search?keyword=${keyword}`
    );
  }

}