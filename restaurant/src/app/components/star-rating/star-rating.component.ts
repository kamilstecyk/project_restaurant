import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { RatingService, DishRatingRecord } from 'src/app/services/rating.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.sass']
})
export class StarRatingComponent {
  private current_dish_rating: DishRatingRecord | null = null;

  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = 0;
  number_of_reviews: number = 0;
  @Input() product_id:any;

  current_rating_subscription: any;
  was_rated = false;

  constructor(private rating_service: RatingService){}

  ngAfterViewInit()
  {
    this.setInitialRating();
  }

  setInitialRating()
  {
    this.rating_service.getAllStarRatings().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => 
      {

        data.forEach(record => {
          if(record.averageStarRate != null && record.dishId != null && record.numberOfReviews != null && record.sumRating != null)
          {
            if(record.dishId == this.product_id)
            {
              this.current_dish_rating = {key: record.key, dishId: record.dishId, averageStarRate: record.averageStarRate, numberOfReviews: record.numberOfReviews, sumRating: record.sumRating};

              this.addClass(this.current_dish_rating.averageStarRate);
              this.number_of_reviews = this.current_dish_rating.numberOfReviews;
            }
          }
        });
      }
    );
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
}
