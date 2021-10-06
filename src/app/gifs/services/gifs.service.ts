import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey:string= 'z3eZq0fA9vHwaclMSV88cJLjLhdDK1jJ';
  public searchResults: any[] = [];
  private _history: string[] = [];

  get history(){
    this._history = this._history.splice(0,9);
    return [...this._history];

    
  }

  constructor(private http: HttpClient){}

  searchGifs(query:string){
    
    query = query.trim().toLocaleLowerCase();
    
    if (!this._history.includes(query)) {
      this._history.unshift(query);
    }

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=z3eZq0fA9vHwaclMSV88cJLjLhdDK1jJ&q=${query}&limit=10`)
    .subscribe((resp:any) =>{
      console.log(resp.data);
      this.searchResults = resp.data;
    })
    
  }


}
