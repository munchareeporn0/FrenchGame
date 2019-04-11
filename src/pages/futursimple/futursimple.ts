import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StudyModePage } from '../study-mode/study-mode';

/**
 * Generated class for the FutursimplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-futursimple',
  templateUrl: 'futursimple.html',
})
export class FutursimplePage {
  topic:any;
  label:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.topic = navParams.get('topic');   
    this.label = navParams.get('label');   
  }
  goToModePage(){
    this.navCtrl.push(StudyModePage,{
      topic : this.topic,
      label : this.label
    });
  }

}
