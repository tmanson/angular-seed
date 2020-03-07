import {Injectable} from '@angular/core';
import {ShellConfig} from './config';
import {AuthService} from '../../../projects/shared-lib/src/lib/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShellService {

  private config: ShellConfig;

  constructor(
    private authService: AuthService
  ) {
  }

  init(config: ShellConfig) {

    window.removeEventListener('hashchange', () => this.urlChanged());
    this.config = config;
    if (config.preload) {
      this.preloadClients();
    }
    if (!location.hash && config.initialRoute) {
      location.hash = config.initialRoute;
    }
    window.addEventListener('hashchange', () => this.urlChanged());
    setTimeout(() => this.urlChanged(), 0);
  }

  urlChanged() {
    for (const client in this.config.clients) {
      const entry = this.config.clients[client];
      const route = '#' + entry.route;

      if (location.hash.startsWith(route)) {
        // Lazy load module if still not loaded
        if (!entry.loaded) {
          this.load(client);
        } else {
          this.showClient(client);
        }
      } else if (entry.loaded) {
        this.hideClient(client);
      }
    }
  }

  showClient(clientName: string) {
    this.setClientVisibility(clientName, this.authService.loggedIn.value);
  }

  hideClient(clientName: string) {
    this.setClientVisibility(clientName, false);
  }

  setClientVisibility(clientName: string, show: boolean) {
    const entry = this.config.clients[clientName];

    if (!entry) {
      throw new Error(`Client ${clientName} is not configured.`);
    }

    const elms = document.getElementsByTagName(entry.element) as HTMLCollectionOf<HTMLElement>;

    if (elms.length === 1) {
      const elm = elms[0];
      elm.hidden = !show;
    }

  }

  load(name: string): void {

    const configItem = this.config.clients[name];

    // Don't load bundle twice
    if (configItem.loaded) {
      return;
    }

    const content = document.getElementById(this.config.outletId || 'content');
    if (content) { // Add tag for micro frontend, e. g. <app-administration></app-administration>
      const element = document.createElement(configItem.element);
      element.hidden = true;
      content.appendChild(element);

      // Add script-tag(s) to load bundle
      const files = typeof configItem.src === 'string' ? [configItem.src] : configItem.src;

      files.forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        content.appendChild(script);
      });
      configItem.loaded = true;
    }

  }

  preloadClients() {
    for (const client in this.config.clients) {
      this.load(client);
    }
  }

  navigate(url: string) {
    const pos = location.hash.indexOf('?');
    const query = pos !== -1 ? location.hash.substr(pos) : '';
    location.hash = url + query;
  }


}
