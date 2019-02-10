import { MenuPage } from '../menu/menu';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
  key:string = 'question';
  noQuestions:any;
  keepQuestions:any;
  question:any;
  answer:any;
  choice1:any;
  choice2:any;
  choice3:any;
  choice4:any;
  randChoice = [0,1,2,3];
  count = 0;
  q_no = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage) {  

    this.count= navParams.get('newCount');
    
    
    if(this.count == null){

      this.keepQuestions = navParams.get('listOfQuestion');
      this.noQuestions = navParams.get('noQuestions');

      this.storage.set('randQuestions',this.keepQuestions);

      this.question = this.keepQuestions[this.q_no]['question'];
      this.answer = this.keepQuestions[this.q_no]['answer'];
      this.choice1 = this.keepQuestions[this.q_no]['choices'][0];
      this.choice2 = this.keepQuestions[this.q_no]['choices'][1];
      this.choice3 = this.keepQuestions[this.q_no]['choices'][2];
      this.choice4 = this.keepQuestions[this.q_no]['choices'][3];
      
    }else{

      this.q_no = navParams.get('newNo');

      this.storage.get('randQuestions').then((val) => {
        this.keepQuestions = val;
        this.question = this.keepQuestions[this.q_no]['question'];
        this.answer = this.keepQuestions[this.q_no]['answer'];
        this.choice1 = this.keepQuestions[this.q_no]['choices'][0];
        this.choice2 = this.keepQuestions[this.q_no]['choices'][1];
        this.choice3 = this.keepQuestions[this.q_no]['choices'][2];
        this.choice4 = this.keepQuestions[this.q_no]['choices'][3];
      });
    }

  }

  verifyAnswer(q_no) {

    if (this.q_no < 19) { 
      this.q_no += 1; 
      this.count += 1;
      this.navCtrl.push(PlayPage,{
        newNo:this.q_no,
        newCount:this.count
      });
    }
    else
      console.log('DONE');
  }

}



