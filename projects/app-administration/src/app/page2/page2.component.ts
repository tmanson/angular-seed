import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  template: `
      <div class="card">
          <div class="header">
              <h2 class="title">Advanced Flight Search</h2>
          </div>
          <div class="content">
              <div class="form-group">
                  <label>From:</label>
                  <input name="from" class="form-control">
              </div>
              <div class="form-group">
                  <label>To:</label>
                  <input name="to" class="form-control">
              </div>
              <div class="form-group">
                  <label>To:</label>
                  <input name="to" class="form-control">
              </div>
              <div class="form-group">
                  <label>To:</label>
                  <input name="to" class="form-control">
              </div>

              <div class="form-group">
                  <button class="btn btn-default">Search</button>

              </div>

          </div>

      </div>
  `
})
export class Page2Component {

  control = new FormControl();

  constructor(private router: Router) {

  }

  search() {
    this.router.navigate(['.'], {queryParamsHandling: 'merge', queryParams: {id: 17}});
    window.dispatchEvent(new CustomEvent('client-message', {detail: 17}));
  }

}
