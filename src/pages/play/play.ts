import { LoginPage } from './../login/login';
import { MenuPage } from '../menu/menu';
import { Component } from '@angular/core';
import { HttpModule, Http, Headers, RequestOptions } from '@angular/http';
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
  list_num:string[] = [];
  _correct:any[] = [];
  _wrong:any[] = [];
  _hint:any = 0;
  rand_choices:any;
  key:string;
  topic:string;
  mode:string;
  keepQuestions:any;
  question:any;
  answer:any;
  choices:any;
  disableButton:boolean[];
  disableHint:boolean;
  cmuitaccount_name:string;
  others_score:any;

  No = 0;
  size_choice = 0;
  curr_score = 1;
  count = 0;
  q_no = 0;
  score = 0;
  curr_hint = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage, public http: Http) { 
    this.score  = 0;
    this.count  = navParams.get('newCount'); 
    this.score  = navParams.get('score'); 
    this.topic  = navParams.get('topic');
    this.key    = navParams.get('key');
    this.mode   = navParams.get('mode');
    this.No     = navParams.get('No');


    
    // console.log('Score from constructor = ',this.score);

    this.storage.get('cmuitaccount_name').then((val) => {
      this.cmuitaccount_name = val;
    });

    // console.log("count = ", this.count );

    if(this.count == null){
      // console.log("XXXXXX");
      this.key = `${this.topic}_${this.mode}`;
    }
    // console.log("key = ", this.key );
    this.storage.get(this.key).then((val) => {
      this.keepQuestions = val;
      
      (<any>Object).keys(this.keepQuestions).forEach(element => {
        this.list_num.push(element);
      });

        if (this.count == null){                 //first Question
          this.No = this.list_num.length;
        } else {                                // the next Question
          this.q_no = navParams.get('newNo');
          this._correct  = navParams.get('_correct'); 
          this._wrong   = navParams.get('_wrong'); 
          this._hint   = navParams.get('_hint'); 

        }

        this.choices      = (<any>Object).values(this.keepQuestions[this.list_num[this.q_no]]['Choices']);
        this.size_choice  = (<any>Object).values(this.keepQuestions[this.list_num[this.q_no]]['Choices']).length;
        this.rand_choices = Array(this.size_choice);
      
        this.disableButton = new Array(this.size_choice);

        for(let i:number = 0; i < this.size_choice; i++){
          this.rand_choices[i] = i;
          this.disableButton[i] = false;
        }
        
        this.rand_choices = this.shuffle(this.rand_choices);
        
        this.question = this.keepQuestions[this.list_num[this.q_no]]['Question'];
        this.answer   = this.keepQuestions[this.list_num[this.q_no]]['Answer'];
        
    });

  }

  hint(){

    let dis_id:number = 0;

    if(this.curr_hint < 2){
      this.curr_hint += 1;
      while (true) {
        var rand = Math.floor(Math.random() * this.size_choice);
        if (this.disableButton[rand] == false && rand != 0) {
          this.disableButton[rand] = true;
          break;
        }
      }
      if(this.curr_hint == 2){
        this.disableHint = true;
      }
      this._hint += 1;
      this.curr_score -= 0.25;
      console.log('use HINT!');
    }else{
      console.log('no hint anymore');
    }
  }

  verifyAnswer(q_no,_choice) {

    let _score = 0;
    console.log("Your Choice = ",_choice);    

    if(this.count != null){
      _score  = this.navParams.get('score'); 
    }
    if(_choice == 0){
      _score += this.curr_score;
      this._correct.push(q_no);
      console.log("correct");
    }else{
      this._wrong.push(q_no);  
      console.log("wrong");

    }

    console.log('------------------------');

    if (this.q_no + 1 < this.No) { 
      this.q_no += 1; 
      this.count += 1;
      this.navCtrl.push(PlayPage,{
        score     :_score,
        newNo     :this.q_no,
        newCount  :this.count,
        key       :this.key,
        No        :this.No,
        _correct  :this._correct,
        _wrong    :this._wrong,
        _hint     :this._hint,
        topic     :this.topic,
        mode      :this.mode
      });
    }else{
      this.score = _score;
      console.log('----------------------------------------------')
      console.log('Your Name = ', this.cmuitaccount_name);
      console.log('Topic = ', this.topic);
      console.log('Level = ', this.mode);
      console.log('Correct = ', this._correct);
      console.log('Wrong = ', this._wrong);
      console.log('Score = ', this.score);
      // console.log('Score from func = ', _score);
      console.log('helper = ', this._hint);   
      console.log('----------------------------------------------')

      this.updateScore();
    }
  }

  updateScore(){
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let requestOptions = new RequestOptions({ headers: headers });
    this.mode = this.mode.toString();
    let postParams = {
        "content":{
        "cmuitaccount_name": this.cmuitaccount_name,
        "Topic"     : this.topic,
        "level"     : this.mode,
        "correct"   : this._correct,
        "incorrect" : this._wrong,
        "score"     : this.score,
        "helper"    : this._hint
      }
    }
    
    this.http.post("https://us-central1-frenchgame-228900.cloudfunctions.net/updateScore", postParams, requestOptions).map(res => res.json()).
      
    subscribe(data => {
        this.others_score = data; 
        console.log(this.others_score);       
    }) 
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



