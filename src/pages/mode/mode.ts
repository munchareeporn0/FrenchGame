import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import { PlayPage } from '../play/play';
import { NativeAudio } from '@ionic-native/native-audio';

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
    console.log('ionViewDidLoad ModePage');
  }

  goToPlayPage(){
    this.nativeAudio.play('btnSoundId1').then((success)=>{
      console.log("success playing");
    },(error)=>{
      console.log(error);
    });
    this.navCtrl.push(PlayPage);
  }

}
