import {Injectable} from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  {state: 'home', name: 'Accueil', type: 'link', icon: 'home'},
  {state: 'admin', type: 'link', name: 'Administration', icon: 'settings'}
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
