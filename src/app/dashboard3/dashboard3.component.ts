import { Component } from '@angular/core';

import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-dashboard3',
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent, SidebarComponent],
  templateUrl: './dashboard3.component.html',
  styleUrl: './dashboard3.component.css'
})
export class Dashboard3Component {

}
