import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { cuisine_types, Dish, dish_categories } from 'src/app/dishes';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { MenuDataService } from 'src/app/services/menu-data.service';
import { FirebaseCrudDbOperationsService } from 'src/app/services/firebase-crud-db-operations.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-dish',
  templateUrl: './update-dish.component.html',
  styleUrls: ['./update-dish.component.sass']
})
export class UpdateDishComponent implements OnDestroy, AfterViewInit {
  dish_object:Dish | null = null;
  types_of_cuisine: string[] = cuisine_types;
  categories_of_dishes: string[] = dish_categories;
  myform: any; 

  dish_ingredients:string[] = []
  dish_key: string | null;
  current_dishes_data_subscirption: any;

  uploading = true;

  constructor(private menu_data_service:MenuDataService, private db_service: FirebaseCrudDbOperationsService, private activated_route: ActivatedRoute, private router: Router)
  {
    this.dish_key = this.activated_route.snapshot.paramMap.get('key');
  }

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

        this.uploading = true;
  
        let description_to_add = ""
  
        if(this.myform.controls.short_desc.value != null)
        {
          description_to_add = this.myform.controls.short_desc.value;
        }
  
        // path to uploaded_imgs the same as earelier
        const updated_values = {
          name: this.myform.controls.dish_name.value,
          cuisine_type: this.myform.controls.cuisine_type.value,
          category: this.myform.controls.dish_category.value,
          ingredients: this.dish_ingredients,
          available_count: this.myform.controls.number_of_available_dishes.value,
          price: this.myform.controls.dish_price.value,
          description: description_to_add,
        }

          // this.menu_data_service.addDishToMenu(new_dish);
          if(this.dish_key)
          {
            this.db_service.updateDish(this.dish_key, updated_values).then(()=> 
            {
              console.log("Updated dish!");
              // this.dish_ingredients = []
              // this.myform.reset({cuisine_type: 'Wybierz typ', dish_category: 'Wybierz kategorię', number_of_available_dishes: 1, dish_price: 1})

              alert("Zaaktualizowano danie!");
              this.router.navigate(['/potrawy'])

            }).catch(()=>
            {
              console.log("Error while updating dish in db!");
              alert("Niestety nie mozliwe było zaaktualizowanie posilku w bazie!");
            }).finally(()=>
            {
              this.uploading = false;
            })
          }

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

  private fetchDishDetailsAndFillForm()
  {
    this.current_dishes_data_subscirption = this.menu_data_service.getDishes().subscribe((value) => 
    {
      const dishes_data: Array<Dish>  = Object.assign([], value) as  Array<Dish>;
      this.dish_object = null;
      
      for(var dish of dishes_data)
      {
        // console.log("Dish iterating id: " + dish.id);

        if(dish.key === this.dish_key )
        {
          this.dish_object = dish;
          this.FillFormWithDishDataFromDb();
          break;
        }
      }
    });
  }

  FillFormWithDishDataFromDb()
  {
    if(this.dish_object?.ingredients != null)
      this.dish_ingredients = this.dish_object?.ingredients;

    this.myform.controls.dish_name.setValue(this.dish_object?.name);
    this.myform.controls.cuisine_type.setValue(this.dish_object?.cuisine_type);
    this.myform.controls.dish_category.setValue(this.dish_object?.category);
    this.myform.controls.number_of_available_dishes.setValue(this.dish_object?.available_count);
    this.myform.controls.dish_price.setValue(this.dish_object?.price);
    this.myform.controls.short_desc.setValue(this.dish_object?.description);
    this.uploading = false;
  }

  ngAfterViewInit(): void {
    this.fetchDishDetailsAndFillForm();
  }

  ngOnDestroy(): void {
      if(this.current_dishes_data_subscirption)
        this.current_dishes_data_subscirption.unsubscribe();
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


