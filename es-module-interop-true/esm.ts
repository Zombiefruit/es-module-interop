import thing from './commonjs/old-esm';
import thing2 from './commonjs/commonjs';

console.log('"esModuleInterop": true \n');
console.log(`The default export of a commonjs file that used to be esm: "${thing}".\n It works! \n`);
console.log(`The default export of a commonjs file: "${thing2}".\n It works!\n`);