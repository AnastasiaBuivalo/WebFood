import modal from './modules/modal'
import forms from './modules/forms'
import culc from './modules/culc'
import timer from './modules/timer'
import tabs from './modules/tabs'
import cards from './modules/cards'

import {openModal} from './modules/modal'

window.addEventListener('DOMContentLoaded', () =>{

    const modalTimerId = setTimeout(()=>openModal('.modal', modalTimerId), 3000000);

    modal('[data-modal]', '.modal', modalTimerId);
    forms();
    culc();
    timer(modalTimerId);
    tabs();  
    cards();   
});


// function calc(num, basis, ...rest){
//     console.log(num, basis, rest);
// }

// calc(2, 3);

