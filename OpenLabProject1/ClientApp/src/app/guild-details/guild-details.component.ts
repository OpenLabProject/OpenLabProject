import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GuildService, GuildDetailDto } from '../guild-service.service';
import { getBaseUrl } from '../../main';


@Component({
  selector: 'app-guild-details',
  templateUrl: './guild-details.component.html',
  styleUrls: ['./guild-details.component.css']
})
export class GuildDetailsComponent implements OnInit {

  GuildIdFromRoute: number = 0;

  hasGuild: boolean = false;

  guild: GuildDetailDto;
  guildDetail = signal<GuildDetailDto>(undefined);
  hasguild = signal<boolean>(true);

  constructor(
    private route: ActivatedRoute,
    private guildService: GuildService,
    private router: Router,
    http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
  ) {
  }
  ngOnInit() {
    const RouteParams = this.route.snapshot.paramMap;
    this.GuildIdFromRoute = Number(RouteParams.get('Id'));
    console.log(RouteParams)
    this.guildService.getInfoAboutCertainGuild(this.GuildIdFromRoute).subscribe(guild => {
      this.guildDetail.set(guild);

      //this.guildService.getUsersInCertainGuild(this.GuildIdFromRoute).subscribe(UserDetails => this.guildDetail.set(UserDetails));
    });

    this.guildService.isInCertainGuild(this.GuildIdFromRoute).subscribe(guild =>
      this.hasguild.set(guild));


  }
  OnJoin() {
    this.guildService.joinGuild(this.GuildIdFromRoute).subscribe(guildDetailJoin => this.guildDetail.set(guildDetailJoin));
    this.hasguild.set(true);

  }

  OnLeave() {
    this.guildService.leaveGuild().subscribe(guildDetailLeave => this.guildDetail.set(guildDetailLeave));
    this.hasguild.set(false);
  }
  OnDelete() {
    this.guildService.DeleteGuild(this.GuildIdFromRoute).pipe().subscribe((response) => this.router.navigateByUrl('guild'));
  }
    
  
}

