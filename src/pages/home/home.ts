import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsPage} from '../settings/settings';
import { Http } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  settings = SettingsPage;
  private plaene: any;
  private kurse: string;
  private kurse_split: any[];
  private day: number;
  private day_of_week: string;
  private today: unit[];
  private week: string;

  constructor(public navCtrl: NavController,
              private http: Http) {

     this.http.get('../assets/plaene.json').subscribe(
       (res) => {
         window.localStorage.setItem('plaene', JSON.stringify(res.json()))
       },
       (err) => {console.log(err)}
     );

     this.plaene = JSON.parse(window.localStorage.getItem('plaene'));

     this.today = [];
  }

  ionViewDidLoad() {
    this.day = new Date().getDay();
    this.check_day(this.day);

    this.kurse = window.localStorage.getItem('kurse') || '';
    this.kurse_split = this.kurse.split(' ');

    if (this.kalenderwoche() % 2 == 0)
      this.week = 'B';
    else
      this.week = 'A';

    let ctx = this.plaene[this.week.toLowerCase() + '_woche'][this.day_of_week.toLowerCase()];

    for (let i = 0; i < ctx.length; i++) {
      
      let x: unit = {
        stunde: ctx[i][0],
        fach: '',
        kurs: '',
        lehrer: '',
        raum: ''
      }
      for (let j = 2; j < ctx[i].length; j++) { // 1 - 2
        let xx = (ctx[i][j].fach + ctx[i][j].kurs).toLowerCase();
  
        if (this.kurse_split.includes(xx)) {
          console.log('true');
          x.fach = ctx[i][j].fach;
          x.kurs = ctx[i][j].kurs;
          x.lehrer = ctx[i][j].lehrer;
          x.raum = ctx[i][j].raum;
  
          this.today.push(x);
          console.log(this.today);
  
          break;
        }
      }
    }
  }

  check_day(day: number): void {
    if (day == 1) 
      this.day_of_week = 'Montag'
    else if (day == 2) 
      this.day_of_week = 'Dienstag'
    else if (day == 3) 
      this.day_of_week = 'Mittwoch'
    else if (day == 4) 
      this.day_of_week = 'Donnerstag'
    else if (day == 5) 
      this.day_of_week = 'Freitag'
  }

  changes(): void {
    this.check_day(this.day);
    this.today = [];

    this.kurse = window.localStorage.getItem('kurse') || '';
    this.kurse_split = this.kurse.split(' ');

    let ctx = this.plaene[this.week.toLowerCase() + '_woche'][this.day_of_week.toLowerCase()];

    for (let i = 0; i < ctx.length; i++) {
      
      let x: unit = {
        stunde: ctx[i][0],
        fach: '',
        kurs: '',
        lehrer: '',
        raum: ''
      }
      for (let j = 2; j < ctx[i].length; j++) { // 1 - 2
        let xx = (ctx[i][j].fach + ctx[i][j].kurs).toLowerCase();
  
        if (this.kurse_split.includes(xx)) {
          console.log('true');
          x.fach = ctx[i][j].fach;
          x.kurs = ctx[i][j].kurs;
          x.lehrer = ctx[i][j].lehrer;
          x.raum = ctx[i][j].raum;
  
          this.today.push(x);
          console.log(this.today);
  
          break;
        }
      }
    }
  }

  woche_wechseln(): void {
    if (this.week == 'A') 
      this.week = 'B';
    else
      this.week = 'A';

    this.changes();
  }

  kalenderwoche(): number {
    let date = new Date();
    
    // Get thursday
    // In JavaScript the Sunday has value 0 as return value of getDay() function. 
    // So we have to order them first ascending from Monday to Sunday
    // Monday: ((1+6) % 7) = 0
    // Tuesday	((2+6) % 7) = 1
    // Wednesday:	((3+6) % 7) = 2
    // Thursday:	((4+6) % 7) = 3
    // Friday: ((5+6) % 7) = 4
    // Saturday:	((6+6) % 7) = 5
    // Sunday: ((0+6) % 7) = 6
    // (3 - result) is necessary to get the Thursday of the current week. 
    // If we want to have Tuesday it would be (1-result)
    let currentThursday = new Date(date.getTime() +(3-((date.getDay()+6) % 7)) * 86400000);
    // At the beginnig or end of a year the thursday could be in another year.
    let yearOfThursday = currentThursday.getFullYear();
    
    // Get first Thursday of the year
    let firstThursday = new Date(new Date(yearOfThursday,0,4).getTime() +(3-((new Date(yearOfThursday,0,4).getDay()+6) % 7)) * 86400000);
    
    // +1	we start with week number 1
    // +0.5 an easy and dirty way to round result (in combinationen with Math.floor)
    let weekNumber = Math.floor(1 + 0.5 + (currentThursday.getTime() - firstThursday.getTime()) / 86400000/7);
    
    return weekNumber;
  }
}

interface unit {
  stunde: string,
  fach: string,
  kurs: string,
  lehrer: string,
  raum: string
}