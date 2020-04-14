import { Component, OnInit, } from '@angular/core';

@Component({
  selector: 'app-administration',
  template: `
    <div id="app-administration">
      <div class="card">
        <div class="content">
          <a routerLink="administration/page1">Flight Search 2</a> | <a routerLink="administration/page2" >Advanced</a> | <a routerLink="administration/page3" >Advanced</a>
        </div>
      </div>
        <router-outlet></router-outlet>
    </div>
  `,
  styles: [`#app-administration { border: darkred dashed 5px; padding: 10px }`]
})
export class AppComponent implements OnInit {
  ngOnInit() {
  }
}
