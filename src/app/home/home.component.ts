import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private route: ActivatedRoute) {
    this.route.fragment.subscribe((fragment: any) => {
      this.scroll(fragment)
    })
  }

  scroll(fragment: string) {
    setTimeout(() => {
      let el = document.getElementById(fragment)
      el ? el.scrollIntoView({behavior: 'smooth'}) : ''
    }, 200)

  }

  opengoogleplay() {
    const url = 'https://play.google.com/store/apps/details?id=packagename';
    window.open(url, '_blank');
  }

  openappstore() {
    const url = 'https://www.example.com';
    window.open(url, '_blank');
  }
}
