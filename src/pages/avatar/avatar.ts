import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http';
import { HttpModule, Http, Headers, RequestOptions } from '@angular/http';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import { MenuPage } from './../menu/menu';
import { NativeAudio } from '@ionic-native/native-audio';

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
  test:string;
  inputname:string;
  avatarID:string;
  key:string = "username";
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,public platform: Platform,private nativeAudio: NativeAudio) {
    this.platform.ready().then(() => {
      this.nativeAudio.preloadSimple('btnSoundId1', 'src/assets/audio/avatar.wav').then((success)=>{
        console.log("success");
      },(error)=>{
        console.log(error);
      });
    });
  }

  // setAvatar(avatarID:string){
  //   this.test = avatarID;
  //   console.log(avatarID);
  // }

  setAvatar(avatarID:string) {
    this.nativeAudio.play('btnSoundId1').then((success)=>{
      console.log("success playing");
    },(error)=>{
      console.log(error);
    });
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });

    let postParams = {
      title: avatarID,
      body: 'bar',
      userId: 1
    }
    
    this.http.post("http://jsonplaceholder.typicode.com/posts", postParams, options)
      .subscribe(data => {
        console.log(data['_body']);
        this.navCtrl.push(MenuPage);
       }, error => {
        console.log(error);// Error getting the data
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvatarPage');
  }

}
