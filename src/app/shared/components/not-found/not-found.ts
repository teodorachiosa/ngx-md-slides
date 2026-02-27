import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CurrentRouteService } from '@shared/services/current-route.service';

@Component({
  selector: 'app-not-found',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound implements OnInit {
  currentRouteService = inject(CurrentRouteService);
  currentRoute = '';

  ngOnInit() {
    this.currentRoute = this.currentRouteService.getCurrentRoute();
  }
}
