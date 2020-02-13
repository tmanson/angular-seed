import {MediaMatcher} from '@angular/cdk/layout';
import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItems} from '@shared/menu-items/menu-items';
import {Observable} from 'rxjs';
import {AuthService} from '@core/auth/auth.service';

/** @title Responsive sidenav */
@Component({
  selector: 'app-layout',
  templateUrl: 'layout.component.html',
  styleUrls: []
})
export class LayoutComponent implements OnDestroy, AfterViewInit, OnInit {
  isLoggedIn: Observable<boolean>;
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    private authService: AuthService
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngAfterViewInit() {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

}
