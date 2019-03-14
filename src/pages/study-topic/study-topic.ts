import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Platform} from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { Storage } from '@ionic/storage';
import { DemonstratifsPage } from '../demonstratifs/demonstratifs';
import { InterrogatifPage } from '../interrogatif/interrogatif';
import { PossessivePage } from '../possessive/possessive';

/**
 * Generated class for the StudyTopicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-study-topic',
  templateUrl: 'study-topic.html',
})
export class StudyTopicPage {
  topics:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public platform: Platform,private nativeAudio: NativeAudio,private storage: Storage) {
    this.platform.ready().then(() => {
      this.nativeAudio.preloadSimple('btnSoundId1', 'src/assets/audio/ding.mp3').then((success)=>{
        console.log("success");
      },(error)=>{
        console.log(error);
      });
    });
    this.storage.get('topic').then((val) => {
      this.topics = (<any>Object).values(val);
    });
  }

  goToPage(topic:any){
    this.nativeAudio.play('btnSoundId1').then((success)=>{
      console.log("success playing");
    },(error)=>{
      console.log(error);
    });
    if(topic == 'demonstratifs'){
      this.navCtrl.push(DemonstratifsPage);
    }else if(topic == 'interrogatifs'){
      this.navCtrl.push(InterrogatifPage);
    }else if(topic == 'possessive'){
      this.navCtrl.push(PossessivePage);
    }
    console.log(topic);
    
  }

}
