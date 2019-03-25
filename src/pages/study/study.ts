import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the StudyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-study',
  templateUrl: 'study.html',
})
export class StudyPage {
  key_correct:any;
  key:any;
  topic:any;
  label:any;
  mode:any;
  mode_label:any;
  question:any;
  varQues:any;
  size:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.key_correct = navParams.get('key');  
    this.topic = navParams.get('topic');  
    this.label = navParams.get('label');  
    this.mode = navParams.get('mode');  
    this.varQues = navParams.get('varQues'); 
    this.size = navParams.get('size'); 
    
    if(this.mode == 1){
      this.mode_label = 'EASY'
    }else if(this.mode == 2){
      this.mode_label = 'NORMAL'
    }else if(this.mode == 3){
      this.mode_label = 'HARD'
    }
    
  }

}
