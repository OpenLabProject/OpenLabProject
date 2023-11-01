import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.css']
})


export class GuildComponent {

  Name: string = "no data";
  GuildMaxMembers: number = 0;
  MembersCount: number = 0;

  public GuildData: GuildDto;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<GuildDto>(baseUrl + 'Guild').subscribe(result => {
      this.GuildData = result;
      this.Name = result.Name;
      this.GuildMaxMembers = result.GuildMaxMembers;
      this.MembersCount = result.MembersCount;

    }, error => console.error(error));




  }
}

interface GuildDto {
  Name: string;
  GuildMaxMembers: number;
  MembersCount: number;
  
}






