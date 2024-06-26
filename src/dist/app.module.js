"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var graphql_1 = require("@nestjs/graphql");
var apollo_1 = require("@nestjs/apollo");
var config_1 = require("@nestjs/config");
var short_url_module_1 = require("./short-url/short-url.module");
var path_1 = require("path");
var prisma_service_1 = require("./prisma/prisma.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                graphql_1.GraphQLModule.forRoot({
                    driver: apollo_1.ApolloDriver,
                    autoSchemaFile: path_1.join(process.cwd(), 'src/schema.gql'),
                    sortSchema: true
                }),
                config_1.ConfigModule.forRoot({
                    isGlobal: true
                }),
                short_url_module_1.ShortUrlModule,
            ],
            providers: [prisma_service_1.PrismaService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
