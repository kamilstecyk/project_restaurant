import { Pipe, PipeTransform } from '@angular/core';
import { RatingService,DishRatingRecord } from '../services/rating.service';

@Pipe({
  name: 'starRatingFilter'
})
export class StarRatingFilterPipe implements PipeTransform {

  constructor(private rating_service: RatingService){}

  transform(value: any, filter_data: number[]) {

    console.log("Filters: " + filter_data );

    if(value.length == 0 || filter_data.length == 0)
    {
      return value;
    }

    var filtered_dishes: number[] = []
    for (const dish of value)
    {
      let dish_star_rating_record:DishRatingRecord | null = this.rating_service.getCurrentRatingAndNumberOfRewivesOfDishFromId(dish["id"]);

      if(dish_star_rating_record != null && filter_data.includes(dish_star_rating_record.averageStarRate))
      {
        filtered_dishes.push(dish);
      }
    }
    
    return filtered_dishes;
  }

}
