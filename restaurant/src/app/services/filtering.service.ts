import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class FilteringService {
  private types_of_cuisine = new Subject();
  private dish_categories = new Subject();
  private min_value = new Subject();
  private max_value = new Subject();
  private stars_rating_chosen = new Subject();

  constructor() {}

  updateCuisineTypeChecked(value: string[])
  {
    this.types_of_cuisine.next(value);
  }

  updateDishCategory(value: string[])
  {
    this.dish_categories.next(value);
  }

  updateStars(value: string[])
  {
    let filtered_stars: number[] = [];

    value.forEach((star_value)=>
    {
      const splitted_value = star_value.split(' ');
      const star = parseInt(splitted_value[0]);

      filtered_stars.push(star);
    });

    this.stars_rating_chosen.next(filtered_stars);
  }

  updateMinValue(value: number)
  {
    this.min_value.next(value);
  }

  updateMaxValue(value: number)
  {
    this.max_value.next(value);
  }

  getCuisineTypes()
  {
    return this.types_of_cuisine;
  }

  getDishesCategoryChecked()
  {
    return this.dish_categories;
  }

  getStarsChosen()
  {
    return this.stars_rating_chosen;
  }

  getMinDishValue()
  {
    return this.min_value;
  }

  getMaxDishValue()
  {
    return this.max_value;
  }
}
