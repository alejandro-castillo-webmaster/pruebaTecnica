import { Pipe, PipeTransform } from '@angular/core';
import { ResponseRoom } from 'src/app/interfaces/rooms';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(dataRoom: ResponseRoom[], termino: string): ResponseRoom[] {

    // Si la data esta vacia no continuamos, así evitamos enviar al ngFor un undefined
    if (!dataRoom) {
      return dataRoom;
    }

    // Si el termino esta vacio no continuamos
    if (!termino) {
      return dataRoom;
    }

    // Creamos las variables, cada una filtrara un campo diferente del objeto
    let resultPosts: ResponseRoom[] = [];
    let resultCapacity: ResponseRoom[] = [];
    let resultOccupation: ResponseRoom[] = [];

    // Aplicamos el filtro
    resultCapacity = dataRoom.filter((data) => {
      return data.capacidad.includes(termino);
    });

    resultOccupation = dataRoom.filter((data) => {
      return data.ocupacion.includes(termino);
    });

    // Concatenamos el resultado de ambos filtros
    resultPosts = resultCapacity.concat(resultOccupation);


    // Devolvemos los resultados filtrados
    return resultPosts;

  }

}
