import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import { PlayPage } from '../play/play';
import { NativeAudio } from '@ionic-native/native-audio';
import { TypePage } from '../type/type';
import { HttpModule, Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/toPromise';
import  'rxjs/add/operator/catch';

/**
 * Generated class for the ModePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mode',
  templateUrl: 'mode.html',
})
export class ModePage {
  data :any;
  key:string = "question";
  constructor(public navCtrl: NavController, public navParams: NavParams,public platform: Platform,private nativeAudio: NativeAudio, public http: Http,private storage: Storage) {
    this.platform.ready().then(() => {
      this.nativeAudio.preloadSimple('btnSoundId1', 'src/assets/audio/ding.mp3').then((success)=>{
        console.log("success");
      },(error)=>{
        console.log(error);
      });
      // this.setQuestion();
    });
  }

  // setQuestion(){
  //   var headers = new Headers();
  //   headers.append("Accept", 'application/json');
  //   headers.append('Content-Type', 'application/json' );
  //   let requestOptions = new RequestOptions({ headers: headers });

  //   let postParams = {
  //     "content":{
  //         "Topic" : "possessive",
  //         "level" : "1"
  //       }
  //   }
    
  //   this.http.post("https://us-central1-frenchgame-228900.cloudfunctions.net/getQuestions", postParams, requestOptions).map(res => res.json()).
      
  //   subscribe(data => {
  //       this.data = data;        
  //       this.storage.set(this.key,this.data);  
  //     }) 
  // }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ModePage');
  }

  goToTypePage(){
    this.nativeAudio.play('btnSoundId1').then((success)=>{
      console.log("success playing");
    },(error)=>{
      console.log(error);
    });
    this.navCtrl.push(TypePage);
  }

}
