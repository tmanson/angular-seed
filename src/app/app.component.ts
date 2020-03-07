import {Component, OnInit} from '@angular/core';
import {ShellService} from '@app/shell/shell.service';
import {ClientsItems} from '@app/shell/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Angular 9 Seed';


  constructor(
    private shellService: ShellService,
    private clientsItems: ClientsItems) {
  }

  ngOnInit() {

    this.shellService.init({
      initialRoute: '/home',
      outletId: 'content',
      preload: true,
      clients: this.clientsItems.getClientItems()
    });

  }
}
