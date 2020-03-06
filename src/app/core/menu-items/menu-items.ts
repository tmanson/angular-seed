import {Injectable} from '@angular/core';

export interface Menu {
  group: string;
  route: string;
  name: string;
  type: string;
  icon: string;
  src: string;
  selector:string;
  loaded: boolean;
}

const MENUITEMS = [
  {group: 'home', type: 'link', name: 'Accueil', icon: 'home', route: 'home', selector: 'app-home', src: 'assets/micro-frontends/app-home/main.js', loaded: false},
  {group: 'admin', type: 'link', name: 'Administration', icon: 'settings', route: 'administration', selector: 'app-administration', src: 'assets/micro-frontends/app-administration/main.js', loaded: false}
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
