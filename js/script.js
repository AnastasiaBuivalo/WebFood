window.addEventListener('DOMContentLoaded', () =>{
    const modal = require('./modules/modal'),
          forms = require('./modules/forms'),
          culc = require('./modules/culc'),
          timer = require('./modules/timer'),
          tabs = require('./modules/timer'),
          cards = require('./modules/cards');

    modal();
    forms();
    culc();
    timer();
    tabs();  
    cards();   
});


// function calc(num, basis, ...rest){
//     console.log(num, basis, rest);
// }

// calc(2, 3);

