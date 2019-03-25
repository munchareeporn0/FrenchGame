import { Component, ViewChild  } from '@angular/core';
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
export class AnswerPage{

  persons:any;
  score:any;
  rank:any;
  size:any;
  avatar:any;
  verQuestions:any;
  check:any;
  cmuitaccount_name:any;
  star:any;
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

    // console.log(this.size*0.2)

    // console.log(this.size*0.4)
    
    // console.log(this.size*0.7)

    // console.log(Math.round(this.size*0.2))

    // console.log(Math.round(this.size*0.4))
    
    // console.log(Math.round(this.size*0.7))


    if(this.score < Math.round(Math.round(this.size*0.2))){
      this.star = 0;
    }else if(this.score < Math.round(this.size*0.4)){
      this.star = 1;
    }else if(this.score < Math.round(this.size*0.7)){
      this.star = 2;
    }else if(this.score >= Math.round(this.size*0.7)){
      this.star = 3;
    }

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
