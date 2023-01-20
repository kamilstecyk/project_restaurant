import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map } from 'rxjs';
import { AuthorizationService } from '../shared/services/authorization.service';
export interface DishRatingRecord
{
  key?: string | null;
  dishId: number,
  averageStarRate: number,
  numberOfReviews: number,
  usersWhoRated?: string[]
}

export interface Review 
{
  nick: string,
  date?: string,
  content: string
}

export interface DishReviewRecord
{
  key?: string | null;
  dishId: number,
  reviews: Review[]
}

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private dishes_ratings: DishRatingRecord[] = [];
  private dishes_reviews: DishReviewRecord[] = [];

  private dbPathRating = '/starRatings';
  starRatingsRef: AngularFireList<DishRatingRecord>;

  private dbPathReviews = '/userReviews';
  userReviewsRef: AngularFireList<DishReviewRecord>;
  
  constructor(private db_service: AngularFireDatabase, private authorizationService: AuthorizationService) 
  {
    this.starRatingsRef = db_service.list(this.dbPathRating);
    this.userReviewsRef = db_service.list(this.dbPathReviews);

    this.getAllStarRatings().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => 
      {
        this.dishes_ratings = []

        data.forEach(record => {
          if(record.averageStarRate != null && record.dishId != null && record.numberOfReviews != null )
          {
            this.dishes_ratings.push({key: record.key, dishId: record.dishId, averageStarRate: record.averageStarRate, numberOfReviews: record.numberOfReviews});
          }
        });
      }
    );

    this.getUserReviews().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => 
      {
        this.dishes_reviews = []

        data.forEach(record => {
          if(record.dishId != null && record.key != null && record.reviews != null)
          {
            this.dishes_reviews.push({key : record.key, dishId : record.dishId,
              reviews : record.reviews});
          }
        });
      }
    );
    
  }

  // star rating

  getAllStarRatings(): AngularFireList<DishRatingRecord>
  {
    return this.starRatingsRef;
  }

  createStarRating(star_rating_record: DishRatingRecord)
  {
    return this.starRatingsRef.push(star_rating_record);
  }

  updateStarRating(key: string, value: any): any 
  {
    return this.starRatingsRef.update(key, value);
  }

  addDishRatingStar(number_of_stars: number, id: number)
  {
    let was_founded = false;
    const logged_user_email = this.authorizationService.getLoggedUserEmail();

    for(var record of this.dishes_ratings)
    {
      if(record.dishId == id)
      {
        // record.sumRating += number_of_stars;
        // ++record.numberOfReviews;
        // record.averageStarRate = Math.ceil(record.sumRating / record.numberOfReviews);
        // console.log(record.averageStarRate);

        const average_star_rating = ( record.averageStarRate * record.numberOfReviews + number_of_stars) / ( record.numberOfReviews + 1 );
        const average_star_rating_rounded = Number(average_star_rating.toFixed(2));

        ++record.numberOfReviews;
        record.averageStarRate = average_star_rating_rounded;

        let record_users = record.usersWhoRated;
        record_users?.push(logged_user_email);
        
        was_founded = true;
        if(record.key)
        {
          this.updateStarRating(record.key, {numberOfReviews: record.numberOfReviews, averageStarRate: record.averageStarRate,usersWhoRated : record_users })
        }

        break;
      }
    }

    if(was_founded == false)
    {
      this.dishes_ratings.push({dishId: id, averageStarRate: number_of_stars, numberOfReviews: 1, usersWhoRated: [logged_user_email]});

      this.createStarRating({dishId: id, averageStarRate: number_of_stars, numberOfReviews: 1, usersWhoRated: [logged_user_email]});
    }
  }

  // dish reviews



  getUserReviews(): AngularFireList<DishReviewRecord>
  {
    return this.userReviewsRef;
  }

  createReview(review_record: DishReviewRecord)
  {
    return this.userReviewsRef.push(review_record);
  }

  updateReview(key: string, value: any): any 
  {
    return this.userReviewsRef.update(key, value);
  }


  getDishReviews(dish_id: number | null)
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

  addDishReview(dish_id: number, review_username: string, review_date: string, review_content: string)
  {
    let was_founded = false;
    for(let record of this.dishes_reviews)
    {
      if(record.dishId == dish_id)
      {
        record.reviews.push({nick: review_username, date: review_date, content: review_content});
        if(record.key)
        {
          this.updateReview(record.key, {reviews : record.reviews});
          console.log("Review record was updated - --------<<<<");
        }
        was_founded = true;
        console.log(this.dishes_reviews);
        break;
      }
    }

    if(was_founded == false)
    {
      let dish_reviews = []
      dish_reviews.push({nick: review_username, date: review_date, content: review_content});
      this.dishes_reviews.push({dishId: dish_id, reviews: dish_reviews});
      this.createReview({dishId: dish_id, reviews: dish_reviews});
    }

    console.log(this.dishes_reviews);
  }
}
