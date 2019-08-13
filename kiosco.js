"use strict";
exports.__esModule = true;
var producto_1 = require("./producto");
var itemStock_1 = require("./itemStock");
var fs = require("fs");
var Kiosco = /** @class */ (function () {
    function Kiosco() {
        this.dataBaseStock = this.leerStockDesdeArchivo('./productosEnStock.txt', '\r\n', ',');
    }
    Kiosco.prototype.getListadoALaVenta = function () {
        for (var i = 0; i < this.dataBaseStock.length; i++) {
            if (this.dataBaseStock[i].getCantidad() <= 0) {
                this.dataBaseStock.splice(i, 1, null);
            }
        }
        return this.dataBaseStock;
    };
    Kiosco.prototype.comprarProducto = function (id, descripcion, precioVenta, cantidad) {
        var productoComprado = new producto_1["default"](id, descripcion, precioVenta);
        var existeProducto = false;
        for (var i = 0; i < this.dataBaseStock.length; i++) {
            if (this.dataBaseStock[i].getItemStock().getProducto().getId() == id) {
                var cantidadExistente = this.dataBaseStock[i].getItemStock().getCantidad();
                cantidadExistente += cantidad;
                existeProducto = true;
                this.dataBaseStock[i].getItemStock().setCantidad(cantidadExistente);
                this.dataBaseStock[i].getItemStock().getProducto().setPrecio(precioVenta);
            }
        }
        if (!existeProducto) {
            this.dataBaseStock.push(new itemStock_1["default"](productoComprado, cantidad));
        }
        this.guardarEnProductosEnStock();
    };
    Kiosco.prototype.venderProducto = function (id, cantidad) {
        try {
            var productoBuscado = this.buscarEnListado(id);
            var cantidadExistente = productoBuscado.getCantidad();
            cantidadExistente -= cantidad;
            productoBuscado.getItemStock().setCantidad(cantidadExistente);
            this.guardarEnProductosVendidos(productoBuscado, cantidad);
            this.guardarEnProductosEnStock();
        }
        catch (error) {
            console.log(error.message);
        }
    };
    Kiosco.prototype.guardarEnProductosEnStock = function () {
        var cadena = '';
        var dimensionArreglo = this.dataBaseStock.length;
        var ultimaPosicion = (dimensionArreglo - 1);
        for (var i = 0; i < ultimaPosicion; i++) {
            cadena = cadena + this.dataBaseStock[i].getProducto().getId().toString() + ',  ' + this.dataBaseStock[i].getProducto().getDescripcion() + ', ' + this.dataBaseStock[i].getProducto().getPrecio().toString() + ', ' + this.dataBaseStock[i].getCantidad().toString() + '\r\n';
        }
        cadena = cadena + this.dataBaseStock[ultimaPosicion].getProducto().getId().toString() + ',  ' + this.dataBaseStock[ultimaPosicion].getProducto().getDescripcion() + ', ' + this.dataBaseStock[ultimaPosicion].getProducto().getPrecio().toString() + ', ' + this.dataBaseStock[ultimaPosicion].getCantidad().toString();
        fs.writeFileSync('./productosEnStock.txt', cadena);
    };
    Kiosco.prototype.guardarEnProductosVendidos = function (producto, cantidad) {
        var cadena = '';
        cadena = cadena + producto.getProducto().getId().toString() + ', ' + producto.getProducto().getDescripcion() + ', ' + producto.getProducto().getPrecio().toString() + ', ' + cantidad.toString() + '\r\n';
        fs.appendFileSync('productosVendidos.txt', cadena);
    };
    Kiosco.prototype.buscarEnListado = function (id) {
        for (var i = 0; i < this.dataBaseStock.length; i++) {
            if (this.dataBaseStock[i].getProducto().getId() == id) {
                return this.dataBaseStock[i];
            }
        }
        throw new Error('El id ingresado no se encuentra en la base de datos');
    };
    Kiosco.prototype.leerStockDesdeArchivo = function (rutaArchivo, separador1, separador2) {
        var textoImportado = fs.readFileSync(rutaArchivo, 'utf-8');
        var arregloTexto = textoImportado.split(separador1);
        var arregloItemsStock = [];
        var product;
        for (var i = 0; i < arregloTexto.length; i++) {
            var filaItem = arregloTexto[i].split(separador2);
            product = new producto_1["default"](parseInt(filaItem[0]), filaItem[1], parseInt(filaItem[2]));
            arregloItemsStock.push(new itemStock_1["default"](product, parseInt(filaItem[3])));
        }
        return arregloItemsStock;
    };
    return Kiosco;
}());
exports["default"] = Kiosco;
