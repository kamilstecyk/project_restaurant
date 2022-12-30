import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriceTransformingService {

  constructor() {}

  getPriceInUSD(price_in_pln:number):string
  {
    return  Number(( price_in_pln * 0.23 ).toFixed(2)).toFixed(2);
  }
}
