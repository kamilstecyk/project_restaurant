import { Component } from '@angular/core';
import { BuyingService, HistoryRecord } from 'src/app/services/buying.service';
import { PriceTransformingService } from 'src/app/services/price-transforming.service';

@Component({
  selector: 'app-shopping-history',
  templateUrl: './shopping-history.component.html',
  styleUrls: ['./shopping-history.component.sass']
})
export class ShoppingHistoryComponent {
  ordered_dishes: HistoryRecord[] = [];

  constructor(private buying_service:BuyingService, public price_transforming_service: PriceTransformingService)
  {
    this.ordered_dishes = this.buying_service.getWholeOrdersHistory();
  }
}
