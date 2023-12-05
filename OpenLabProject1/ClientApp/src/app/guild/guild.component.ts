import { Injectable } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GuildService } from '../guild-service.service';




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



  public GuildData: GuildDto[] = [];

  constructor(
    http: HttpClient,
    private router: Router,
    @Inject('BASE_URL') baseUrl: string,
    private guildService: GuildService,  ) {
    http.get<GuildDto[]>(baseUrl + 'Guild').subscribe(result => {
      this.GuildData = result;

    }, error => console.error(error));
  }
  

}

interface GuildDto {
  name: string;
  id: number;
  description: string;
  guildMaxMembers: number;
  membersCount: number;
  userId?: number;
}






