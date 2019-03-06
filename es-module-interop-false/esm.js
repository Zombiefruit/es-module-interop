"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var old_esm_1 = require("./commonjs/old-esm");
var commonjs_1 = require("./commonjs/commonjs");
console.log('"esModuleInterop": false \n');
console.log("The default export of a commonjs file that used to be esm: \"" + old_esm_1.default + "\".\n It works! \n");
console.log("The default import of a commonjs file: \"" + commonjs_1.default + "\".\n It doesn't work :(\n");
