import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MenuPage } from '../pages/menu/menu';
import {AvatarPage} from '../pages/avatar/avatar';
import { HomePage } from '../pages/home/home';
import { TypePage } from '../pages/type/type';
import { PlayPage } from '../pages/play/play';
import { ProfilePage } from '../pages/profile/profile';
import { IntroPage } from '../pages/intro/intro';
import { PlayTopicPage } from '../pages/play-topic/play-topic';
import { RankingPage } from '../pages/ranking/ranking';
import { RulesPage } from '../pages/rules/rules';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = IntroPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
