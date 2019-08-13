"use strict";
exports.__esModule = true;
var Producto = /** @class */ (function () {
    function Producto(id, descripcion, precio) {
        this.id = id;
        this.descripcion = descripcion;
        this.precio = precio;
    }
    Producto.prototype.setId = function (id) {
        this.id = id;
    };
    Producto.prototype.setDescripcion = function (descripcion) {
        this.descripcion = descripcion;
    };
    Producto.prototype.setPrecio = function (precio) {
        this.precio = precio;
    };
    Producto.prototype.getId = function () {
        return this.id;
    };
    Producto.prototype.getDescripcion = function () {
        return this.descripcion;
    };
    Producto.prototype.getPrecio = function () {
        return this.precio;
    };
    return Producto;
}());
exports["default"] = Producto;
