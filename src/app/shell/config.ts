import {Injectable} from '@angular/core';

export interface ClientConfig {
  group: string;
  route: string;
  name: string;
  type: string;
  icon: string;
  src: string | string[];
  selector:string;
  loaded: boolean;
}


const CLIENT_ITEMS = [
  {group: 'home', type: 'link', name: 'Accueil', icon: 'home', route: '/home', selector: 'app-home', src: 'assets/micro-frontends/app-home/main.js', loaded: false},
  {group: 'admin', type: 'link', name: 'Administration', icon: 'settings', route: '/administration', selector: 'app-administration', src: 'assets/micro-frontends/app-administration/main.js', loaded: false},
  {group: 'catalog', type: 'link', name: 'Catalogue', icon: 'settings', route: '/catalog', selector: 'app-catalog', src: 'assets/micro-frontends/app-catalog/main.js', loaded: false}
];

export interface ShellConfig {
    outletId?: string;
    initialRoute: string;
    preload: boolean;
    clients: ClientConfig[];
}


@Injectable()
export class ClientsItems {
  getClientItems(): ClientConfig[] {
    return CLIENT_ITEMS;
  }
}
