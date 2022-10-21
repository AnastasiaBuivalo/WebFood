window.addEventListener('DOMContentLoaded', () =>{

    //tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

        //скрыть ненужные табы
        function hideTabContent(){
            tabsContent.forEach(item => {
                item.classList.add('hide');
                item.classList.remove('show', 'fade');
            });

            //удаляем классы активности
            tabs.forEach(item => {
                item.classList.remove('tabheader__item_active');
            });
        }


        //показываем таб
        function showTabContent(i = 0){
            tabsContent[i].classList.add('show', 'fade');
            tabsContent[i].classList.remove('hide');
            tabs[i].classList.add('tabheader__item_active');
        }

        hideTabContent();
        showTabContent();

        tabsParent.addEventListener('click', (event) =>{
            const target = event.target;

            if(target && target.classList.contains('tabheader__item')){
                tabs.forEach((item, i)=>{
                    if(item == target){
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });


        //timer

        const deadline = '2022-09-01';
        function getTimerRemaining(deadline){
            const total = Date.parse(deadline) - Date.parse(new Date());
            if(total <= 0){
                    days = 0,
                    hours = 0,
                    minutes = 0,
                    seconds = 0;
            }
            else{
                  days = Math.floor(total/(1000*60*60*24)),
                  hours = Math.floor((total/(1000*60*60))%24),
                  minutes = Math.floor((total/(1000*60))%60),
                  seconds = Math.floor(total/1000%60);
            }
            return{
                'total': total,
                'days':days,
                'hours': hours, 
                'minutes': minutes,
                'seconds': seconds
            }
        }

        function getZero(num){
            if(num >= 0 && num < 10)
                return `0${num}`;
            return num;
        }

        function setTimer(selector, deadline){
            const timer = document.querySelector(selector);
            let days = timer.querySelector('#days');
            let hours = timer.querySelector('#hours');
            let minutes = timer.querySelector('#minutes');
            let seconds = timer.querySelector('#seconds');

            let timerInterval = setInterval(updateTimer, 1000);

            updateTimer();
            function updateTimer(){
                const time = getTimerRemaining(deadline);
                days.innerHTML = getZero(time.days);
                hours.innerHTML =  getZero(time.hours);
                minutes.innerHTML =  getZero(time.minutes);
                seconds.innerHTML =  getZero(time.seconds);

                if (time.total <= 0)
                    clearInterval(timerInterval);
            }
        }

        setTimer('.timer', deadline);



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

        class MenuCard{
            constructor(src, alt, title, descr, price, transfer, parentSelector, ...classes){
                this.src = src;
                this.alt = alt;
                this.title = title;
                this.descr = descr;
                this.price = price;
                this.transfer = transfer;
                this.classes = classes.length ? classes : ['menu__item'];
                console.log(this.classes);
                this.price = this.changeToRub();
                this.parent = document.querySelector(parentSelector);

            }

            changeToRub(){
                return this.price*this.transfer;
            }

            render(){
               const element = document.createElement('div');
               this.classes.forEach(className=> element.classList.add(className));
               element.innerHTML = `
               <img src=${this.src} alt=${this.alt}>
               <h3 class="menu__item-subtitle">${this.title}</h3>
               <div class="menu__item-descr">${this.descr}</div>
               <div class="menu__item-divider"></div>
               <div class="menu__item-price">
                   <div class="menu__item-cost">Цена:</div>
                   <div class="menu__item-total"><span>${this.price}</span> р/день</div>
               </div>
            </div>`;
                this.parent.append(element);
            }
        }

        new MenuCard( 
            "img/tabs/vegy.jpg",
            "vegy",
            'Меню "Фитнес"',
            'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
            9,
            56,
            ".menu .container",
            "menu__item"
        ).render();


        new MenuCard(
            "img/tabs/post.jpg",
            "post",
            'Меню "Постное"',
            'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
            14,
            56,
            ".menu .container",
            "menu__item"
        ).render();

         new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        56,
        ".menu .container",
        ).render();

    //SERVER
    const forms = document.querySelectorAll('form');
    forms.forEach(item=>{
        postData(item);
    });

    const message = {
        loading: 'img/load/spinner.svg',
        success: 'Успешно! Мы скоро вам перезвоним',
        failure: 'Упс... Что-то пошло не так'
    };

    function postData(form){
        form.addEventListener("submit", (e)=>{
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            //statusMessage.classList.add('status');
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;`;
            //statusMessage.textContent = message.loading;
            form.insertAdjacentElement('afterend', statusMessage);
            //form.append(statusMessage);

            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');
            // request.setRequestHeader('Content-type', 'application/json; charset:utf-8');
            
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });

            fetch('server.php',{
                method: 'POST',
                body: JSON.stringify(object),
                headers: {
                    'Content-type': 'application/json'
                } 
            }).then((data)=>{
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(()=>{
                showThanksModal(message.failure);
            }).finally( () => form.reset());

            
        });
    };

    function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add("hide");
        openModal();
        
        const thanksModal = document.createElement('div');
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);

        setTimeout(()=>{
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }


});

// function calc(num, basis, ...rest){
//     console.log(num, basis, rest);
// }

// calc(2, 3);

