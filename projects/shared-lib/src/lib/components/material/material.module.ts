import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    CommonModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    CommonModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  declarations: []
})
export class MaterialModule {
}
