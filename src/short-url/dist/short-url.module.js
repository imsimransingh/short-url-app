"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShortUrlModule = void 0;
var common_1 = require("@nestjs/common");
var short_url_service_1 = require("./short-url.service");
var short_url_resolver_1 = require("./short-url.resolver");
var prisma_service_1 = require("../prisma/prisma.service");
var short_url_controller_1 = require("./short-url.controller");
var ShortUrlModule = /** @class */ (function () {
    function ShortUrlModule() {
    }
    ShortUrlModule = __decorate([
        common_1.Module({
            providers: [short_url_resolver_1.ShortUrlResolver, short_url_service_1.ShortUrlService, prisma_service_1.PrismaService],
            controllers: [short_url_controller_1.ShortUrlController]
        })
    ], ShortUrlModule);
    return ShortUrlModule;
}());
exports.ShortUrlModule = ShortUrlModule;
