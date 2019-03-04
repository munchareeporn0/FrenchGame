import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { HttpModule, Http, Headers, RequestOptions } from '@angular/http';
import {LoginPage} from '../login/login';
import {MenuPage} from '../menu/menu';
import { AlertController } from 'ionic-angular';
import { timeout } from 'rxjs/operator/timeout';
import { HTTP } from '@ionic-native/http';
import { Response } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';



/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {
  data:any;
  size:any;
  cheackS = false;
  cheackQ = false;
  loading:boolean = false;
  public static MAX_LEVEL = 3;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage
              ,private httpClient: HttpClient,private http:Http,private Alert: AlertController,) {
    this.storage.get('id').then((id) => {
      if (id != null) {
        this.cheackS = true;
        this.cheackQ = true;
      }
    });
  }

  ionViewWillEnter(){
    this.loading = true;
    this.getTopic();
        
  }
  

  
  getTopic(){
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let requestOptions = new RequestOptions({ headers: headers });

    this.httpClient.get('https://us-central1-frenchgame-228900.cloudfunctions.net/getTopics')
    .subscribe((data) => {
      this.data = data;
      this.storage.set('topic',this.data); 
      // this.size = Object.keys(this.data).length;
      for(let i in data){
        for(let level = 1; level <= IntroPage.MAX_LEVEL; level++){
          let _level = level.toString();
          let postParams = {
            "content":{
                "Topic" : i,
                "level" : _level
              }
          }
          this.http.post("https://us-central1-frenchgame-228900.cloudfunctions.net/getQuestions", postParams, requestOptions).map(res => res.json())
          .subscribe(res => {  
            this.data = res;
            this.storage.set(`${i}_${level}`,this.data);  
          }),err =>{
    
              let alert = this.Alert.create({
                title: 'Oops! Sorry :(',
                message: 'An error occurred. Please try again later',
                buttons: [
                  {
                    text: 'OK',
                    handler: () => {
                      console.log('OK');
                    }
                  }
                ]
              });
              alert.present(alert);
          }
           
        }
      }
      
      setTimeout(() => {
        this.loading = false;
        document.getElementById('btn-login').hidden = false;
      }, 1000); 
    });
  }
  
  openlogin() {
    if (!this.cheackQ) {
      this.storage.get('cmuitaccount_name').then((id) => {
        this.navCtrl.push(id == null?'LoginPage':'MenuPage');
      });
    } else {
      this.navCtrl.setRoot('MenuPage');
    }
  }

  getParam(name) {
    const results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if(!results){
      return 0;
    }
    return results[1] || 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }

}
