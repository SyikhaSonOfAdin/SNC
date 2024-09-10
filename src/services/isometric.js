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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isometricServices = void 0;
var isometric_1 = require("../models/isometric");
var db_1 = require("../config/db");
var uuid_1 = require("uuid");
exports.isometricServices = {
    add: {
        onlyOne: function (projectId, isoNo, lineNo, userId, connection) { return __awaiter(void 0, void 0, void 0, function () {
            var CONNECTION, _a, id, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = connection;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, db_1.SNC.getConnection()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        CONNECTION = _a;
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, 6, 7]);
                        id = (0, uuid_1.v4)();
                        return [4 /*yield*/, CONNECTION.query(isometric_1.isometricQuerys.insert, [id, projectId, isoNo, lineNo, userId])];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        error_1 = _b.sent();
                        throw error_1;
                    case 6:
                        if (!connection && CONNECTION) {
                            CONNECTION.release();
                        }
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        }); },
        upload: function (projectId, userId, arrayOfData, connection) { return __awaiter(void 0, void 0, void 0, function () {
            var CONNECTION, _a, errorLog, errorOccured, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = connection;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, db_1.SNC.getConnection()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        CONNECTION = _a;
                        errorLog = [];
                        errorOccured = 0;
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 9, 10, 11]);
                        if (!!connection) return [3 /*break*/, 5];
                        return [4 /*yield*/, CONNECTION.beginTransaction()];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: return [4 /*yield*/, Promise.all(arrayOfData.map(function (items) { return __awaiter(void 0, void 0, void 0, function () {
                            var id, error_3;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        id = (0, uuid_1.v4)();
                                        return [4 /*yield*/, CONNECTION.query(isometric_1.isometricQuerys.insert, [id, projectId, items.ISO_NO, items.LINE_NO, userId])];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        error_3 = _a.sent();
                                        errorLog.push({ no: errorOccured++, message: error_3.message });
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); }))];
                    case 6:
                        _b.sent();
                        if (!!connection) return [3 /*break*/, 8];
                        return [4 /*yield*/, CONNECTION.commit()];
                    case 7:
                        _b.sent();
                        _b.label = 8;
                    case 8: return [2 /*return*/, {
                            successRate: "".concat(((arrayOfData.length - errorOccured) / arrayOfData.length * 100).toFixed(2), "%"),
                            // errorLog
                        }];
                    case 9:
                        error_2 = _b.sent();
                        throw error_2;
                    case 10:
                        if (!connection && CONNECTION) {
                            CONNECTION.release();
                        }
                        return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        }); }
    },
    delete: {
        all: function (projectId, connection) { return __awaiter(void 0, void 0, void 0, function () {
            var CONNECTION, _a, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = connection;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, db_1.SNC.getConnection()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        CONNECTION = _a;
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, 6, 7]);
                        return [4 /*yield*/, CONNECTION.query(isometric_1.isometricQuerys.delete.all, [projectId])];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        error_4 = _b.sent();
                        throw error_4;
                    case 6:
                        if (!connection && CONNECTION) {
                            CONNECTION.release();
                        }
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        }); },
        onlyOne: function (isometricId, connection) { return __awaiter(void 0, void 0, void 0, function () {
            var CONNECTION, _a, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = connection;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, db_1.SNC.getConnection()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        CONNECTION = _a;
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, 6, 7]);
                        return [4 /*yield*/, CONNECTION.query(isometric_1.isometricQuerys.delete.onlyOne, [isometricId])];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        error_5 = _b.sent();
                        throw error_5;
                    case 6:
                        if (!connection && CONNECTION) {
                            CONNECTION.release();
                        }
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        }); }
    },
    edit: function (isoNo, lineNo, userId, isoId, connection) { return __awaiter(void 0, void 0, void 0, function () {
        var CONNECTION, _a, error_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = connection;
                    if (_a) return [3 /*break*/, 2];
                    return [4 /*yield*/, db_1.SNC.getConnection()];
                case 1:
                    _a = (_b.sent());
                    _b.label = 2;
                case 2:
                    CONNECTION = _a;
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, 6, 7]);
                    return [4 /*yield*/, CONNECTION.query(isometric_1.isometricQuerys.update, [isoNo, lineNo, userId, isoId])];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 7];
                case 5:
                    error_6 = _b.sent();
                    throw error_6;
                case 6:
                    if (!connection && CONNECTION) {
                        CONNECTION.release();
                    }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); },
    get: function (projectId, page, perPage, connection) { return __awaiter(void 0, void 0, void 0, function () {
        var CONNECTION, _a, data, error_7;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = connection;
                    if (_a) return [3 /*break*/, 2];
                    return [4 /*yield*/, db_1.SNC.getConnection()];
                case 1:
                    _a = (_b.sent());
                    _b.label = 2;
                case 2:
                    CONNECTION = _a;
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, 6, 7]);
                    return [4 /*yield*/, CONNECTION.query(isometric_1.isometricQuerys.get, [projectId, perPage, page * perPage])];
                case 4:
                    data = (_b.sent())[0];
                    return [2 /*return*/, data];
                case 5:
                    error_7 = _b.sent();
                    throw error_7;
                case 6:
                    if (!connection && CONNECTION) {
                        CONNECTION.release();
                    }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); }
};
