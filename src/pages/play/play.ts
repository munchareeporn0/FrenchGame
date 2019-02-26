import { MenuPage } from '../menu/menu';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { count } from 'rxjs/operator/count';

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
  No = 0;
  list_num:string[] = [];
  size_choice = 0;
  rand_choices:any;
  key:string;
  keepQuestions:any;
  question:any;
  answer:any;
  choices:any;
  count = 0;
  q_no = 0;
  score = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage) { 
    this.score = 0;
    this.count  = navParams.get('newCount'); 
    this.score  = navParams.get('score'); 
    this.key    = navParams.get('key');
    this.No     = navParams.get('No');
    console.log('Score from constructor = ',this.score);
    this.storage.get(this.key).then((val) => {
      this.keepQuestions = val;

      Object.keys(this.keepQuestions).forEach(element => {
        this.list_num.push(element);
      });
      // setTimeout(() => {

        if (this.count == null){                 //first Question
          this.No = this.list_num.length;
        } else {                                // the next Question
          this.q_no = navParams.get('newNo');
        }
        this.choices  = (<any>Object).values(this.keepQuestions[this.list_num[this.q_no]]['Choices']);
        
        this.size_choice = (<any>Object).values(this.keepQuestions[this.list_num[this.q_no]]['Choices']).length;
        this.rand_choices = Array(this.size_choice);
        
        for(let i = 0; i < this.size_choice; i++){
          this.rand_choices[i] = i;
        }

        this.rand_choices = this.shuffle(this.rand_choices);
        
        this.question = this.keepQuestions[this.list_num[this.q_no]]['Question'];
        this.answer   = this.keepQuestions[this.list_num[this.q_no]]['Answer'];
      // }, 300); 

    });

  }

  verifyAnswer(q_no,_choice) {

    let _score = 0;

    if(this.count != null){
      _score  = this.navParams.get('score'); 
    }
    if(_choice == 0){
      _score += 1;
      console.log('CORRECT');
    }else{
      console.log('WRONG!!');
      
    }
    
    // console.log('temp = ',_choice);
    console.log('score = ',_score);
    console.log('---------------------------');
    // console.log(this.score);
    
    // console.log('Your point = ',this.score);
    

    if (this.q_no + 1 < this.No) { 
      this.q_no += 1; 
      this.count += 1;
      this.navCtrl.push(PlayPage,{
        score:_score,
        newNo:this.q_no,
        newCount:this.count,
        key:this.key,
        No:this.No
      });
    }else{
      console.log('Your final score is ',_score);
      console.log('DONE');
    }
  }

  shuffle(array) {

    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    } 
    return array;
  }

}



