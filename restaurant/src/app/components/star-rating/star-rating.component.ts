import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.sass']
})
export class StarRatingComponent {

  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = 0;
  @Input() product_id:any;

  countStarAndRate(star:any) {
    this.selectedValue = star;

    // here we will have handling rate by backend 
  }

  addClass(star:any) {
    let ab = "";
    for (let i = 0; i < star; i++) {
      ab = "starId" + i + this.product_id;
      document.getElementById(ab)?.classList.add("selected");
    }
  }
  removeClass(star:any) {
    let ab = "";
    for (let i = star-1; i >= this.selectedValue; i--) {
      ab = "starId" + i + this.product_id;
      document.getElementById(ab)?.classList.remove("selected");
    }
  }
}
