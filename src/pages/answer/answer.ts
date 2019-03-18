import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MenuPage } from '../menu/menu';
import { RankingPage } from '../ranking/ranking';


/**
 * Generated class for the AnswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-answer',
  templateUrl: 'answer.html',
})
export class AnswerPage {

  persons:any;
  score:any;
  rank:any;
  size:any;
  avatar:any;
  verQuestions:any;
  check:any;
  cmuitaccount_name:any;
  q_no = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.persons  = navParams.get('person'); 
    this.score    = navParams.get('score'); 
    this.rank     = navParams.get('rank');
    this.size     = navParams.get('size_choice');
    this.avatar   = navParams.get('avatar');
    this.verQuestions = navParams.get('verQuestion');

    this.storage.get('cmuitaccount_name').then((val) => {
      this.cmuitaccount_name = val;
    });
    
    // console.log(this.verQuestions);
    
  }

  goToRankingPage(){
    this.navCtrl.push(RankingPage,{
      score             :this.score,
      rank              :this.rank,
      person            :this.persons,
      size_choice       :this.size,
      avatar            :this.avatar,
      cmuitaccount_name :this.cmuitaccount_name
    }); 
  }

  goToMenuPage(){
    this.navCtrl.push(MenuPage);
  }


}
