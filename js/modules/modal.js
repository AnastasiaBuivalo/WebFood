function closeModal(modalSelector){

    modal = document.querySelector(modalSelector);
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';

}

function openModal(modalSelector, modalTimerId){
    modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    if(modalTimerId)
        clearInterval(modalTimerId);
}

function modal(modalTrigger, modalSelector, modalTimerId){
     //Modal
     const modalBtns = document.querySelectorAll(modalTrigger),
     modal = document.querySelector(modalSelector);

    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight>=document.documentElement.scrollHeight-1){
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    modalBtns.forEach(btn =>{
        btn.addEventListener('click', ()=>openModal(modalSelector, modalTimerId))
    })

    //modalClosed.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) =>
    {
        if(e.target == modal || e.target.getAttribute('data-close' == ''))
            closeModal(modalSelector);
    })

    document.addEventListener('keydown', (e) =>
    {
        if(e.code == "Escape" && modal.classList.contains('show'))
            closeModal(modalSelector);
    })

    
    //const axios = require('axios').default;
    // axios.get('http://localhost:3000/menu')
    // .then(data => console.log(data));


}

//module.exports = modal;
export default modal;
export {openModal};
export {closeModal};