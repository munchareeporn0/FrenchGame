import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginPage} from '../login/login';
import {MenuPage} from '../menu/menu';

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
  cheackS = false;
  cheackQ = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private  http: HttpClient, public storage: Storage) {
    this.storage.get('id').then((id) => {
      if (id != null) {
        this.cheackS = true;
        this.cheackQ = true;
      }
    });
  }

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
