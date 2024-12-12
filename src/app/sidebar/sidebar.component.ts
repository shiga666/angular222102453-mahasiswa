import { Component, Input, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'; // Layanan untuk login/logout

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
  constructor(private cookieService: CookieService, private router: Router) {}

  logout(): void {
    // Hapus cookie 'userId' saat logout
    this.cookieService.delete('userId');
    
    // Arahkan ke halaman login setelah logout
    this.router.navigate(['/login']);
  }
  closeSidebar() {
    const body = document.querySelector('body');
    if (body) {
      body.classList.remove('sidebar-open');
      body.classList.add('sidebar-collapse');  // Menutup sidebar
    }
  }

}
