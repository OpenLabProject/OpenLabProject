import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  updateNumber(userId: number, number: number) {
    return this.http.put<void>('users' + userId, { number });
  }

  updateGuildDtoNumber(guildId: number, userId: number, number: number) {
    return this.http.put<void>('guilds' + guildId + '/join', { userId, number });
  }
}
