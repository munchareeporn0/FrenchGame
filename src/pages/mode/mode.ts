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
  topic:string;
  data :any;
  key:string;
  check_Q:any;
  questions:any;
  disableButton:boolean [] = [];
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

    for(let i = 0; i < 3; i++){
      this.key = `${this.topic}_${i + 1}`;
      this.storage.get(this.key).then((val) => {
        this.check_Q = (<any>Object).keys(val);
        if(this.check_Q[0] == null){
          this.disableButton[i] = true;
        }
      });
    }    
    
  }

  goToPlayPage(mode:string){
    
    this.nativeAudio.play('btnSoundId1').then((success)=>{
      console.log("success playing");
    },(error)=>{
      console.log(error);
    });


    this.navCtrl.push(PlayPage,{
      topic :this.topic,
      mode  :mode
    });

  }

}
