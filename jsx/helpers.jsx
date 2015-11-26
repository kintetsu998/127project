'use strict';

module.exports = {
  'parseMiddleName'(name){
    let a = name.split(' ');
    a = a.map((b) => b.charAt(0).toUpperCase());
    a = a.join('');
    a += '.';
    return a;
  }
};
