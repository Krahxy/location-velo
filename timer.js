class Timer {
    
    setData(startMinutes, startSeconds, targetCd) {
        this.time = startMinutes * 60 + startSeconds;
        this.countdownEl = document.getElementById(targetCd);
    }

    runTimer() {
        this.myTimer = setInterval(function() {
            this.updateCountdown();
        }.bind(this), 1000);
    }

    updateCountdown() {
        this.minutes = Math.floor(this.time / 60);
        this.seconds = this.time % 60;

        this.seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds;

        this.countdownEl.innerHTML = this.minutes + ':' + this.seconds;
        sessionStorage.setItem('seconds', this.seconds);
        sessionStorage.setItem('minutes', this.minutes);
        this.time--;

        if (this.minutes == "0" && this.seconds == "00") {
            clearInterval(this.myTimer);
        };

    };

    stop() {
        clearInterval(this.myTimer);
    };

}