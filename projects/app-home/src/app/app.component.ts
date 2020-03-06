import { Component, OnInit, } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div id="app-home">
      <div class="card">
        <div class="content">
          <a routerLink="home" queryParamsHandling="merge">Home</a>
        </div>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`#app-home { border: darkred dashed 5px; padding: 10px }`]
})
export class AppComponent implements OnInit {
  ngOnInit() {
  }
}
