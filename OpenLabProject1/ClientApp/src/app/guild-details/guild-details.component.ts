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

  guild: GuildDto | undefined;

  constructor(
    private route: ActivatedRoute,
    private guildService: GuildService,
    http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
  ) {
    this.guild = {} as GuildDto; // Initialize GuildDto with empty properties
  }
  ngOnInit(): void {
    const guildId = +this.route.snapshot.paramMap.get('guildId');
    this.guildService.getGuildDetails(guildId).subscribe(guild => {
      this.guild = guild;
    });
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
