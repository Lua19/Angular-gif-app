import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _history: string[] = [];

  get history(){
    this._history = this._history.splice(0,9);
    return [...this._history];

    
  }

  searchGifs(query:string){
    
    query = query.trim().toLocaleLowerCase();
    
    if (!this._history.includes(query)) {
      this._history.unshift(query);
    }

    console.log(this._history);
  }


}
