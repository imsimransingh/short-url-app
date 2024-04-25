"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateShortUrlInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var class_validator_1 = require("class-validator");
var CreateShortUrlInput = /** @class */ (function () {
    function CreateShortUrlInput() {
    }
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString(),
        class_validator_1.IsUrl()
    ], CreateShortUrlInput.prototype, "shortUrl");
    __decorate([
        graphql_1.Field()
    ], CreateShortUrlInput.prototype, "fullUrl");
    __decorate([
        graphql_1.Field(function () { return Date; }, { nullable: true })
    ], CreateShortUrlInput.prototype, "createdAt");
    __decorate([
        graphql_1.Field(function () { return Date; }, { nullable: true })
    ], CreateShortUrlInput.prototype, "updatedAt");
    CreateShortUrlInput = __decorate([
        graphql_1.InputType()
    ], CreateShortUrlInput);
    return CreateShortUrlInput;
}());
exports.CreateShortUrlInput = CreateShortUrlInput;
