import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { RatingService, DishRatingRecord } from 'src/app/services/rating.service';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.sass']
})
export class StarRatingComponent {

  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = 0;
  number_of_reviews: number = 0;
  @Input() product_id:any;

  current_rating_subscription: any;
  was_rated = false;

  constructor(private rating_service: RatingService)
  {
    this.current_rating_subscription = rating_service.getCurrentRatingDish().subscribe((value)=>
    {
      this.number_of_reviews = (value as DishRatingRecord).numberOfReviews;
    });
  }

  ngAfterViewInit()
  {
    this.setInitialRating();
  }

  setInitialRating()
  {
    var rating_record_of_dish = this.rating_service.getCurrentRatingAndNumberOfRewivesOfDishFromId(this.product_id) as DishRatingRecord;

    if(rating_record_of_dish != null)
    {
      this.addClass(rating_record_of_dish.averageStarRate);
      this.number_of_reviews = rating_record_of_dish.numberOfReviews;
    }
  }

  countStarAndRate(star:any) {
    this.selectedValue = star;
    this.rating_service.addDishRatingStar(this.selectedValue, this.product_id);
    this.was_rated = true;
    setTimeout(()=>{this.was_rated = false}, 1250);
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

  ngOnDestroy()
  {
    this.current_rating_subscription.unsubscribe();
  }
}
