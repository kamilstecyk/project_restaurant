import { Component } from '@angular/core';
import { MenuDataService } from 'src/app/services/menu-data.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.sass'],
  providers: [ MenuDataService ]
})
export class DishesComponent {
  dishes_data: any;

  constructor(private menu_data_service:MenuDataService)
  {}

  ngOnInit()
  {
    this.dishes_data = this.menu_data_service.getDishes();
  }
}
