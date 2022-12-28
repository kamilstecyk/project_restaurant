import { Component } from '@angular/core';
import { FilteringService } from 'src/app/services/filtering.service';
import { MenuDataService } from 'src/app/services/menu-data.service';

@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.sass'],
})
export class FilteringComponent {
  is_extended_filter_section = false;
  cuisine_types: string[] = []
  dish_categories: string[] = []
  rating_stars: string[] = ['1 gwiazdka', '2 gwiazdki', '3 gwiazdki', '4 gwiazdki', '5 gwiazdek'];

  cuisine_types_checked:string[] = []
  dish_categories_checked:string[] = []
  value_min: number = 0
  value_max: number = 100
  stars_chosen:string[] = []

  constructor(public menu_data_service: MenuDataService,private filtering_service: FilteringService)
  {
    this.value_min = this.menu_data_service.getMinDishPrice();
    this.value_max = this.menu_data_service.getMaxDishPrice();
  }
  
  ngOnInit()
  {
    this.cuisine_types = this.menu_data_service.getTypesCuisine();
    this.dish_categories = this.menu_data_service.getDishesCategories();
  }

  handleCheckboxesCuisineType(value: string[])
  {
    // this.cuisine_types_checked = value;
    // console.log(this.cuisine_types);
    this.filtering_service.updateCuisineTypeChecked(value);
  }

  handleCheckBoxesDishCategory(value: string[])
  {
    // this.dish_categories_checked = value;
    // console.log(this.dish_categories_checked);
    this.filtering_service.updateDishCategory(value);
  }

  handleCheckboxesStars(value: string[])
  {
    // this.stars_chosen = value;
    // console.log(this.stars_chosen);
    this.filtering_service.updateStars(value);
  }

  handleMaxPriceDish()
  {
    // console.log(this.value_max)
    this.filtering_service.updateMaxValue(this.value_max);
  }

  handleMinPriceDish()
  {
    // console.log(this.value_min)
    this.filtering_service.updateMinValue(this.value_min);
  }

  handleExtendingFilteringParameters()
  {
    this.is_extended_filter_section = !this.is_extended_filter_section;
  }
}
