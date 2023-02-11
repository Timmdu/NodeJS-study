const opts = require('./a');
const _ = require('lodash');
const add = opts.add;
const mul = opts.mul;

console.log(add(2,3));
console.log(mul(10,30));

_.each([1,2,3,4], (item)=> {
    console.log(item);
})