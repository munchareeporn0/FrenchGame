import { MenuPage } from '../menu/menu';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the PlayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-play',
  templateUrl: 'play.html',
})
export class PlayPage {

  q_no = 0;

  questions = [
    'Question 1',
    'Question 2',
    'Question 3',
    'Question 4',
    'Question 5',
    'Question 6',
    'Question 7',
    'Question 8',
    'Question 9',
    'Question 10',
    'Question 11',
    'Question 12',
    'Question 13',
    'Question 14',
    'Question 15',
    'Question 16',
    'Question 17',
    'Question 18',
    'Question 19',
    'Question 20'
  ]

  answers = [
    [false, true, false, false],
    [false, false, true, false],
    [false, false, true, false],
    [false, false, true, false],
    [false, true, false, false],
    [false, true, false, false],
    [true, false, false, false],
    
    [false, false, false, true],
    [false, false, true, false],
    [false, true, false, false],
    [false, false, true, false],
    [false, true, false, false],
    [false, false, true, false],
    [false, false, true, false],
    [false, false, true, false],
    [false, false, true, false],
    [false, true, false, false],
    [true, false, false, false],
    [true, false, false, false],
    [false, false, false, true],
  ]

  question: number = 0;
  answer: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayPage');
  }

  verifyAnswer(choice) {
    console.log(choice, this.answers[this.q_no][choice])

    if (this.q_no < 19) { 
      this.q_no += 1; 
      // this.alert(this.answers[this.q_no][choice]);
    }
    else
      this.navCtrl.push(MenuPage);
  }

  // alert(result) {
    
  // }

  // alert(htmlClass, innerhtml) {
  //   let alert = $('.alert');
  //   let alertBox = $('.alert-box');
  //   let delay = 0;
  //   let clear = () => {
  //     alertBox.removeClass('show');
  //     setTimeout(() => {
  //       alert.removeClass(htmlClass);
  //     }, 500);
  //   }

  //   if (alertBox.hasClass('show')) {
  //     clearTimeout(this.timer);
  //     clear();
  //     delay = 500;
  //   }
  //   setTimeout(() => {
  //     alert.html(innerhtml).addClass(htmlClass);
  //     alertBox.addClass('show');
  //     this.timer = setTimeout(() => {
  //       clear();
  //     }, 3000);
  //   }, delay)
  // }
}



