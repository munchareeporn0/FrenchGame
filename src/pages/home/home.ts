import { MenuPage } from './../menu/menu';
import { DataProvider } from './../../providers/data/data';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public http:HttpClient, private dataProvider:DataProvider
              ,public loadingCtrl: LoadingController) {

  }
  // ionViewWILLEnter(){
  //   this.dataProvider.getData().then(data => {
  //     console.log(data);
  //   })
  // }
  
  // presentLoadingCustom() {
  //   let loading = this.loadingCtrl.create({
  //     spinner: 'hide',
  //     content: `
  //       <div class="$loading-md-background">
  //         <div>
  //           <img src="assets/loading/loading1.gif">     
  //         </div>  
  //       </div>
  //       `,      
  //   });
  
  //   loading.onDidDismiss(() => {
  //     console.log('Dismissed');
  //   });
  
  //   loading.present();

  //   setTimeout(() => {
  //     this.navCtrl.push(MenuPage);
  //   }, 6000);
  
  //   setTimeout(() => {
  //     loading.dismiss();
  //   }, 6000);
  // }
  
  
  
  
}
