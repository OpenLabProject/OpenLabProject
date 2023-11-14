import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { GuildDetailsComponent } from '../guild-details/guild-details.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,

  ]
})
const routes: Routes = [
  { path: 'guild-detail/:id', component: GuildDetailsComponent },
];
export class AppRoutingModule { }
