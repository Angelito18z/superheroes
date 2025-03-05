import { Component } from '@angular/core';
import { url } from 'inspector';

@Component({
  selector: 'app-layout-page',
  standalone: false,
  
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {
  public sidebarItems = [
     { label: 'Listado', icon: 'label', url: '/heroes/list' },
     { label: 'Añadir', icon: 'add', url: '/heroes/new-hero' },
     { label: 'Buscar', icon: 'search', url: '/heroes/search' },
  ]

}
