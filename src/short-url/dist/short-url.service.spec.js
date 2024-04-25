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
var config_1 = require("@nestjs/config");
var prisma_service_1 = require("../prisma/prisma.service");
var shortUrl_helper_1 = require("../helpers/shortUrl.helper");
var short_url_service_1 = require("./short-url.service");
// Mock dependencies
jest.mock('@nestjs/config');
jest.mock('../prisma/prisma.service');
jest.mock('../helpers/shortUrl.helper');
// Start describing the ShortUrlService
describe('ShortUrlService', function () {
    var service;
    var prismaServiceMock;
    var configServiceMock;
    var shortUrlHelperMock;
    // Set up before each test
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var module;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.Test.createTestingModule({
                        providers: [
                            short_url_service_1.ShortUrlService,
                            {
                                provide: prisma_service_1.PrismaService,
                                // Mock PrismaService methods
                                useValue: {
                                    shortUrl: {
                                        findMany: jest.fn(),
                                        findUnique: jest.fn(),
                                        create: jest.fn(),
                                        update: jest.fn(),
                                        "delete": jest.fn()
                                    }
                                }
                            },
                            {
                                provide: config_1.ConfigService,
                                // Mock ConfigService methods
                                useValue: {
                                    get: jest.fn()
                                }
                            },
                        ]
                    }).compile()];
                case 1:
                    module = _a.sent();
                    // Initialize service and mocks
                    service = module.get(short_url_service_1.ShortUrlService);
                    prismaServiceMock = module.get(prisma_service_1.PrismaService);
                    configServiceMock = module.get(config_1.ConfigService);
                    shortUrlHelperMock = shortUrl_helper_1.ShortUrlHelper;
                    return [2 /*return*/];
            }
        });
    }); });
    // Test if the service is defined
    it('should be defined', function () {
        expect(service).toBeDefined();
    });
    // Test create method of ShortUrlService
    describe('create', function () {
        it('should create a new short URL if it does not already exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var createShortUrlInput, generatedShortUrl, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        createShortUrlInput = { fullUrl: 'example.com' };
                        generatedShortUrl = 'abc123';
                        // Mock generateShortUrl method of ShortUrlHelper and resolve with generatedShortUrl
                        shortUrlHelperMock.generateShortUrl.mockResolvedValue(generatedShortUrl);
                        // Mock findUnique method of ShortUrlService to return null (assuming short URL does not exist)
                        prismaServiceMock.shortUrl.findUnique.mockResolvedValue(null);
                        // Mock create method of ShortUrlService and resolve with created short URL
                        prismaServiceMock.shortUrl.create.mockResolvedValue(__assign(__assign({}, createShortUrlInput), { shortUrl: generatedShortUrl }));
                        return [4 /*yield*/, service.create({ fullUrl: 'example.com' })];
                    case 1:
                        result = _a.sent();
                        // Expect result to be equal to created short URL and methods to have been called with correct parameters
                        expect(result).toEqual(__assign(__assign({}, createShortUrlInput), { shortUrl: generatedShortUrl }));
                        expect(shortUrlHelperMock.generateShortUrl).toHaveBeenCalledWith(createShortUrlInput.fullUrl);
                        expect(prismaServiceMock.shortUrl.findUnique).toHaveBeenCalledWith({ where: { shortUrl: generatedShortUrl } });
                        expect(prismaServiceMock.shortUrl.create).toHaveBeenCalledWith({ data: __assign(__assign({}, createShortUrlInput), { shortUrl: generatedShortUrl }) });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return existing short URL if it already exists', function () { return __awaiter(void 0, void 0, void 0, function () {
            var createShortUrlInput, existingShortUrl, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        createShortUrlInput = { fullUrl: 'https://example.com' };
                        existingShortUrl = { id: 1, shortUrl: 'abc123', fullUrl: 'https://example.com' };
                        // Mock generateShortUrl method of ShortUrlHelper and resolve with existing short URL
                        shortUrlHelperMock.generateShortUrl.mockResolvedValue(existingShortUrl.shortUrl);
                        // Mock findUnique method of ShortUrlService and resolve with existing short URL
                        prismaServiceMock.shortUrl.findUnique.mockResolvedValue(existingShortUrl);
                        return [4 /*yield*/, service.create({ fullUrl: createShortUrlInput.fullUrl })];
                    case 1:
                        result = _a.sent();
                        // Expect result to be equal to existing short URL and methods to have been called with correct parameters
                        expect(result).toEqual(existingShortUrl);
                        expect(shortUrlHelperMock.generateShortUrl).toHaveBeenCalledWith(createShortUrlInput.fullUrl);
                        expect(prismaServiceMock.shortUrl.findUnique).toHaveBeenCalledWith({ where: { shortUrl: existingShortUrl.shortUrl } });
                        expect(prismaServiceMock.shortUrl.create).not.toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
