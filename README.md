# esModuleInterop

It's confusing. It's weird.

Maybe this will make it simpler.

## See it in action

Run `yarn`. Then run `yarn esm-true`, and `yarn esm-false`. Check the console.

What's the difference? It's just a function that typescript creates. You can see it in the compiled `esm.js` files that are created by running the above commands.

With `esModuleInterop: false`:

**Source**

``` ts
import thing from './commonjs/old-esm';
import thing2 from './commonjs/commonjs';

console.log('"esModuleInterop": false \n');
console.log(`The default export of a commonjs file that used to be esm: "${thing}".\n It works! \n`);
console.log(`The default export of a commonjs file: "${thing2}".\n It doesn't work :(. The original commonjs file never had the concept of a default export.\n`);

```

**Compiled**

``` js
// Typescript marks the file with "__esModule" to indicate that the file used to be esm
Object.defineProperty(exports, "__esModule", { value: true });
var old_esm_1 = require("./commonjs/old-esm");
var commonjs_1 = require("./commonjs/commonjs");
console.log('"esModuleInterop": false \n');
console.log("The default export of a commonjs file that used to be esm: \"" + old_esm_1.default + "\".\n It works! \n");
console.log("The default import of a commonjs file: \"" + commonjs_1.default + "\".\n It doesn't work :(\n");
```

All Typescript knows is that, in the source (.ts) file, we're asking for the default export. So it naively adds `.default` at the end of the imports, not knowing that the commonjs file doesn't have a default export.

With `esModuleInterop: true`:

**Source**

Same code as before:

``` ts
import thing from './commonjs/old-esm';
import thing2 from './commonjs/commonjs';

console.log('"esModuleInterop": true \n');
console.log(`The default export of a commonjs file that used to be esm: "${thing}".\n It works! \n`);
console.log(`The default export of a commonjs file: "${thing2}".\n It works!\n`);

```

**Compiled**

``` js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var old_esm_1 = __importDefault(require("./commonjs/old-esm"));
var commonjs_1 = __importDefault(require("./commonjs/commonjs"));
console.log('"esModuleInterop": true \n');
console.log("The default export of a commonjs file that used to be esm: \"" + old_esm_1.default + "\".\n It works! \n");
console.log("The default import of a commonjs file: \"" + commonjs_1.default + "\".\n It works!\n");
```

The big difference: `__importDefault`. Typescript creates this simple method, which simply checks whether the module used to be an `__esModule`. If it was, it simply returns the module. But if the file was originally commonjs (wasn't an `__esModule`), typescript takes the module and wraps it with: `{ "default": mod }`.

So now we can be sure that `module.default` is defined no matter what.

Simplified a little:

``` js
const importDefault = function (module) {
  if (module.__esModule) {
    return module;
  } else {
    return { 'default': module }
  }
};

const myImportedModule = importDefault(require("./some-module"));
// myImportedModule = { default: module_code }
```
