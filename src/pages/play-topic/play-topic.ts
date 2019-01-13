import { ModePage } from './../mode/mode';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Platform} from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';

/**
 * Generated class for the PlayTopicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-play-topic',
  templateUrl: 'play-topic.html',
})
export class PlayTopicPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public platform: Platform,private nativeAudio: NativeAudio) {
    this.platform.ready().then(() => {
      this.nativeAudio.preloadSimple('btnSoundId1', 'src/assets/audio/ding.mp3').then((success)=>{
        console.log("success");
      },(error)=>{
        console.log(error);
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayTopicPage');
  }
  goToModePage(){
    this.nativeAudio.play('btnSoundId1').then((success)=>{
      console.log("success playing");
    },(error)=>{
      console.log(error);
    });
    this.navCtrl.push(ModePage);
  }
}
