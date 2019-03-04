import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Navbar } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { MenuPage } from '../menu/menu';


/**
 * Generated class for the RankingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html',
})
export class RankingPage {

  @ViewChild(Navbar) navBar: Navbar;

  persons:any;
  score:any;
  rank:any;
  cmuacc:any;
  size:any;
  avatar:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.persons  = navParams.get('person'); 
    this.score    = navParams.get('score'); 
    this.rank     = navParams.get('rank');
    this.cmuacc   = navParams.get('cmuitaccount_name');
    this.size     = navParams.get('size_choice');
    this.avatar   = navParams.get('avatar');
  }

  ionViewDidLoad() {
    this.setBackButtonAction()
  }

  setBackButtonAction(){
    this.navBar.backButtonClick = () => {
      this.navCtrl.push(MenuPage);
    }
  }

}
