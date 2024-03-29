export interface Dish
{
  id: number;
  name: string;
  cuisine_type: string;
  category: string;
  ingredients: string[];
  available_count: number;
  price: number;
  description: string;
  imgs_paths: string[];
}
  
export const dishes = [
  { "id" : 1, "name" : "Makaron Włoski", "cuisine_type" : "włoska", "category" : "Mięsny", "ingredients" : [ "Makaron", "Wieprzowina", "Czosnek", "Sos Boloński" ] , "available_count" : 20 , "price" : 24 , "description" : "Jest to danie zalecane miłośnikom włoskiej kuchni. Porcja dość spora, zatem nawet większy głodomor zwalczy głód panujący w swoim zoloadku..." , imgs_paths : ["../../../assets/pexels-iina-luoto-1211887.jpg"] },
    { "id" : 2, "name" : "Makaron Chiński", "cuisine_type" : "włoska", "category" : "Mięsny", "ingredients" : [ "Makaron", "Wieprzowina", "Czosnek", "Sos Boloński" ] , "available_count" : 25 , "price" : 35 , "description" : "Jest to danie zalecane miłośnikom włoskiej kuchni. Porcja dość spora, zatem nawet większy głodomor zwalczy głód panujący w swoim zoloadku..." , imgs_paths : ["../../../assets/pexels-iina-luoto-1211887.jpg"] },
    { "id" : 3, "name" : "Makaron Grecki", "cuisine_type" : "włoska", "category" : "Mięsny", "ingredients" : [ "Makaron Chiński", "Czosnek", "Sos Boloński" ] , "available_count" : 0 , "price" : 32 , "description" : "Spróbuj, a na pewno nie pozalujesz" , imgs_paths : ["../../../assets/pexels-iina-luoto-1211887.jpg"] },
    { "id" : 4, "name" : "Makaron Turecki", "cuisine_type" : "turecka", "category" : "Bezmięsny", "ingredients" : [ "Makaron", "Czosnek"] , "available_count" : 20 , "price" : 32 , "description" : "Spróbuj, a na pewno nie pozalujesz" , imgs_paths : ["../../../assets/pexels-iina-luoto-1211887.jpg"] }
]

export const cuisine_types = ['włoska', 'grecka', 'turecka', 'polska', 'hiszpańska', 'azjatycka', 'chińska'];

export const dish_categories = ['Mięsny', 'Bezmięsny', 'Wegetariański', 'Wegański'];