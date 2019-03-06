"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var old_esm_1 = __importDefault(require("./commonjs/old-esm"));
var commonjs_1 = __importDefault(require("./commonjs/commonjs"));
console.log('"esModuleInterop": true \n');
console.log("The default export of a commonjs file that used to be esm: \"" + old_esm_1.default + "\".\n It works! \n");
console.log("The default import of a commonjs file: \"" + commonjs_1.default + "\".\n It works!\n");
