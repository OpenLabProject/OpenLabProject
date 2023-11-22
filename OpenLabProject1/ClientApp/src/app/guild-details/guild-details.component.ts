import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GuildService } from '../guild-service.service';


@Component({
  selector: 'app-guild-details',
  templateUrl: './guild-details.component.html',
  styleUrls: ['./guild-details.component.css']
})
export class GuildDetailsComponent implements OnInit {

  GuildIdFromRoute: number = 0;

  guild: GuildDto | undefined;

  constructor(
    private route: ActivatedRoute,
    private guildService: GuildService,
    http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
  ) {
    this.guild = {} as GuildDto;
  }
  ngOnInit(): void {
    const RouteParams = this.route.snapshot.paramMap;
    this.GuildIdFromRoute = Number(RouteParams.get('Id'));
    console.log(RouteParams)
    this.guildService.getInfoAboutCertainGuild(this.GuildIdFromRoute).subscribe(guild => {
      this.guild = guild;
    });
  }
  OnJoin() {
    this.guildService.joinGuild(this.GuildIdFromRoute).subscribe();
    location.reload();
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
