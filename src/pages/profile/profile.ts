import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  name:string;
  mail:string;
  avatar:string;
  id_avatar:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.storage.get('name').then((val) => {
      this.name = val;
    });
    this.storage.get('cmuitaccount').then((val) => {
      this.mail = val;
    });
    this.storage.get('avatar').then((val) => {
      this.id_avatar = val;
      this.avatar = `assets/imgs/${this.id_avatar}.png`;
    });
  }
  
  test(){
    console.log("name = ",this.name);
    console.log("mail = ",this.mail);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
