import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuildService {
  public baseUrl: string;

  constructor(private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string
    ) {
    this.baseUrl = baseUrl + 'guild/';
  }

  public getGuildDetails(guildId: number): Observable<GuildDto> {
    return this.http.get<GuildDto>(this.baseUrl + guildId);
  }
}
export interface GuildDto {
  id: number;
  name: string;
  description: string;
  guildMaxMembers: number;
  membersCount: number;
}
