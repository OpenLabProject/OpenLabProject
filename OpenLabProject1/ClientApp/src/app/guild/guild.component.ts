import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.css']
})


export class GuildComponent {

  Name: string = "no data";
  Description: string = "no data";
  GuildMaxMembers: number = 0;
  MembersCount: number = 0;

  public GuildData: GuildInformation[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<GuildInformation[]>(baseUrl + 'Guild').subscribe(result => {
      this.GuildData = result;

    }, error => console.error(error));




  }
}

interface GuildInformation {
  Name: string;
  Id: number;
  Description: string;
  GuildMaxMembers: number;
  MembersCount: number;
  
}






