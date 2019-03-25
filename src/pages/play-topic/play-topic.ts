import { ModePage } from './../mode/mode';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Platform} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { MenuPage } from '../menu/menu';
import { Storage } from '@ionic/storage';


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
  topics:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private Alert: AlertController, public platform: Platform,private nativeAudio: NativeAudio,private storage: Storage) {
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
    
    // this.topics.forEach(element => {
    //   for(let i = 0; i < element['id'].length; i++){
    //     console.log(element['id'][i])
    //     for(let j = 0; j < element['level'].length; j++){
    //       console.log(element['level'][j])
    //     }
    //   }
    //   });
   
  }

  goToModePage(topic:string){


    this.nativeAudio.play('btnSoundId1').then((success)=>{
      console.log("success playing");
    },(error)=>{
      console.log(error);
    });

    this.navCtrl.push(ModePage,{
      topic:topic
    });
  }
}
