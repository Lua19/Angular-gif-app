import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiURL:string= 'https://api.giphy.com/v1/gifs';
  private apiKey:string= 'z3eZq0fA9vHwaclMSV88cJLjLhdDK1jJ';
  public searchResults: Gif[] = [];
  private _history: string[] = [];

  get history(){
    this._history = this._history.splice(0,9);
    return [...this._history];
    
  }

  constructor(private http: HttpClient){
  this._history = JSON.parse( localStorage.getItem('Historial')!) || [];
  this.searchResults = JSON.parse( localStorage.getItem('Resultados')!) || [];

  //  if (localStorage.getItem('Historial')) {
  //    this._history = JSON.parse(localStorage.getItem('Historial')!);
  //  }

  }

  searchGifs(query:string){
    
    query = query.trim().toLocaleLowerCase();
    
    if (!this._history.includes(query)) {
      this._history.unshift(query);

      localStorage.setItem('Historial',JSON.stringify(this._history));
    }


    const params = new HttpParams()
      .set('api_key',this.apiKey)
      .set('lmit','10')
      .set('q',query)

    this.http.get<SearchGifsResponse>(`${this.apiURL}/search?`,{params})
    .subscribe((resp) =>{
      this.searchResults = resp.data;
      localStorage.setItem('Resultados',JSON.stringify(this.searchResults));
    })
  }
}
