import Producto from './producto';
import ItemStock from './itemStock';
import * as fs from 'fs';
import * as readlineSync from 'readline-sync';

export default class Kiosco {
    private dataBaseStock: ItemStock[];

    public constructor() {
        this.dataBaseStock = this.leerStockDesdeArchivo('./productosEnStock.txt', '\r\n', ',')
    }

    public getListadoALaVenta(): ItemStock[] {
        for (let i = 0; i < this.dataBaseStock.length; i++) {
            if (this.dataBaseStock[i].getCantidad() <= 0) {
                this.dataBaseStock.splice(i, 1, null);
            }
        }
        return this.dataBaseStock;
    }

    public comprarProducto(id: number, descripcion: string, precioVenta: number, cantidad: number): void {
        let productoComprado = new Producto(id, descripcion, precioVenta);
        let existeProducto = false;
        for (let i = 0; i < this.dataBaseStock.length; i++) {
            if (this.dataBaseStock[i].getItemStock().getProducto().getId() == id) {
                let cantidadExistente = this.dataBaseStock[i].getItemStock().getCantidad();
                cantidadExistente += cantidad;
                existeProducto = true;
                this.dataBaseStock[i].getItemStock().setCantidad(cantidadExistente);
                this.dataBaseStock[i].getItemStock().getProducto().setPrecio(precioVenta);
            }
            
        }
        if(!existeProducto) {
        this.dataBaseStock.push(new ItemStock(productoComprado, cantidad));
        }
        this.guardarEnProductosEnStock();
        
    }


    public venderProducto(id: number, cantidad: number) {
        try {
            let productoBuscado = this.buscarEnListado(id);
            let cantidadExistente = productoBuscado.getCantidad();
            cantidadExistente -= cantidad;
            productoBuscado.getItemStock().setCantidad(cantidadExistente);
            this.guardarEnProductosVendidos(productoBuscado, cantidad);
            this.guardarEnProductosEnStock();
        }
        catch (error) {
            console.log(error.message);
        }
    }

    private guardarEnProductosEnStock() {
        let cadena = '';
        let dimensionArreglo = this.dataBaseStock.length;
        let ultimaPosicion = (dimensionArreglo - 1);
        for(let i=0; i < ultimaPosicion; i++) {
            cadena = cadena + this.dataBaseStock[i].getProducto().getId().toString() + ',  ' + this.dataBaseStock[i].getProducto().getDescripcion() + ', ' + this.dataBaseStock[i].getProducto().getPrecio().toString() + ', ' + this.dataBaseStock[i].getCantidad().toString() + '\r\n';
        }
        cadena = cadena + this.dataBaseStock[ultimaPosicion].getProducto().getId().toString() + ',  ' + this.dataBaseStock[ultimaPosicion].getProducto().getDescripcion() + ', ' + this.dataBaseStock[ultimaPosicion].getProducto().getPrecio().toString() + ', ' + this.dataBaseStock[ultimaPosicion].getCantidad().toString()
        fs.writeFileSync('./productosEnStock.txt', cadena)
    }

    private guardarEnProductosVendidos(producto: ItemStock, cantidad: number) {
        let cadena = '';
        cadena = cadena + producto.getProducto().getId().toString() + ', ' + producto.getProducto().getDescripcion() + ', ' + producto.getProducto().getPrecio().toString() + ', ' + cantidad.toString() + '\r\n';
        fs.appendFileSync('productosVendidos.txt',cadena)
    }

    private buscarEnListado(id: number): ItemStock {
        for (let i = 0; i < this.dataBaseStock.length; i++) {
            if (this.dataBaseStock[i].getProducto().getId() == id) {
                return this.dataBaseStock[i]
            }
        }
        throw new Error('El id ingresado no se encuentra en la base de datos')
    }

    private leerStockDesdeArchivo(rutaArchivo: string, separador1: string, separador2: string) {
        let textoImportado: string = fs.readFileSync(rutaArchivo, 'utf-8');
        let arregloTexto: string[] = textoImportado.split(separador1);
        let arregloItemsStock: ItemStock[] = [];
        let product: Producto;
        for (let i = 0; i < arregloTexto.length; i++) {
            let filaItem: string[] = arregloTexto[i].split(separador2);
            product = new Producto(parseInt(filaItem[0]), filaItem[1], parseInt(filaItem[2]))
            arregloItemsStock.push(new ItemStock(product, parseInt(filaItem[3])));
        }
        return arregloItemsStock;
    }
}