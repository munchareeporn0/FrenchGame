import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { HttpModule, Http, Headers, RequestOptions } from '@angular/http';
import {LoginPage} from '../login/login';
import {MenuPage} from '../menu/menu';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,private httpClient: HttpClient,private http:Http) {
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
    // this.getQuestions();

    setTimeout(() => {
      this.loading = false;
      document.getElementById('btn-login').hidden = false;
    }, 2500); 
        
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
      this.size = Object.keys(this.data).length;
      for(let i in data){
        for(let level = 1; level <= IntroPage.MAX_LEVEL; level++){
          let _level = level.toString();
          let postParams = {
            "content":{
                "Topic" : i,
                "level" : _level
              }
          }
            data: JSON.stringify(data)
          this.http.post("https://us-central1-frenchgame-228900.cloudfunctions.net/getQuestions", postParams, requestOptions).map(res => res)
          .subscribe(res => {  
            this.data = res['_body'];
            // this.data = JSON.parse(this.data);
            console.log("post = ",postParams);
            console.log(this.data);   
            this.storage.set(`${i}_${level}`,this.data);  
          }) 
        }
        // console.log(i);
        // console.log(data[i]);
      }

      
      // console.log("ID = ",this.data[0]['id']);
      // console.log("size = ",this.size);
    });
    // setTimeout(() => {
    //   console.log("data = ",this.data);
      
    //   console.log("size = ",this.size);
      
    // }, 1800); 
  }

  // getQuestions(){
  //   var topic = new Array(this.size);
  //   for(var i=0; i<this.size; i++){
  //     topic[i] = this.data[i]['id'];
  //   }
  // }
  
  openlogin() {
    if (!this.cheackQ) {
      this.storage.get('cmuitaccount_name').then((id) => {
        console.log('cmuitaccount_name is', id);
        if (id == null) {
          console.log('cmuitaccount_name is', id);
          this.navCtrl.push('LoginPage');
        } else {
          this.navCtrl.push('MenuPage');
        }
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
