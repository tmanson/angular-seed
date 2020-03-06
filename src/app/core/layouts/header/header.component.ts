import {Component, EventEmitter, Output} from '@angular/core';
import {AuthService} from '../../../../../projects/shared-lib/src/lib/services/auth/auth.service';

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
