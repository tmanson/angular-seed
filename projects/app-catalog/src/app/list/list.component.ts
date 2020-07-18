import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {HttpService} from '../../../../shared-lib/src/lib/services/http/http.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'code', 'shortLabel', 'longLabel'];
  materialDatabase: MaterialDatabase | null;
  data: Material[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  dataSource = new MatTableDataSource<Material>(this.data);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _httpClient: HttpService) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.materialDatabase = new MaterialDatabase(this._httpClient);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.materialDatabase.getMaterials(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data['hydra:totalItems'];
          return data['hydra:member'];
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }
}

export interface APIPlatformPagedCollection<T> {
  'hydra:totalItems'?: number;
  'hydra:member'?: T[];
  '@context'?: string;
  '@id'?: string;
  '@type'?: string;
  'hydra:view'?: {
    '@id'?: string;
    '@type'?: string;
    'hydra:first'?: string;
    'hydra:last'?: string;
    'hydra:previous'?: string;
    'hydra:next'?: string;
  };
}

export interface APIPlatformCollection<T> {
  'hydra:totalItems'?: number;
  'hydra:member'?: T[];
  '@context'?: string;
  '@id'?: string;
  '@type'?: string;
}

export interface Materials  extends APIPlatformPagedCollection<Material>{}

export interface Material {
  '@id'?: string;
  '@type'?: string;
  id: number;
  'code': string;
  'shortLabel': string;
  'longLabel': string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class MaterialDatabase {
  constructor(private _httpClient: HttpService) {
  }

  getMaterials(sort: string, order: string, page: number, pageSize: number): Observable<Materials> {
    const href = 'https://127.0.0.1:8000/api/materials';
    const requestUrl = `${href}?sort=${sort}&order=${order}&page=${page + 1}&itemsPerPage=${pageSize}`;
    return this._httpClient.get<Materials>(requestUrl);
  }
}
