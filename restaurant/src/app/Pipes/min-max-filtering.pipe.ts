import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minMaxFiltering'
})
export class MinMaxFilteringPipe implements PipeTransform {

  transform(value: any, filter_value_min:number, filter_value_max:number) {
    if(value.length == 0)
    {
      return value;
    }

    var filtered_data = []
    for (const item of value)
    {
      if( item['price'] >= filter_value_min && item['price'] <= filter_value_max )
      {
        filtered_data.push(item);
      }
    }
    
    return filtered_data;
  }

}
