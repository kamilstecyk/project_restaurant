import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface DishRatingRecord
{
  dishId: number,
  averageStarRate: number,
  numberOfReviews: number,
  sumRating: number
}

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private dishes_ratings: DishRatingRecord[] = [];
  private current_rating_of_dish = new Subject();
  
  constructor() { }

  addDishRatingStar(number_of_stars: number, id: number)
  {
    let was_founded = false;
    for(var record of this.dishes_ratings)
    {
      if(record.dishId == id)
      {
        record.sumRating += number_of_stars;
        ++record.numberOfReviews;
        record.averageStarRate = Math.ceil(record.sumRating / record.numberOfReviews);
        console.log(record.averageStarRate);
        
        was_founded = true;
        this.current_rating_of_dish.next(record);
        break;
      }
    }

    if(was_founded == false)
    {
      this.dishes_ratings.push({dishId: id, averageStarRate: number_of_stars, numberOfReviews: 1, sumRating: number_of_stars});
      this.current_rating_of_dish.next({dishId: id, averageStarRate: number_of_stars, numberOfReviews: 1, sumRating: number_of_stars});
    }
  }

  getCurrentRatingAndNumberOfRewivesOfDishFromId(dish_id: number)
  {
    for(var record of this.dishes_ratings)
    {
      if(record.dishId == dish_id)
      {
        return record;
      }
    }
  }

  getCurrentRatingDish()
  {
    return this.current_rating_of_dish;
  }
}
