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

    return this.http.get<GuildDetailDto>(this.baseUrl + 'Guild/getGuildById', { params: queryParams })
  }
  joinGuild(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);

    return this.http.put<GuildDetailDto>(this.baseUrl + 'userproperties/joinGuild', null, { params: queryParams })
  }
  leaveGuild() {
    return this.http.put<GuildDetailDto>(this.baseUrl + 'userproperties/leaveGuild', {})
  }

  isInCertainGuild(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);

    return this.http.get<boolean>(this.baseUrl + 'userproperties/hasThisGuild', { params: queryParams })
  }
  IsInGuild() {
    return this.http.get<boolean>(this.baseUrl + 'IsInGuild')
  }

  CreateGuild(Data: CreateGuildDto) {
    return this.http.post<CreateGuildDto>(this.baseUrl + 'Guild/CreateGuild', Data);
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

export interface GuildDetailDto {
  id: number;
  name: string;
  description: string;
  membersCount: number;
  guildMaxMembers: number;
  currentMembersCount: number;
  usersInGuild: UserDto[];
}
interface UserDto {
  xp: number;
  userName: string;
  email: string;
  guild: string;
}

interface CreateGuildDto {
  name: string;
  description: string; 
  guildMaxMembers: number;
}

