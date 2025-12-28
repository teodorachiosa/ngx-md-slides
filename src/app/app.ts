import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Header, RouterLink, RouterOutlet, RouterLinkActive, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
