"use strict";
exports.__esModule = true;
var config_1 = require("@nestjs/config");
exports["default"] = config_1.registerAs('app', function () { return ({
    hostUrl: process.env.HOST_URL
}); });
