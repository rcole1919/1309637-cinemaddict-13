import {createSiteMenuTemplate} from './site-menu-template.js';
import AbstractView from './abstract.js';

export default class SiteMenu extends AbstractView {
  getTemplate() {
    return createSiteMenuTemplate();
  }
}
