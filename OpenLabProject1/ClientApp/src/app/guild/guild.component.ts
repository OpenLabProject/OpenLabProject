import { Component, Inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GuildService } from '../guild-service.service';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
})

export class GuildComponent {
  Name: string = "no data";
  Description: string = "no data";
  GuildMaxMembers: number = 0;

  guildForm = new FormGroup({
    MembersCount: new FormControl('', Validators.min(1)),
    GuildName: new FormControl('', Validators.required),
    GuildDescription: new FormControl('', Validators.required)
  })


  public GuildData: GuildDto[] = [];
  GuildDto = signal<[]>;
  newGuild = signal<CreateGuildDto>(undefined);
  private destroy$ = new Subject<void>();

  constructor(
    http: HttpClient,
    private router: Router,
    @Inject('BASE_URL') baseUrl: string,
    private guildService: GuildService,  ) {
    http.get<GuildDto[]>(baseUrl + 'Guild').subscribe(result => {
      this.GuildData = result;

    }, error => console.error(error));
  }
  onSubmit() {
    const membersCount = parseInt(this.guildForm.controls['MembersCount'].value);

    this.guildService.CreateGuild({
      name: this.guildForm.controls['GuildName'].value,
      guildMaxMembers: membersCount,
      description: this.guildForm.controls['GuildDescription'].value
    }).pipe(takeUntil(this.destroy$)).subscribe((newGuild) => { });
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


interface CreateGuildDto {
  name: string;
  description: string;
  guildMaxMembers: number;
}


