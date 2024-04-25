"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateShortUrlInput = void 0;
var create_short_url_input_1 = require("./create-short-url.input");
var graphql_1 = require("@nestjs/graphql");
var UpdateShortUrlInput = /** @class */ (function (_super) {
    __extends(UpdateShortUrlInput, _super);
    function UpdateShortUrlInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        graphql_1.Field(function () { return graphql_1.Int; })
    ], UpdateShortUrlInput.prototype, "id");
    __decorate([
        graphql_1.Field()
    ], UpdateShortUrlInput.prototype, "fullUrl");
    UpdateShortUrlInput = __decorate([
        graphql_1.InputType()
    ], UpdateShortUrlInput);
    return UpdateShortUrlInput;
}(graphql_1.PartialType(create_short_url_input_1.CreateShortUrlInput)));
exports.UpdateShortUrlInput = UpdateShortUrlInput;
