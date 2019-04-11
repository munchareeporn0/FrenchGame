import { FutursimplePage } from './../futursimple/futursimple';
import { PossessivePage } from './../possessive/possessive';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Platform} from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { Storage } from '@ionic/storage';
import { DemonstratifsPage } from '../demonstratifs/demonstratifs';
import { AlertController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { InterrogatifPage } from '../interrogatif/interrogatif';
import { Demonstratifs1Page } from '../demonstratifs1/demonstratifs1';
import { ConditionnelpassePage } from '../conditionnelpasse/conditionnelpasse';

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
  constructor(public navCtrl: NavController,private Alert: AlertController, public navParams: NavParams,public platform: Platform,private nativeAudio: NativeAudio,private storage: Storage) {
    this.platform.ready().then(() => {
      this.nativeAudio.preloadSimple('btnSoundId1', 'src/assets/audio/ding.mp3').then((success)=>{
        console.log("success");
      },(error)=>{
        console.log(error);
      });
    });

    this.storage.get('topic').then((val) => {
      if(val == null){
        let alert = this.Alert.create({
          title: 'Oops! Sorry :(',
          message: 'An error occurred. Please refresh app or try again later',
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
      }else{
        this.topics = (<any>Object).values(val);
      }
    });
  }

  goToPage(_topic:any,_label:any){
    this.nativeAudio.play('btnSoundId1').then((success)=>{
      console.log("success playing");
    },(error)=>{
      console.log(error);
    });
    if(_topic == 'demonstratifs1'){
      this.navCtrl.push(DemonstratifsPage,{
        topic : _topic,
        label : _label
      }); 
    }else if(_topic == 'interrogatifs'){
      this.navCtrl.push(InterrogatifPage,{
        topic : _topic,
        label : _label
      });
    }else if(_topic == 'possessive'){
      this.navCtrl.push(PossessivePage,{
        topic : _topic,
        label : _label
      });
    }else if(_topic == 'demonstratifs2'){
      this.navCtrl.push(Demonstratifs1Page,{
        topic : _topic,
        label : _label
      });
    }else if(_topic == 'conditionnelpasse'){
      this.navCtrl.push(ConditionnelpassePage,{
        topic : _topic,
        label : _label
      });
    }else if(_topic == 'futursimple'){
      this.navCtrl.push(FutursimplePage,{
        topic : _topic,
        label : _label
      });
    }
    
  }

}
