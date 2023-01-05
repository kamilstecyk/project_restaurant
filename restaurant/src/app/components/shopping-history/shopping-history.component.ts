import { Component } from '@angular/core';
import { BuyingService, HistoryRecord } from 'src/app/services/buying.service';
import { PriceTransformingService } from 'src/app/services/price-transforming.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-shopping-history',
  templateUrl: './shopping-history.component.html',
  styleUrls: ['./shopping-history.component.sass']
})
export class ShoppingHistoryComponent {
  ordered_dishes: HistoryRecord[] = [];
  downloading_dishes_history = true;

  constructor(private buying_service:BuyingService, public price_transforming_service: PriceTransformingService)
  {
    buying_service.getOrdersHistory().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
          //({ key: c.payload.key, ...c.payload.val() })
          // change key ->>>> to id 
        )
      )
    ).subscribe(data => 
      {
        this.ordered_dishes = [];

        data.forEach((history_record)=>
        {
          const dish = history_record.dish_info?.dish;
          
          if(dish != null &&  dish.available_count != null && dish.category != null && dish.cuisine_type!= null && dish.description != null && dish.id != null && dish.name != null && dish.price != null && history_record != null && history_record.date != null && history_record.dish_info!= null )
          {
            if(dish.imgs_paths == null)
            {
              dish.imgs_paths = [];
            }

            if(dish.ingredients == null)
            {
              dish.ingredients = []
            }

            this.ordered_dishes.push({dish_info: {dish : { "id" : dish.id, "name" : dish.name, "cuisine_type" : dish.cuisine_type, "category" : dish.category, "ingredients" : dish.ingredients , "available_count" : dish.available_count , "price" : dish.price , "description" : dish.description , imgs_paths : dish.imgs_paths, key : dish.key } , ordered_amount : history_record.dish_info.ordered_amount} , date : history_record.date});
          }

          // we reverse object to have newest at the top
          this.ordered_dishes.reverse();
          this.downloading_dishes_history = false;
        });
      });
  }
}
