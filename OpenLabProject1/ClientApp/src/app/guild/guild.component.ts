import { Injectable } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';




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

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private userService: UserService) {
    http.get<GuildInformation[]>(baseUrl + 'Guild').subscribe(result => {
      this.GuildData = result;

    }, error => console.error(error));
  }

  async onJoinClick(guildId: number, userId: number) {
    
    await this.userService.updateGuildInformationNumber(guildId, userId, 1); 
  }
}

interface GuildInformation {
  name: string;
  id: number;
  description: string;
  guildMaxMembers: number;
  membersCount: number;
  userId?: number;
}






