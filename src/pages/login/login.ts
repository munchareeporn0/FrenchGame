import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoadingController} from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import {Storage} from '@ionic/storage';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {MenuPage} from '../menu/menu';
import {JwksValidationHandler, OAuthService} from 'angular-oauth2-oidc';
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {getOAuthAuthenUrl, getOAuthAuthenUrlMobile, OAUTH_REDIRECT_URI, OAUTH_URI} from "../../app/app.config";
import { AvatarPage } from '../avatar/avatar';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private todo: FormGroup;
  data;
  name;
  qp = [];
  data2: any;
  loginerr = false;
  typeS = "begin";
  id: any;
  loading:boolean = false;


  constructor(public formBuilder: FormBuilder,
              public storage: Storage,
              public http: HttpClient,
              public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              private iab: InAppBrowser,
              private Alert: AlertController,
              
  ) {

    this.loading = true;
    this.todo = this.formBuilder.group({
      title: ['', Validators.required],
      password: ['', Validators.required]
    });

    if  (localStorage.getItem('id') && localStorage.getItem('fullname')){
      let afterLoginData = {
        student_id: this.storage.get('id'),
        firstname_TH: this.storage.get('firstname'),
        lastname_TH: this.storage.get('lastname')
      }
      this.doAfterLogin(afterLoginData)
    }else{
      if (this.GetParam('access_token')) {
        this.getUserWithAccessToken(this.GetParam('access_token'))
      } else {
        this.login();
      }
    }
  }

  GetParam(name) {
    const results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (!results) {
      return 0;
    }
    return results[1] || 0;
  }

  // presentLoadingCustom() {
  //   this.loading = this.loadingCtrl.create({
  //     spinner: 'hide',
  //     content: `
  //      <img src="assets/imgs/loading/lg.palette-rotating-ring-loader.gif">     
  //    `
  //   });

  //   this.loading.present();
  // }

  postCall() {
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
      });
    // let options = new RequestOptions({ headers: headers });
    let postParams = {
      params: {
        UserName: this.todo.value.title,
        Password: this.todo.value.password
      }
    }

    //same but too long
    return new Promise((resolve, reject) => {
      this.http.post('https://sis.cmu.ac.th/cmusis/API/User/checkUser', postParams, {headers: headers})
        .toPromise()
        .then((response) => {
          console.log('API Response : ', response);
          // this.data2 = response.json();

          this.login();
          // resolve(response.json());
          console.log(this.data2);
        })
        .catch((error) => {
          console.error('API Error : ', error.status);
          console.error('API Error : ', JSON.stringify(error));
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
          this.postCall();
          reject(error.json());
        });
    });
  };

  login() {
    let authenUrl = getOAuthAuthenUrl();

    return new Promise((resolve, reject) => {

      let isApp = (!document.URL.startsWith('http') || document.URL.startsWith('http://localhost:8080'));
      if (isApp) {
        authenUrl = getOAuthAuthenUrlMobile()
        console.log('isApp: ', isApp, authenUrl);
        let browser = this.iab.create(authenUrl, '_blank');

        let listener = browser.on('loadstart').subscribe((event: any) => {
          //Check the redirect uri
          if (event.url.indexOf('oauth-success') > -1) {
            listener.unsubscribe();
            browser.close();
            let access_token = event.url.split('=')[1].split('&')[0];
            this.getUserWithAccessToken(access_token)
          } else {
            console.log("Could not authenticate");
          }
        });
      } else {
        window.open(authenUrl, '_self');
      }
    });
  }

  getUserWithAccessToken(access_token) {

    this.http.get(OAUTH_URI + '/getUser?access_token=' + access_token)
      .subscribe(data => {
          this.doAfterLogin(data)
      },err =>{
        let alert = this.Alert.create({
          title: 'Oops! Sorry :(',
          message: 'An error occurred. Please try again later',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                console.log("OK");
              }
            }
          ]
        });
        alert.present(alert);
      })
  }
  
  doAfterLogin(responseData){

    if (responseData){
      this.data = responseData;
    }
    setTimeout(() => {
      this.setData();
    }, 1700); 

    setTimeout(() => {

      this.loading = false;
      
      if(this.data['avatar'] == null){
        this.navCtrl.push(AvatarPage);
      }else{
        this.navCtrl.push(MenuPage);
      }

    }, 2100);

  }

  setData() {
    var name:string;
    name = this.data['firstname_EN'].concat(' ', this.data['lastname_EN']);
    this.storage.set('name',name);
    this.storage.set('cmuitaccount_name',this.data['cmuitaccount_name']);
    this.storage.set('cmuitaccount',this.data['cmuitaccount']);
    this.storage.set('avatar', this.data['avatar']);

  };

  

}