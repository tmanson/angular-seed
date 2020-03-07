import {Injectable} from '@angular/core';
import {ClientConfig, ShellConfig} from './config';
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
    this.config.clients.forEach(client => {
        const route = '#' + client.route;
        if (location.hash.startsWith(route)) {
          // Lazy load module if still not loaded
          if (!client.loaded) {
            this.load(client);
          } else {
            this.showClient(client);
          }
        } else if (client.loaded) {
          this.hideClient(client);
        }
      }
    );
  }

  showClient(client: ClientConfig) {
    this.setClientVisibility(client, this.authService.loggedIn.value);
  }

  hideClient(client: ClientConfig) {
    this.setClientVisibility(client, false);
  }

  setClientVisibility(client: ClientConfig, show: boolean) {
    const elms = document.getElementsByTagName(client.selector) as HTMLCollectionOf<HTMLElement>;

    if (elms.length === 1) {
      const elm = elms[0];
      elm.hidden = !show;
    }
  }

  load(client: ClientConfig): void {
    // Don't load bundle twice
    if (client.loaded) {
      return;
    }

    const content = document.getElementById(this.config.outletId || 'content');
    if (content) { // Add tag for micro frontend, e. g. <app-administration></app-administration>
      const element = document.createElement(client.selector);
      element.hidden = true;
      content.appendChild(element);

      // Add script-tag(s) to load bundle
      const files = typeof client.src === 'string' ? [client.src] : client.src;

      files.forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        content.appendChild(script);
      });
      client.loaded = true;
    }

  }

  preloadClients() {
    this.config.clients.forEach(client => {
      this.load(client);
    });
  }

  navigate(url: string) {
    const pos = location.hash.indexOf('?');
    const query = pos !== -1 ? location.hash.substr(pos) : '';
    location.hash = url + query;
  }


}
