"use strict";
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
// Import necessary modules and dependencies
var testing_1 = require("@nestjs/testing");
var short_url_resolver_1 = require("./short-url.resolver");
var short_url_service_1 = require("./short-url.service");
// Start describing the ShortUrlResolver
describe('ShortUrlResolver', function () {
    var resolver;
    var shortUrlService;
    // Set up before each test
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var module;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.Test.createTestingModule({
                        providers: [
                            short_url_resolver_1.ShortUrlResolver,
                            {
                                provide: short_url_service_1.ShortUrlService,
                                // Mock ShortUrlService methods
                                useValue: {
                                    create: jest.fn(),
                                    findAll: jest.fn(),
                                    findOne: jest.fn(),
                                    update: jest.fn(),
                                    remove: jest.fn()
                                }
                            },
                        ]
                    }).compile()];
                case 1:
                    module = _a.sent();
                    // Initialize resolver and shortUrlService
                    resolver = module.get(short_url_resolver_1.ShortUrlResolver);
                    shortUrlService = module.get(short_url_service_1.ShortUrlService);
                    return [2 /*return*/];
            }
        });
    }); });
    // Test if the resolver is defined
    it('should be defined', function () {
        expect(resolver).toBeDefined();
    });
    // Test createShortUrl resolver function
    describe('createShortUrl', function () {
        it('should call create method of ShortUrlService', function () { return __awaiter(void 0, void 0, void 0, function () {
            var createShortUrlInput, createdShortUrl, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        createShortUrlInput = {
                            shortUrl: 'abc123',
                            fullUrl: 'https://www.google.com'
                        };
                        createdShortUrl = {
                            id: 1,
                            shortUrl: 'abc123',
                            fullUrl: 'https://www.google.com',
                            createdAt: new Date(),
                            updatedAt: new Date()
                        };
                        // Mock the create method of ShortUrlService and resolve with createdShortUrl
                        jest.spyOn(shortUrlService, 'create').mockResolvedValue(createdShortUrl);
                        return [4 /*yield*/, resolver.createShortUrl(createShortUrlInput)];
                    case 1:
                        result = _a.sent();
                        // Expect result to be equal to createdShortUrl and create method to have been called with input
                        expect(result).toEqual(createdShortUrl);
                        expect(shortUrlService.create).toHaveBeenCalledWith(createShortUrlInput);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    // Test findAll resolver function
    describe('findAll', function () {
        it('should call findAll method of ShortUrlService', function () { return __awaiter(void 0, void 0, void 0, function () {
            var pageSize, currentPage, foundShortUrls, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pageSize = 10;
                        currentPage = 1;
                        foundShortUrls = [];
                        // Mock the findAll method of ShortUrlService and resolve with foundShortUrls
                        jest.spyOn(shortUrlService, 'findAll').mockResolvedValue(foundShortUrls);
                        return [4 /*yield*/, resolver.findAll(pageSize, currentPage)];
                    case 1:
                        result = _a.sent();
                        // Expect result to be equal to foundShortUrls and findAll method to have been called with pagination parameters
                        expect(result).toEqual(foundShortUrls);
                        expect(shortUrlService.findAll).toHaveBeenCalledWith(pageSize, currentPage);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    // Test findOne resolver function
    describe('findOne', function () {
        it('should call findOne method of ShortUrlService', function () { return __awaiter(void 0, void 0, void 0, function () {
            var id, foundShortUrl, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = 1;
                        foundShortUrl = {
                            id: 1,
                            shortUrl: 'abc123',
                            fullUrl: 'https://www.google.com',
                            createdAt: new Date(),
                            updatedAt: new Date()
                        };
                        // Mock the findOne method of ShortUrlService and resolve with foundShortUrl
                        jest.spyOn(shortUrlService, 'findOne').mockResolvedValue(foundShortUrl);
                        return [4 /*yield*/, resolver.findOne(id)];
                    case 1:
                        result = _a.sent();
                        // Expect result to be equal to foundShortUrl and findOne method to have been called with ID
                        expect(result).toEqual(foundShortUrl);
                        expect(shortUrlService.findOne).toHaveBeenCalledWith(id);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    // Test updateShortUrl resolver function
    describe('updateShortUrl', function () {
        it('should call update method of ShortUrlService', function () { return __awaiter(void 0, void 0, void 0, function () {
            var updateShortUrlInput, updatedShortUrl, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updateShortUrlInput = {
                            id: 1,
                            fullUrl: 'https://www.nestjs.com',
                            createdAt: new Date(),
                            updatedAt: new Date()
                        };
                        updatedShortUrl = {
                            id: 1,
                            shortUrl: 'abc123',
                            fullUrl: 'https://www.nestjs.com',
                            createdAt: new Date(),
                            updatedAt: new Date()
                        };
                        // Mock the update method of ShortUrlService and resolve with updatedShortUrl
                        jest.spyOn(shortUrlService, 'update').mockResolvedValue(updatedShortUrl);
                        return [4 /*yield*/, resolver.updateShortUrl(updateShortUrlInput)];
                    case 1:
                        result = _a.sent();
                        // Expect result to be equal to updatedShortUrl and update method to have been called with input
                        expect(result).toEqual(updatedShortUrl);
                        expect(shortUrlService.update).toHaveBeenCalledWith(updateShortUrlInput.id, updateShortUrlInput);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    // Test removeShortUrl resolver function
    describe('removeShortUrl', function () {
        it('should call remove method of ShortUrlService', function () { return __awaiter(void 0, void 0, void 0, function () {
            var id, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = 1;
                        // Mock the remove method of ShortUrlService and resolve with null (assuming successful removal)
                        jest.spyOn(shortUrlService, 'remove').mockResolvedValue(null);
                        return [4 /*yield*/, resolver.removeShortUrl(id)];
                    case 1:
                        result = _a.sent();
                        // Expect result to be null and remove method to have been called with ID
                        expect(result).toBeNull();
                        expect(shortUrlService.remove).toHaveBeenCalledWith(id);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
