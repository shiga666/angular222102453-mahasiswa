import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.body, "login-page");

    this.renderer.removeClass(document.body, "sidebar-mini");
    this.renderer.removeClass(document.body, "layout-fixed");

    this.renderer.setAttribute(document.body, "style", "min-height: 464px;");

  } 
  ngOnInit(): void {
    
  }
}

