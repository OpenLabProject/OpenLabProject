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
export class GuildDetailsComponent {

  public GuildData: GuildDto[] = [];

  constructor(private router: Router, private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { }

  //getGuildDetails(guildId: number): Observable<GuildDto> {
    //return this.http.get<GuildDto>(`${baseUrl}Guild/${guildId}`);
  //}
  //ngOnInit(): void {
    //const guildId = +this.route.snapshot.paramMap.get('guildId');
    //this.guildService.getGuildDetails(guildId).subscribe(guild => {
      //this.guild = guild;
    //});



}

interface GuildDto {

}
