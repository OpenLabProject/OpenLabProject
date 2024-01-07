import { Injectable } from '@angular/core';
import { Component, Inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { GuildService } from '../guild-service.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


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
    MembersCount: new FormControl(''),
    GuildName: new FormControl(''),
    GuildDescription: new FormControl('')
  })


  public GuildData: GuildDto[] = [];
  GuildDto = signal<[]>;

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
    if (this.guildForm.valid) {
      this.guildService
    }
    console.warn(this.guildForm.value);
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






