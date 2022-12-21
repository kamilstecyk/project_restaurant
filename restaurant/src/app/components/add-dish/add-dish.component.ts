import { Component } from '@angular/core';
import { cuisine_types, Dish, dish_categories } from 'src/app/dishes';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { MenuDataService } from 'src/app/services/menu-data.service';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.sass'],
  providers: [ MenuDataService ]
})
export class AddDishComponent {
  types_of_cuisine: string[] = cuisine_types;
  categories_of_dishes: string[] = dish_categories;
  myform: any; 
  dish_ingredients:string[] = []

  constructor(private menu_data_service:MenuDataService){}

  ngOnInit() {
    this.myform = new FormGroup({
        
        dish_name: new FormControl(), 
        cuisine_type: new FormControl('', selectValidator()),
        dish_category: new FormControl('', selectValidator()),
        list_of_ingredients: new FormControl(),
        number_of_available_dishes: new FormControl('1', Validators.pattern("[0-9]+")),
        dish_price: new FormControl('1', Validators.pattern("[+-]?([0-9]+[.])?[0-9]+")),
        short_desc: new FormControl()
    });
  }

  onSubmit() {
    if (this.myform.valid) {
      console.log("Form Submitted!");

      let last_id = this.menu_data_service.getLastId();
      let new_id = 1;

      if(last_id != -1)
      {
        new_id = last_id + 1;
      }

      const new_dish:Dish = {
        id: new_id,
        name: this.myform.controls.dish_name.value,
        cuisine_type: this.myform.controls.cuisine_type.value,
        category: this.myform.controls.dish_category.value,
        ingredients: this.dish_ingredients,
        available_count: this.myform.controls.number_of_available_dishes.value,
        price: this.myform.controls.dish_price.value,
        description: this.myform.controls.short_desc.value,
        imgs_paths: []
      }

      this.menu_data_service.addDishToMenu(new_dish);

      this.myform.reset({cuisine_type: 'Wybierz typ', dish_category: 'Wybierz kategorię', number_of_available_dishes: 1, dish_price: 1})

      alert("Dodano posiłek!");

    }
    else 
    {
      console.log("Cannot submit");
      alert("Nie uzupełniono wszystkich wymaganych pól")
    }
  }

  addIngredientToDish()
  {
    let ingredient:string = this.myform.controls.list_of_ingredients.value

    if(ingredient !== '' && ingredient != null)
    {
      this.dish_ingredients.push(ingredient);
      this.myform.controls.list_of_ingredients.reset();
    }

    console.log(this.dish_ingredients);
  }

  removeIngredientFromDish(dish: string)
  {
    const index = this.dish_ingredients.indexOf(dish, 0);
    if (index > -1) {
      this.dish_ingredients.splice(index, 1);
    }

    console.log(this.dish_ingredients);
  }
}

function selectValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    if ( value === 'Wybierz typ' || value === 'Wybierz kategorię' ) {
        return {notChosenSelectType:true};
    }
    else if ( value === 'Wybierz kategorię' )
    {
      return {notChosenSelectCategory:true};
    }

    return null;
  };

}
