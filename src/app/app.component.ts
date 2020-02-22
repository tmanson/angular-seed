import {Component, OnInit} from '@angular/core';
import {ShellService} from '@app/shell/shell.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Angular 9 Seed';


  constructor(private shellService: ShellService) {
  }

  ngOnInit() {

    this.shellService.init({
      initialRoute: '/home',
      outletId: 'content',
      preload: true,
      clients: {
        'app-administration': {
          loaded: false,
          src: 'assets/micro-frontends/app-administration/main.js',
          element: 'app-administration',
          route: '/app-administration'
        },
        /*app-administration: {
          loaded: false,
          src: 'assets/micro-frontends/app-administration/main.js',
          element: 'app-administration',
          route: '/app-administration'
        },
        catalogue: {
          loaded: false,
          src: 'assets/micro-frontends/catalogue/main.js',
          element: 'catalogue',
          route: '/catalogue'
        }*/
      }});

  }
}
