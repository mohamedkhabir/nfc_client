import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() dark: boolean = false
  navbar: any[] = []

  constructor( private route: ActivatedRoute, private router: Router) {
    route.url.subscribe((url) => {
      this.navbar = [
        {route: 'who-are-we', active: false, label: 'who are we'},
        {route: 'how-it-works', active: false, label: 'how it works'},
        {route: 'buy', active: false, label: 'buy'},
        {route: 'contact-us', active: false, label: 'contact us'},
      ]
    })
  }

}
