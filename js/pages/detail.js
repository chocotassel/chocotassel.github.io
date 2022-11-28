import {renderWebList} from './renderWebList.js';
import ajson from '/data/购物.json' assert { type: 'json' };

var webList = document.querySelector("#web-list-wrapper")
renderWebList(ajson, webList)

console.log(123);
