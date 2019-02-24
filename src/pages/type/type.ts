import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { PlayPage } from '../play/play';
import { NativeAudio } from '@ionic-native/native-audio';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/toPromise';
import  'rxjs/add/operator/catch';


/**
 * Generated class for the TypePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-type',
  templateUrl: 'type.html',
})
export class TypePage {
  data :any;
  questions = [];
  randQuestion = [];
  key:string = "question";
  constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams,public platform: Platform,private nativeAudio: NativeAudio,private storage: Storage) {
    this.platform.ready().then(() => {
      this.nativeAudio.preloadSimple('btnSoundId1', 'src/assets/audio/avatar.wav').then((success)=>{
        console.log("success");
      },(error)=>{
        console.log(error);
      });
      this.setQuestion();
    });
  }

  setQuestion(){
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let requestOptions = new RequestOptions({ headers: headers });

    let postParams = {
      "content":{
          "Topic" : "possessive",
          "level" : "1"
        }
    }
    
    this.http.post("https://us-central1-frenchgame-228900.cloudfunctions.net/getQuestions", postParams, requestOptions).map(res => res.json()).
      
    subscribe(data => {
        this.data = data;        
        this.storage.set(this.key,this.data);  
      }) 
  }

  getData(sex:string){
    this.nativeAudio.play('btnSoundId1').then((success)=>{
      console.log("success playing");
    },(error)=>{
      console.log(error);
    });

    this.storage.get(this.key).then((val) => {
      this.data = val;
      console.log(this.data);
      var _size = Object.keys(this.data).length;
      var mark:boolean[] = new Array(_size);
      var condition:boolean;

        for(var i=0;i<20;i++){       
          var rand;
          do{
            rand = Math.floor(Math.random()*_size);
            var selected:boolean = (mark[rand] != null);
            var match_sex:boolean = (this.data[rand]['sex'] == sex);
            condition = (sex == 'WM')?(selected):(selected || !match_sex);
          } while(condition);
          mark[rand] = true;
          this.randQuestion[i] = rand;
          this.questions[i] = this.data[this.randQuestion[i]];
        }
    });

    setTimeout(() => {
      this.navCtrl.push(PlayPage,{
        noQuestions:this.randQuestion,
        listOfQuestion:this.questions
      });
    }, 1700); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TypePage');
  }

  goToPlayPage() {
    this.nativeAudio.play('btnSoundId1').then((success)=>{
      console.log("success playing");
    },(error)=>{
      console.log(error);
    });
    this.navCtrl.push(PlayPage,{
      noQuestions:this.randQuestion,
      listOfQuestion:this.questions
      });
    this.navCtrl.push(PlayPage);
  }

}
