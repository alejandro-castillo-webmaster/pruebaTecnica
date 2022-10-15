import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { ResponseRoom } from '../interfaces/rooms';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Cogemos la apiURL de los environments, así podemos controlar los environments de desarrollo y de producción
  private apiUrl = environment.apiUrl;

  // Inyectamos el httpClient para hacer los servicios
  constructor(private http: HttpClient) { }

  // Llamamos a la API para obtener la data
  dataFlat(flat: number) {

    //Tipamos la respuesta, así usamos el TypeScript estrictor
    return this.http.get<ResponseRoom[]>(`${this.apiUrl}flat/${ flat }`);

  }

  // AQUÍ DEBAJO ESTARÍAN LAS LLAMADAS POST, PUT Y DETELE PARA EL RESTO DE LOS CRUDS

}
