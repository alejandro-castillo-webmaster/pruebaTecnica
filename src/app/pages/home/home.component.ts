import { Component, OnInit } from '@angular/core';
import { ResponseRoom } from 'src/app/interfaces/rooms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Variables
  public dataFlat: ResponseRoom[] = [];
  public numberFlat: number = 1;
  public filterPost = '';
  public capacidad = '';


  // Inyectamos el servicio
  constructor(private dataService: DataService) { }

  // Realizamos la petición inicial de la tada
  ngOnInit(): void {

    this.getData();

  }


  // Llamamos al servicio para obtener la data, si ni le enviamos ningún parámetro le asignamos el parametro '1', así evitamos enviar una parámetro undefined al servicio
  getData(flat: number = 1) {

    this.numberFlat = flat;

    // Nos subscribimos
    this.dataService
      .dataFlat(flat)
      .subscribe(
        (dataFlat: ResponseRoom[]) => {
          this.dataFlat = dataFlat; // Gestionamos la data cuando el servicio no da error
          console.log(this.dataFlat);
        },
        error => {
          console.warn(error); // Manejamos el error
        }
      );
  }


  // Cambiamos de planta, le enviamos el evento de donde obtendremos el valor del select (1,2,3)
  flat(event: any) {

    this.getData(event.value);

  }

  // Guardamos la modificación
  saveChanges(room: ResponseRoom) {

    // Obtenemos la data de los inputs, así obtendremos los nuevos datos del input
    let capacity = (<HTMLInputElement>document.getElementById(`capacity_${room.id}`)).value;
    let occupation = (<HTMLInputElement>document.getElementById(`occupation_${room.id}`)).value;

    console.log(`La nueva capacidad es: ${capacity} .La nueva ocupación es ${ occupation} .El id del usuario es: ${ room.id }. La planta número ${room.flat}`);

    // Llamamos al servicio
    // Despues recargamos la info del piso seleccionado, donde ya tendriamos en la BBDD la data actualizada
    this.getData(room.flat);

  }

  // Delete room
  deleteRoom(room: ResponseRoom) {

    // Simular que llamamos al servicio para borrar la sala
    console.log(`Borrar la sala con el id:  ${room.id} de la planta número ${room.flat}`);

    // Recargar la info del piso seleccionado
    this.getData(room.flat);

  }

  // Añadir una nueva sala generica
  addRoom() {

    // Generamos un id Aleatorio, que tambien usaremos para el nombre de la sala
    let id = Math.floor(Math.random() * 1000000000);

    // Recosntruimos el objeto que enviariamos a la api
    let room: ResponseRoom = {
      "id": id,
      "flat": this.numberFlat,
      "nombre": "Sala " + id,
      "capacidad": '50',
      "ocupacion": '25'
    }
    console.log(`Enviamos al servicio una nueva sala generica con el id: ${room.id}, que estara en la planta  ${room.flat}`);
    // Recargar la info del piso seleccionado
    this.getData(room.flat);

  }

}
