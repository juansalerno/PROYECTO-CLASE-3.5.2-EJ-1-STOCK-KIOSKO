"use strict";
exports.__esModule = true;
var ItemStock = /** @class */ (function () {
    function ItemStock(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }
    ItemStock.prototype.getItemStock = function () {
        return this;
    };
    ItemStock.prototype.setCantidad = function (cantidad) {
        this.cantidad = cantidad;
    };
    ItemStock.prototype.getCantidad = function () {
        return this.cantidad;
    };
    ItemStock.prototype.getProducto = function () {
        return this.producto;
    };
    return ItemStock;
}());
exports["default"] = ItemStock;
