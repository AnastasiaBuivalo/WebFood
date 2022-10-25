function timer(){

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

}

module.exports = timer;