import { ModePage } from './../mode/mode';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/toPromise';
import  'rxjs/add/operator/catch';
import { StudyPage } from '../study/study';

/**
 * Generated class for the StudyModePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-study-mode',
  templateUrl: 'study-mode.html',
})
export class StudyModePage {
  verQues:StudyModePage.Question[] = [];
  disableButton:boolean [] = [];
  list_num:string[] = [];
  
  _correct:any;
  keepQuestions:any;
  topic:string;
  data :any;
  key_question:string;
  check_Q:any;
  key:any;
  key_topic:any;
  label:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public platform: Platform,private nativeAudio: NativeAudio, public http: Http,private storage: Storage) {
    this.disableButton = [false,false,false];
    this.platform.ready().then(() => {
      this.nativeAudio.preloadSimple('btnSoundId1', 'src/assets/audio/ding.mp3').then((success)=>{
        console.log("success");
      },(error)=>{
        console.log(error);
      });
    });

    this.topic = navParams.get('topic');
    this.label = navParams.get('label');

    for(let i = 0; i < 3; i++){
      this.key = `${this.topic}_${i + 1}`;
      this.storage.get(this.key).then((val) => {
        if(val == null || val == 'undefined'){
          this.check_Q = [];
        }else{
          this.check_Q = (<any>Object).keys(val);
        }
        if(this.check_Q[0] == null){
          this.disableButton[i] = true;
        }
      });
    }    
  }

  goToStudyPage(_mode:string){
    this.key_topic = `${this.topic}_lv${_mode}_correct`;  
    this.key_question = `${this.topic}_${_mode}`;
    this.nativeAudio.play('btnSoundId1');

    this.storage.get(this.key_question).then((val) => {
      this.keepQuestions = val;
      (<any>Object).keys(this.keepQuestions).forEach(element => {
        this.list_num.push(element);
      });

      let size = this.list_num.length;
      let check_answer:any[] = new Array(size);

      for(let i = 0; i < size; i++){
        check_answer[i] = 0;
      }

      this.storage.get(this.key_topic).then((val) => {
        this._correct = val;   
        this._correct.forEach(element => {
          check_answer[element] = 1
        });

        let temp = 0;
        this.verQues = [];

        this.list_num.forEach(element => {
          let newQues : StudyModePage.Question = {
            num:  temp + 1,
            question: this.keepQuestions[element]['Question'],
            answer:this.keepQuestions[element]['Answer'],
            correctChoice: this.keepQuestions[element]['Choices'][0],
            description: this.keepQuestions[element]['Description'],
            check: check_answer[temp],
          }
          this.verQues.push(newQues);
          temp += 1;
        });
         this.list_num = [];
         this.navCtrl.push(StudyPage,{
          topic:this.topic, 
          key  :this.key_topic,
          label:this.label,
          mode :_mode,
          varQues : this.verQues,
          size : size
        });

      }); 

     
     
    });

  

  }
}

export module StudyModePage {
  export class Question {
    num:any;
    question:any;
    answer:any;
    correctChoice:any;
    description:any;
    check:any;
  }
}

