import {createSiteMenuTemplate} from './site-menu-template';
import AbstractView from '../abstract';

export default class SiteMenu extends AbstractView {
  getTemplate() {
    return createSiteMenuTemplate();
  }
}
