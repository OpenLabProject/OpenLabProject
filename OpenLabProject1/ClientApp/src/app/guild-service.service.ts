import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuildService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getInfoAboutCertainGuild(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);

    return this.http.get<GuildDto>(this.baseUrl + 'Guild/getGuildById', { params: queryParams })
  }

  joinGuild(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);

    return this.http.put<any>(this.baseUrl + 'userproperties/joinGuild', null, { params: queryParams })
  }
  leaveGuild() {
    this.http.put<any>(this.baseUrl + 'userproperties/leaveGuild', {}).subscribe()
  }

}

interface GuildDto {
  id: number;
  name: string;
  description: string;
  membersCount: number;
  guildMaxMembers: number;
  currentMembersCount: number;
}
