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
  key:string = "question";
  questions:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public platform: Platform,private nativeAudio: NativeAudio, public http: Http,private storage: Storage) {

    this.platform.ready().then(() => {
      this.nativeAudio.preloadSimple('btnSoundId1', 'src/assets/audio/ding.mp3').then((success)=>{
        console.log("success");
      },(error)=>{
        console.log(error);
      });
    });
    this.topic = navParams.get('topic');
    console.log("topic from ModePage = ",this.topic);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModePage');
  }

  goToPlayPage(mode:string){
    
    let key:string;

    this.nativeAudio.play('btnSoundId1').then((success)=>{
      console.log("success playing");
    },(error)=>{
      console.log(error);
    });


    this.navCtrl.push(PlayPage,{
      topic :this.topic,
      mode  :mode
    });
    
    // this.storage.get(`${this.topic}_${mode}`).then((val) => {
    //   this.questions = val;
    //   if(val == null){
    //     console.log('Sorry');
    //   }else {
    //     console.log(`${this.topic}_${mode}`);
    //     this.navCtrl.push(PlayPage,{
    //       questions:this.questions
    //     });
    //   }    
    // });

    // setTimeout(() => {
    //   console.log(`${this.topic}_${mode}`);
    //   console.log(this.questions);
    // }, 1000); 

  }

}
