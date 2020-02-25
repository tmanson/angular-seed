import { Component, OnInit, } from '@angular/core';

@Component({
  selector: 'app-administration',
  template: `
    <div id="app-administration">
      <div class="card">
        <div class="content">
          <a routerLink="app-administration/page1" queryParamsHandling="merge">Flight Search</a> | <a routerLink="app-administration/page2" queryParamsHandling="merge">Advanced</a>
        </div>
      </div>
    </div>
  `,
  styles: [`#app-administration { border: darkred dashed 5px; padding: 10px }`]
})
export class AppComponent implements OnInit {
  ngOnInit() {
  }
}
