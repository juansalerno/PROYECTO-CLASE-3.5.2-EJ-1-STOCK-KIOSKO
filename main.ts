import Kiosco from "./kiosco";
import * as fs from 'fs';

let miKiosco = new Kiosco();
console.log(miKiosco.getListadoALaVenta());
miKiosco.comprarProducto(2, 'Caramelos Media Hora', 6, 8)
miKiosco.venderProducto(6,1);
miKiosco.venderProducto(7,1);
miKiosco.venderProducto(8,1);
miKiosco.comprarProducto(7, 'Palitos Pehuamar', 49, 1)
console.log(miKiosco.getListadoALaVenta());
