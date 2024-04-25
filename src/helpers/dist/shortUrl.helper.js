"use strict";
exports.__esModule = true;
exports.ShortUrlHelper = void 0;
var crypto_1 = require("crypto");
var ShortUrlHelper = /** @class */ (function () {
    function ShortUrlHelper() {
    }
    ShortUrlHelper.generateShortUrl = function (originalUrl) {
        return crypto_1.createHash('sha256').update(originalUrl).digest('base64')
            .replace(/[\+\/\=]/g, '').substring(0, 8);
    };
    return ShortUrlHelper;
}());
exports.ShortUrlHelper = ShortUrlHelper;
