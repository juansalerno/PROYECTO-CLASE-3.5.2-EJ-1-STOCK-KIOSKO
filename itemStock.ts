import Producto from './producto';

export default class ItemStock {
    private producto: Producto;
    private cantidad: number;


    public constructor(producto: Producto, cantidad: number) {
        this.producto = producto;
        this.cantidad = cantidad;
        
    }

    public getItemStock(): ItemStock {
        return this
    }

    public setCantidad(cantidad: number): void {
        this.cantidad = cantidad;
    }

    public getCantidad(): number {
        return this.cantidad;
    }

    public getProducto(): Producto {
        return this.producto;
    }

}