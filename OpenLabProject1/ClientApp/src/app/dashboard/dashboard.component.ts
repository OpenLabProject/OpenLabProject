import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GuildService } from '../guild-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  guild: string = "no data";
  xp: number = 0;
  requiredXp: number = 100;
  progress: number = 0;

  hasGuild: boolean = false;

  public UserData: UserDto;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private guildService: GuildService,) {
    http.get<UserDto>(baseUrl + 'UserProperties').subscribe(result => {
      this.UserData = result;
      this.xp = result.xp;
      this.guild = result.guild;
      this.progress = Math.floor(this.xp / this.requiredXp * 100);
      

    }, error => console.error(error));

    

   


  }
  OnLeave() {
    this.guildService.leaveGuild();
    location.reload();
  }
}

interface UserDto {
  xp: number;
  guild: string;
}
