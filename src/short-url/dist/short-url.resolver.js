"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ShortUrlResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var short_url_entity_1 = require("./entities/short-url.entity");
var ShortUrlResolver = /** @class */ (function () {
    function ShortUrlResolver(shortUrlService) {
        this.shortUrlService = shortUrlService;
    }
    // Mutation resolver to create a short URL
    ShortUrlResolver.prototype.createShortUrl = function (createShortUrlInput) {
        // Call the create method of the ShortUrlService to create a new short URL
        return this.shortUrlService.create(createShortUrlInput);
    };
    // Query resolver to find all short URLs
    ShortUrlResolver.prototype.findAll = function (pageSize, currentPage) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Call the findAll method of the ShortUrlService to retrieve all short URLs
                return [2 /*return*/, this.shortUrlService.findAll(pageSize, currentPage)];
            });
        });
    };
    // Query resolver to find a single short URL by ID
    ShortUrlResolver.prototype.findOne = function (id) {
        // Call the findOne method of the ShortUrlService to retrieve a single short URL by ID
        return this.shortUrlService.findOne(id);
    };
    // Mutation resolver to update a short URL
    ShortUrlResolver.prototype.updateShortUrl = function (updateShortUrlInput) {
        // Call the update method of the ShortUrlService to update a short URL
        return this.shortUrlService.update(updateShortUrlInput.id, updateShortUrlInput);
    };
    // Mutation resolver to remove a short URL by ID
    ShortUrlResolver.prototype.removeShortUrl = function (id) {
        // Call the remove method of the ShortUrlService to remove a short URL by ID
        return this.shortUrlService.remove(id);
    };
    __decorate([
        graphql_1.Mutation(function () { return short_url_entity_1.ShortUrl; }),
        __param(0, graphql_1.Args('createShortUrlInput'))
    ], ShortUrlResolver.prototype, "createShortUrl");
    __decorate([
        graphql_1.Query(function () { return [short_url_entity_1.ShortUrl]; }, { name: 'shortUrls' }),
        __param(0, graphql_1.Args('pageSize')),
        __param(1, graphql_1.Args('currentPage'))
    ], ShortUrlResolver.prototype, "findAll");
    __decorate([
        graphql_1.Query(function () { return short_url_entity_1.ShortUrl; }, { name: 'shortUrl' }),
        __param(0, graphql_1.Args('id', { type: function () { return graphql_1.Int; } }))
    ], ShortUrlResolver.prototype, "findOne");
    __decorate([
        graphql_1.Mutation(function () { return short_url_entity_1.ShortUrl; }),
        __param(0, graphql_1.Args('updateShortUrlInput'))
    ], ShortUrlResolver.prototype, "updateShortUrl");
    __decorate([
        graphql_1.Mutation(function () { return short_url_entity_1.ShortUrl; }),
        __param(0, graphql_1.Args('id', { type: function () { return graphql_1.Int; } }))
    ], ShortUrlResolver.prototype, "removeShortUrl");
    ShortUrlResolver = __decorate([
        graphql_1.Resolver(function () { return short_url_entity_1.ShortUrl; })
    ], ShortUrlResolver);
    return ShortUrlResolver;
}());
exports.ShortUrlResolver = ShortUrlResolver;
