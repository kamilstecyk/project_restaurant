import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Dish } from '../dishes';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCrudDbOperationsService {
  private dbPath = '/dishes';
  // dishes?: Dish[];
  dishesRef: AngularFireList<Dish>;

  constructor(private db: AngularFireDatabase)
  {
    this.dishesRef = db.list(this.dbPath);
  }

  getAllDishes(): AngularFireList<Dish>
  {
    return this.dishesRef;
  }

  createNewDish(dish: Dish): any 
  {
    return this.dishesRef.push(dish);
  }

  updateDish(key: string, value: any): Promise<void>
  {
    return this.dishesRef.update(key, value);
  }

  deleteDish(key: string): Promise<void>
  {
    return this.dishesRef.remove(key);
  }

  deleteAllDishes(): Promise<void> 
  {
    return this.dishesRef.remove();
  }

}
