import { MenuPage } from '../menu/menu';
import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ViewChild } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio';
import { Navbar } from 'ionic-angular';
import { AnswerPage } from '../answer/answer';



/**
 * Generated class for the PlayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-play',
  templateUrl: 'play.html'
})

export class PlayPage {
  
  @ViewChild(Navbar) navBar: Navbar;

  //--------------------------------send to UpdataScore and RankingPage
  person:PlayPage.RankScore[] = [];
  verQuestion:PlayPage.VerAnswer[] = [];
  
  _correct:any[] = [];
  _wrong:any[] = [];
  rank:any;
  avatar:any;
  cmuitaccount_name:string;
  topic:string;
  mode:string;
  _hint:any = 0;
  score = 0;
  No = 0;

  //--------------------------------Color
  Color:string[] = [];
  keep_color:any;

  //--------------------------------Hint
  disableButton:boolean[];
  disableHint:boolean;
  curr_hint = 0;
  curr_score = 1;
  countHint = 2;

  //--------------------------------Use in Page
  list_num:string[] = [];
  list_answer:string[] = [];
  rand_choices:any;
  key:string;
  keep_score:any;
  keepQuestions:any;
  question:any;
  answer:any;
  choices:any;
  others_score:any;
  status:any;
  correct_update:any;
  
  dis_btn = 0;
  count = 0;
  q_no = 0;
  size_choice = 0;
  correct:boolean = false;
  wrong:boolean = false;

  loading:boolean = false;  
  showAlertMessage: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,private Alert: AlertController,public nav: NavController
    , private storage: Storage, public http: Http, private nativeAudio: NativeAudio, public platform: Platform) { 
    this.nav = nav;
    this.platform.ready().then(() => {     //Load button sound 
      this.nativeAudio.preloadSimple('btnSoundCorrect', 'src/assets/audio/correct.wav')
      this.nativeAudio.preloadSimple('btnSoundInCorrect', 'src/assets/audio/incorrect.mp3')
    });

    this.Color = [];
     for(let i = 0; i < this.size_choice; i++){   //color
       this.Color.push('#48508e');
     } 

    
    //-----------------------------------------get Value from PlayPage and Storage
    this.score  = 0;
    this.count  = navParams.get('newCount'); 
    this.score  = navParams.get('score'); 
    this.topic  = navParams.get('topic');
    this.key    = navParams.get('key');
    this.mode   = navParams.get('mode');
    this.No     = navParams.get('No');

    this.storage.get('cmuitaccount_name').then((val) => {
      this.cmuitaccount_name = val;
    });

    this.storage.get('avatar').then((val) => {
      this.avatar = `assets/imgs/${val}.png`;
    });


    if(this.count == null){     //first question
      this.key = `${this.topic}_${this.mode}`;
    }

    this.storage.get(this.key).then((val) => {
      this.keepQuestions = val;
      (<any>Object).keys(this.keepQuestions).forEach(element => {
        this.list_num.push(element);
      });

        if (this.count == null){                 //first Question
          this.No = this.list_num.length;
        } else {                                // the next Question
          this.q_no     = navParams.get('newNo');
          this._correct = navParams.get('_correct'); 
          this._wrong   = navParams.get('_wrong'); 
          this._hint    = navParams.get('_hint'); 
          this.list_answer = navParams.get('answer');
        }

        this.choices       = (<any>Object).values(this.keepQuestions[this.list_num[this.q_no]]['Choices']);
        this.size_choice   = (<any>Object).values(this.keepQuestions[this.list_num[this.q_no]]['Choices']).length;
        this.rand_choices  = Array(this.size_choice);

        
        
        this.disableButton = new Array(this.size_choice);     //hint

        for(let i:number = 0; i < this.size_choice; i++){
          this.rand_choices[i]  = i;
          this.disableButton[i] = false;
        }


        this.rand_choices = this.shuffle(this.rand_choices); 
        this.question     = this.keepQuestions[this.list_num[this.q_no]]['Question'];
        this.answer       = this.keepQuestions[this.list_num[this.q_no]]['Answer'];
       
    });

  }

  verifyAnswer(q_no,_choice) {
    
    let _score = 0;
    this.dis_btn += 1;
    // console.log('choose = ', _choice);
    // console.log(this.choices[_choice]);
    this.list_answer.push(this.choices[_choice]);

    if(this.dis_btn == 1){
      for(let i = 0; i < this.size_choice; i++){
          this.disableButton[i] = true;
      }
    }

    if(this.count != null){
      _score  = this.navParams.get('score'); 
    }

    //-----------------------------------------------------

    if(_choice == 0){  //Correct Answer
      this.correct = true;
       this.Color = []; 
      for(let i = 0; i < this.size_choice;i++){  //color
        if(i == 0){
          this.Color.push('#00b300');
        }else{
          this.Color.push('#48508e');
        }        
      }

      this.nativeAudio.play('btnSoundCorrect').then((success)=>{      //Sound Effect for Correct
        console.log("success playing");
      },(error)=>{
        console.log(error);
      });

      _score += this.curr_score;
      this._correct.push(q_no);
      // console.log("correct");

    }else{            //Incorrect Answer
      this.wrong = true;
      this.Color = [];
      for(let i = 0; i < this.size_choice; i++){
        if(i == _choice){
          this.Color.push('#ff3333');
        }else{
          this.Color.push('#48508e');
        } 
      }
      

      this.nativeAudio.play('btnSoundInCorrect').then((success)=>{    //Sound Effect for Incorrect
        console.log("success playing");
      },(error)=>{
        console.log(error);
      });

      this._wrong.push(q_no);  
    }

      if (this.q_no + 1 < this.No) {  
        this.count += 1;
        setTimeout(() => {
          this.q_no += 1;
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
            mode      :this.mode,
            answer    :this.list_answer
          });
        }, 800); 
    }else{
      this.loading = true;
      this.score = _score;
        this.updateScore();
    }
  }

  updateScore(){

    let key_update:any;
    let keep:any [] = []
    let set:any;
    key_update = `${this.topic}_lv${this.mode}_correct`;

    this.storage.get(key_update).then((val) => {
      
        Object.keys(val).forEach(function(key) {
          keep.push(val[key]);
        });
      this.correct_update = this._correct.concat(keep);

      set = new Set(this.correct_update);
      this.correct_update = Array.from(set.values());
      this.correct_update = this.bubbleSort_topic(this.correct_update);

      this.storage.set(key_update,this.correct_update);

    });

    this.mode = this.mode.toString();

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let requestOptions = new RequestOptions({ headers: headers });

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
          let score = `lv${this.mode}_score`;
            this.others_score = data;
            (<any>Object).keys(this.others_score[this.topic]).forEach(element => {

              if(this.others_score[this.topic][element][score] > 0){
                let newPerson : PlayPage.RankScore = {
                    name   : element,
                    avatar : `assets/imgs/${this.others_score[this.topic][element]["avatar"]}.png`,
                    score  : this.others_score[this.topic][element][score],
                    rank   : 0
                }
                this.person.push(newPerson);
              }
              
            }); 

          this.person = this.bubbleSort(this.person);
          
          for(let i = 0; i < this.person.length; i++){
            if(this.person[i].name == this.cmuitaccount_name){
              this.rank = i + 1;
            }
            this.person[i].rank = i + 1;
          }

          let size = this._correct.length + this._wrong.length;
          let check_answer:any[] = new Array(size);

          this._correct.forEach(element => {
            check_answer[element] = 1
          });
          this._wrong.forEach(element => {
            check_answer[element] = 0
          });
          
          let temp = 0;

          this.list_num.forEach(element => {
            let newVarQuestion : PlayPage.VerAnswer = {
              num : temp + 1,
              question : this.keepQuestions[element]['Question'],
              answer : this.keepQuestions[element]['Answer'],
              correctChoice:this.keepQuestions[element]['Choices'][0],
              pickChoice:this.list_answer[temp],
              check:check_answer[temp]
            }
            this.verQuestion.push(newVarQuestion);
            temp += 1;
          });

          this.loading = false;

          this.navCtrl.push(AnswerPage,{
            score             :this.score,
            rank              :this.rank,
            person            :this.person,
            size_choice       :this.No,
            avatar            :this.avatar,
            verQuestion       :this.verQuestion
          });   
         

      }
      ,err =>{

        this.status = err.status

          let alert = this.Alert.create({
            title: 'Oops! Sorry :(',
            message: 'An error occurred. Please try again later',
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  this.navCtrl.push(MenuPage);
                }
              }
            ]
          });
          alert.present(alert);
      })
    
  }

  hint(){

    if(this.curr_hint < 2){
      this.curr_hint += 1;

      while (true) {
        var rand = Math.floor(Math.random() * this.size_choice);
        if (this.disableButton[rand] == false && rand != 0) {
          this.disableButton[rand] = true;
          break;
        }
      }
      this.countHint -= 1;
      if(this.curr_hint == 2){
        this.disableHint = true;
      }

      this._hint += 1;
      this.curr_score -= 0.25;
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

  bubbleSort(array: PlayPage.RankScore[]): PlayPage.RankScore[] {
    array = array.slice(); // creates a copy of array
  
    for(let i = 0; i < array.length; i++) {
        for(let j = 0; j < array.length - 1; j++) {
  
            if(array[j].score < array[j + 1].score) {
                let swap = array[j];
                array[j] = array[j + 1];
                array[j + 1] = swap;
            }
        }
    }
    return array;
  }

  bubbleSort_topic (array: number[]): number[] {
    array = array.slice(); // creates a copy of the array

    for(let i = 0; i < array.length; i++) {
        for(let j = 0; j < array.length - 1; j++) {

            if(array[j] > array[j + 1]) {
                let swap = array[j];
                array[j] = array[j + 1];
                array[j + 1] = swap;
            }
        }
    }
    return array;
}
  
  ionViewDidLoad() {
    this.setBackButtonAction()
  }

  setBackButtonAction(){
    this.navBar.backButtonClick = () => {
      this.navCtrl.push(MenuPage);
    }
  }
  

}

export module PlayPage {
  export class RankScore {
    name:any;
    avatar:any;
    score:any;
    rank:any;
  }
}

export module PlayPage {
  export class VerAnswer {
    num:any;
    question:any;
    answer:any;
    correctChoice:any;
    pickChoice:any;
    check:any;
  }
}
