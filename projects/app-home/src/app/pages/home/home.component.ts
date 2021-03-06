import { Component, OnInit } from '@angular/core';
import {LanguageService} from '../../../../../shared-lib/src/lib/services/language/services/language.service';
import {StorageService} from '../../../../../shared-lib/src/lib/services/storage/storage.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(private language: LanguageService,
              private storage: StorageService) { }

  ngOnInit() {
  }

  setLanguage(lang: string) {
    this.language.change(lang);
    this.storage.setKey('lang', lang);
  }

}
