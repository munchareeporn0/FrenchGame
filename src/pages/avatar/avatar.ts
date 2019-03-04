import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http';
import { HttpModule, Http, Headers, RequestOptions } from '@angular/http';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import { MenuPage } from './../menu/menu';
import { NativeAudio } from '@ionic-native/native-audio';
import { Storage } from '@ionic/storage';
import  'rxjs/add/operator/catch';


/**
 * Generated class for the AvatarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({

  selector: 'page-avatar',
  templateUrl: 'avatar.html',
})
export class AvatarPage {
  data :any;
  test:string;
  inputname:string;
  avatarID:string;
  randQuestion = [];
  key:string = "username";
  cmuitaccount_name:string;
  disableButton:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,public platform: Platform,private nativeAudio: NativeAudio,public httpClient: HttpClient,private storage: Storage) {
    this.platform.ready().then(() => {
      this.nativeAudio.preloadSimple('btnSoundId1', 'src/assets/audio/avatar.wav').then((success)=>{
        console.log("success");
      },(error)=>{
        console.log(error);
      });
    });

    this.storage.get('cmuitaccount_name').then((val) => {
      this.cmuitaccount_name = val;
    });
  }

  setAvatar(avatarID:string) {
    this.nativeAudio.play('btnSoundId1').then((success)=>{
      console.log("success playing");
    },(error)=>{
      console.log(error);
    });
    
    this.disableButton = true;

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let requestOptions = new RequestOptions({ headers: headers });
    
    let postParams = {
      "content":{
        "cmuitaccount_name": this.cmuitaccount_name,
        "avatar":avatarID
      }
    }
    
    this.http.post("https://us-central1-frenchgame-228900.cloudfunctions.net/updateAvatar", postParams, requestOptions).map(res => res.json()).
      subscribe(response => {
        console.log(response);
      });  
      
    this.storage.set('avatar', avatarID);
    
      setTimeout(() => {
        this.navCtrl.push(MenuPage);
      }, 900);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvatarPage');
  }

}