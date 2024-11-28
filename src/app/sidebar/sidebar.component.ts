import { Component, Input, ViewChild, ElementRef} from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ RouterModule ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @ViewChild('sidebar') sidebar!: ElementRef;
  @Input() moduleName: String = "";
  closeSidebar() {
    const body = document.querySelector('body');
    if (body) {
      body.classList.remove('sidebar-open');
      body.classList.add('sidebar-collapse');  // Menutup sidebar
    }
  }
}
