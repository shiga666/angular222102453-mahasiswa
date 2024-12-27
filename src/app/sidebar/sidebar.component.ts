import { Component, Input, ViewChild, ElementRef, OnInit} from '@angular/core';
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
export class SidebarComponent implements OnInit{
  @ViewChild('sidebar') sidebar!: ElementRef;
  @Input() moduleName: String = "";
  username: string = "";
  constructor(private cookieService: CookieService, private router: Router) {}
  ngOnInit(): void {
    this.username = this.cookieService.get("userId");
  }
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
