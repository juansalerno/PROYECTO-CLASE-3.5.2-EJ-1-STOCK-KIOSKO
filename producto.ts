export default class Producto {
    private id: number;
    private descripcion: string;
    private precio: number;

    public constructor(id: number, descripcion: string, precio: number){
        this.id = id;
        this.descripcion = descripcion;
        this.precio = precio;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public setDescripcion(descripcion: string): void {
        this.descripcion = descripcion;
    }

    public setPrecio(precio: number): void {
        this.precio = precio;
    }

    public getId(): number {
        return this.id;
    }

    public getDescripcion(): string {
        return this.descripcion;
    }

    public getPrecio(): number {
        return this.precio;
    }

}