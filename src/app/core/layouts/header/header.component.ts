import {Component, EventEmitter, Output} from '@angular/core';
import {AuthService} from '@core/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent {
  @Output() isLoggedIn = new EventEmitter<boolean>();

  constructor(
    private authService: AuthService) {
  }

  onLogout() {
    this.authService.logout();
  }
}
