"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatRupiah = void 0;
function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(angka);
}
exports.formatRupiah = formatRupiah;
