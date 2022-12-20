import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriceTransformingService {

  constructor() {}

  getPriceInUSD(price_in_pln:number):number
  {
    return price_in_pln * 0.23 
  }
}
