"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.ShortUrlService = void 0;
// Import necessary modules and dependencies
var common_1 = require("@nestjs/common");
var shortUrl_helper_1 = require("../helpers/shortUrl.helper");
// Define Injectable for ShortUrlService
var ShortUrlService = /** @class */ (function () {
    // Constructor to initialize ShortUrlService with PrismaService and ConfigService
    function ShortUrlService(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
        // Get HOST_URL from environment variables and construct hostUrl for redirection
        this.hostUrl = this.configService.get('HOST_URL') + '/redirect?url=';
    }
    // Method to create a new short URL
    ShortUrlService.prototype.create = function (_a) {
        var fullUrl = _a.fullUrl;
        return __awaiter(this, void 0, Promise, function () {
            var generatedShortUrl, checkIfAlreadyExist;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, shortUrl_helper_1.ShortUrlHelper.generateShortUrl(fullUrl)];
                    case 1:
                        generatedShortUrl = _b.sent();
                        return [4 /*yield*/, this.findByShortUrl(generatedShortUrl)];
                    case 2:
                        checkIfAlreadyExist = _b.sent();
                        if (!!checkIfAlreadyExist) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.prisma.shortUrl.create({ data: { fullUrl: fullUrl, shortUrl: generatedShortUrl } })];
                    case 3: 
                    // If the short URL doesn't exist, add it as a new entry in the database
                    return [2 /*return*/, _b.sent()];
                    case 4: 
                    // If the short URL already exists, return it
                    return [2 /*return*/, checkIfAlreadyExist];
                }
            });
        });
    };
    // Method to find all short URLs with pagination
    ShortUrlService.prototype.findAll = function (pageSize, currentPage) {
        if (pageSize === void 0) { pageSize = 5; }
        if (currentPage === void 0) { currentPage = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var skip, allUrls, returnWithFullUrl;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        skip = (currentPage - 1) * pageSize;
                        return [4 /*yield*/, this.prisma.shortUrl.findMany({
                                take: pageSize,
                                skip: skip
                            })];
                    case 1:
                        allUrls = _a.sent();
                        returnWithFullUrl = allUrls.map(function (url) {
                            return __assign(__assign({}, url), { fullUrl: _this.hostUrl + url.shortUrl });
                        });
                        // Return short URLs with hostUrl appended
                        return [2 /*return*/, returnWithFullUrl];
                }
            });
        });
    };
    // Method to find a single short URL by ID
    ShortUrlService.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.shortUrl.findUnique({ where: { id: id } })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Method to find a single short URL by shortUrl
    ShortUrlService.prototype.findByShortUrl = function (shortUrl) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.shortUrl.findUnique({
                            where: { shortUrl: shortUrl }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Method to update a short URL
    ShortUrlService.prototype.update = function (id, updateShortUrlInput) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.shortUrl.update({
                            where: { id: id },
                            data: { fullUrl: updateShortUrlInput.fullUrl }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Method to remove a short URL by ID
    ShortUrlService.prototype.remove = function (id) {
        return this.prisma.shortUrl["delete"]({ where: { id: id } });
    };
    ShortUrlService = __decorate([
        common_1.Injectable()
    ], ShortUrlService);
    return ShortUrlService;
}());
exports.ShortUrlService = ShortUrlService;
