import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://jsonplaceholder.typicode.com';
  private previousUserId: number | undefined;

  constructor(private http: HttpClient) {}

  getUser(): Observable<{ id: number, name: string; email: string }> {
    let randomId: number;

    // Generate a random ID different from the previous one
    do {
      randomId = Math.floor(Math.random() * 10) + 1;
    } while (randomId === this.previousUserId); // Ensure the new ID is different

    // Store the newly generated user ID for future comparison
    this.previousUserId = randomId;

    return this.http.get<{ id: number, name: string; email: string }>(`${this.apiUrl}/users/${randomId}`);
  }

  addUser(user: { name: string; email: string }): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(`${this.apiUrl}/users`, user);
  }

  updateUser(userId: number, user: { name: string; email: string }): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/users/${userId}`, user);
  }

  getUserTodos(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/todos?userId=${userId}`);
  }
}
