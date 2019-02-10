import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http';
import { HttpModule, Http, Headers, RequestOptions } from '@angular/http';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import { MenuPage } from './../menu/menu';
import { NativeAudio } from '@ionic-native/native-audio';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,public platform: Platform,private nativeAudio: NativeAudio,public httpClient: HttpClient) {
    this.platform.ready().then(() => {
      this.nativeAudio.preloadSimple('btnSoundId1', 'src/assets/audio/avatar.wav').then((success)=>{
        console.log("success");
      },(error)=>{
        console.log(error);
      });
    });
  }

  setAvatar(avatarID:string) {
    this.nativeAudio.play('btnSoundId1').then((success)=>{
      console.log("success playing");
    },(error)=>{
      console.log(error);
    });
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let requestOptions = new RequestOptions({ headers: headers });

    let postParams = {
      "content":{
          "Topic" : "Possessive",
          "level" : "1"
        }
    }
    
    this.http.post("https://us-central1-frenchgame-228900.cloudfunctions.net/getQuestions", postParams, requestOptions).map(res => res.json()).
      subscribe(data => {
        this.data = data;
        // var item = this.data[Math.floor(Math.random()*this.data.length)];
        
        var _size = Object.keys(this.data).length;
        var mark:boolean[] = new Array(_size);

        // console.log(mark[1]);

        for(var i=0;i<20;i++){       
          var rand;
          do{
            rand = Math.floor(Math.random()*_size); 
          } while(mark[rand] != null);
          mark[rand] = true;
          this.randQuestion[i] = rand;
        }
        
        for(var i=0;i<20;i++){
        console.log(this.randQuestion[i])
        console.log(this.data[this.randQuestion[i]]);
        }
        
        // this.cards.rd = this.cards[Math.floor(Math.random() * this.cards.length)];
        // console.log(this.cards.rd);
        // (err) => {
        //   alert("failed loading json data");
        // }
      })  
    
    // subscribe(data => {
    //     console.log(data);
    //     // this.navCtrl.push(MenuPage);
    //    }, error => {
    //     console.log(error);// Error getting the data
    //   });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvatarPage');
  }

}