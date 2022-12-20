import { Component } from '@angular/core'
import { Input } from '@angular/core';
import { PriceTransformingService } from 'src/app/services/price-transforming.service';
import { MenuDataService } from 'src/app/services/menu-data.service';
import { Dish } from 'src/app/dishes';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.sass'],
  providers: [ PriceTransformingService, MenuDataService ]
})
export class DishComponent {
  is_ingredient_list_extended = false;
  order_count:number = 0;
  currently_available:number = 0;
  @Input() dish_object: any;
  @Input() object_index?:number;

  constructor(public price_transforming_service: PriceTransformingService, private menu_data_service: MenuDataService)
  {
  }

  ngOnInit()
  {
    this.currently_available = this.dish_object.available_count;
  }

  handleExtensionOfIngredientList()
  {
    this.is_ingredient_list_extended = !this.is_ingredient_list_extended;
    const img_icon = document.getElementById("extend_list_btn");

    if(this.is_ingredient_list_extended)
    {
      let path_down_icon = '../../../assets/bxs-up-arrow.svg'
      img_icon?.setAttribute('src', path_down_icon)
    }
    else 
    {
      let path_up_icon = '../../../assets/bxs-down-arrow.svg'
      img_icon?.setAttribute('src', path_up_icon)
    }
  }

  handleAddDishToOrder()
  {
    if(this.currently_available > 0)
    {
      ++this.order_count;
      --this.currently_available;
    }
    else 
    {
      console.log("Nie mozna zamowic juz wiekszej ilosci tego dania!")
    }
  }

  handleRemoveDishFromOrder()
  {
    if(this.order_count > 0)
    {
      --this.order_count;
      ++this.currently_available;
    }
    else
    {
      console.log("Nie masz tego dania jeszcze w koszyku")
    }
  }

  getFontColor()
  {
    if(this.currently_available > 3)
    {
      return 'green'
    }
    else if(this.currently_available > 0 && this.currently_available <= 3)
    {
      return 'orange'
    }
    else 
    {
      return 'red'
    }
  }

  removeFromMenu()
  {
    this.menu_data_service.removeDishFromMenu(this.dish_object);
  }

}
