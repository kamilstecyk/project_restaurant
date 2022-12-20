import { Component } from '@angular/core';
import { cuisine_types, dish_categories } from 'src/app/dishes';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.sass']
})
export class AddDishComponent {
  types_of_cuisine: string[] = cuisine_types;
  categories_of_dishes: string[] = dish_categories;
  myform: any; 

  ngOnInit() {
    this.myform = new FormGroup({
        
        dish_name: new FormControl(), 
        cuisine_type: new FormControl(),
        dish_category: new FormControl(),
        list_of_ingredients: new FormControl(),
        number_of_available_dishes: new FormControl(),
        dish_price: new FormControl(),
        short_desc: new FormControl()
    });
  }
}
