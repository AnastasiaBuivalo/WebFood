function modal(){
     //Modal
     const modalBtns = document.querySelectorAll('[data-modal]'),
     modal = document.querySelector('.modal');



    function openModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    const modalTimerId = setTimeout(openModal, 3000000);

    function closeModal(){
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';

    }

    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight>=document.documentElement.scrollHeight-1){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    modalBtns.forEach(btn =>{
        btn.addEventListener('click', openModal)
    })

    //modalClosed.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) =>
    {
        if(e.target == modal || e.target.getAttribute('data-close' == ''))
            closeModal();
    })

    document.addEventListener('keydown', (e) =>
    {
        if(e.code == "Escape" && modal.classList.contains('show'))
            closeModal();
    })

    
    //const axios = require('axios').default;
    // axios.get('http://localhost:3000/menu')
    // .then(data => console.log(data));


}

module.exports = modal;