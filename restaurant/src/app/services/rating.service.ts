import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

export interface DishRatingRecord
{
  dishId: number,
  averageStarRate: number,
  numberOfReviews: number,
  sumRating: number
}

export interface Review 
{
  nick: string,
  date?: string,
  content: string
}

export interface DishReviewRecord
{
  dishId: number,
  reviews: Review[]
}

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private dishes_ratings: DishRatingRecord[] = [];
  private current_rating_of_dish = new Subject();

  private dishes_reviews: DishReviewRecord[] = [];
  private current_dish_reviews = new ReplaySubject(1);
  
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

  getDishReviews(dish_id: number)
  {
    for(let record of this.dishes_reviews)
    {
      if(record.dishId === dish_id)
      {
        return record.reviews;
      }
    }

    return null;
  }

  getCurrentReviewsDish()
  {
    return this.current_dish_reviews;
  }

  addDishReview(dish_id: number, review_username: string, review_date: string, review_content: string)
  {
    let was_founded = false;
    for(let record of this.dishes_reviews)
    {
      if(record.dishId == dish_id)
      {
        record.reviews.push({nick: review_username, date: review_date, content: review_content});
        was_founded = true;
        this.current_dish_reviews.next(record.reviews);
        console.log(this.dishes_reviews);
        break;
      }
    }

    if(was_founded == false)
    {
      let dish_reviews = []
      dish_reviews.push({nick: review_username, date: review_date, content: review_content});
      this.dishes_reviews.push({dishId: dish_id, reviews: dish_reviews});
      this.current_dish_reviews.next(dish_reviews);
    }

    console.log(this.dishes_reviews);
  }
}
