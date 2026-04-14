import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected readonly title = signal('CoffeeLab');

  constructor(public router: Router) { }

  isAuthPage(): boolean {
    return this.router.url.startsWith('/login') ||
      this.router.url.startsWith('/register');
  }
}
