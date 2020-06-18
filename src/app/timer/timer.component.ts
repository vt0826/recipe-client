import { Component } from '@angular/core';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent {
  startTime = Object;
  interval: any;
  min: number;
  sec: number;
  isTimerOn: boolean = false;

  startTimer() {
    this.isTimerOn = true;
    this.interval = setInterval(() => {
      if (this.sec > 0) {
        this.sec--;
      } else {
        if (this.min) {
          this.min--;
          this.sec = 59;
        } else {
          alert('Time is up');
          this.resetTimer();
        }
      }
    }, 1000);
  }

  pauseTimer() {
    this.isTimerOn = false;
    clearInterval(this.interval);
  }

  resetTimer() {
    this.min = null;
    this.sec = null;
    this.isTimerOn = false;
    clearInterval(this.interval);
  }
}
