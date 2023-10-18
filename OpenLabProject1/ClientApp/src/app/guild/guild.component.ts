import { Component } from '@angular/core';

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.css']
})


export class GuildComponent {


  activePanelId: string = '';

  panels: Panel[] = [
    {
      id: '1',
      title: 'Panel 1',
      content: 'This is the content for Panel 1.'
    },
    {
      id: '2',
      title: 'Panel 2',
      content: 'This is the content for Panel 2.'
    },
    {
      id: '3',
      title: 'Panel 3',
      content: 'This is the content for Panel 3.'
    }
  ];

  ngOnInit(): void {
  }

  togglePanel(panelId: string): void {
    if (this.activePanelId === panelId) {
      this.activePanelId = '';
    } else {
      this.activePanelId = panelId;
    }
  }

}

interface Panel {
  id: string;
  title: string;
  content: string;
}


