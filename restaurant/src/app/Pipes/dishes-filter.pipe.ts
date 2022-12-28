import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dishesFilter'
})
export class DishesFilterPipe implements PipeTransform {

  transform(value: any, filter_data: string[], property_name: string) {

    console.log("Filters: " + filter_data );

    if(value.length == 0 || filter_data.length == 0)
    {
      return value;
    }

    var filtered_dishes = []
    for (const dish of value)
    {
      if(filter_data.includes(dish[property_name]))
      {
        filtered_dishes.push(dish);
      }
    }
    
    return filtered_dishes;
  }

}
