import { ProfilePage } from './../profile/profile';
import { RulesPage } from './../rules/rules';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { PlayTopicPage } from '../play-topic/play-topic';
import { StudyPage } from '../study/study';
import { NativeAudio } from '@ionic-native/native-audio';
import { HttpModule, Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/toPromise';
import  'rxjs/add/operator/catch';
import { StudyTopicPage } from '../study-topic/study-topic';
/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
 

export class MenuPage {
  data:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public platform: Platform,private nativeAudio: NativeAudio,private storage: Storage) {
    this.platform.ready().then(() => {
      this.nativeAudio.preloadSimple('btnSoundId1', 'src/assets/audio/ding.mp3').then((success)=>{
        console.log("success");
      },(error)=>{
        console.log(error);
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  goToPlayTopicPage(){
    this.nativeAudio.play('btnSoundId1').then((success)=>{
      console.log("success playing");
    },(error)=>{
      console.log(error);
    });
    this.navCtrl.push(PlayTopicPage);
  }

  goToStudyPage(){
    this.nativeAudio.play('btnSoundId1').then((success)=>{
      console.log("success playing");
    },(error)=>{
      console.log(error);
    });
    this.navCtrl.push(StudyTopicPage);
  }

  goToRulesPage(){
    this.nativeAudio.play('btnSoundId1').then((success)=>{
      console.log("success playing");
    },(error)=>{
      console.log(error);
    });
    this.navCtrl.push(RulesPage);
  }

  goToProfilePage(){
    this.nativeAudio.play('btnSoundId1').then((success)=>{
      console.log("success playing");
    },(error)=>{
      console.log(error);
    });
    this.navCtrl.push(ProfilePage)
  }


}
