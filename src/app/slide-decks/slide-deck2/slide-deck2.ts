import { Component } from '@angular/core';


import { Slide } from '@components/slide/slide';
import { Slides } from '@components/slides/slides';

@Component({
  selector: 'app-slide-deck2',
  imports: [Slides, Slide],
  templateUrl: './slide-deck2.html',
  styleUrl: './slide-deck2.css',
})
export class SlideDeck2 {

}
