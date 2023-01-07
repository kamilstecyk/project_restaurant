import { Pipe, PipeTransform } from '@angular/core';
import { RatingService,DishRatingRecord } from '../services/rating.service';
import { map, VirtualTimeScheduler } from 'rxjs';

@Pipe({
  name: 'starRatingFilter'
})
export class StarRatingFilterPipe implements PipeTransform {
  private dishes_ratings: DishRatingRecord[] = [];

  constructor(private rating_service: RatingService)
  {
    rating_service.getAllStarRatings().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => 
      {
        this.dishes_ratings = []

        data.forEach(record => {
          if(record.averageStarRate != null && record.dishId != null && record.numberOfReviews != null && record.sumRating != null)
          {
            this.dishes_ratings.push({key: record.key, dishId: record.dishId, averageStarRate: record.averageStarRate, numberOfReviews: record.numberOfReviews, sumRating: record.sumRating});
          }
        });
      }
    );
  }

  transform(value: any, filter_data: number[]) {

    console.log("Filters: " + filter_data );
    console.log(value);

    if(value.length == 0 || filter_data.length == 0)
    {
      return value;
    }

    var filtered_dishes: number[] = []
    for (const dish of value)
    {
      let dish_star_rating_record:DishRatingRecord | null = null;

      for(let dish_rating of this.dishes_ratings)
      {
        if(dish_rating.dishId == dish["id"])
        {
          dish_star_rating_record = dish_rating;
          break;
        }
      }

      if(dish_star_rating_record != null && filter_data.includes(dish_star_rating_record.averageStarRate))
      {
        filtered_dishes.push(dish);
      }
    }
    
    return filtered_dishes;
  }

}
