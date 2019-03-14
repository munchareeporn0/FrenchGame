import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { PlayPage } from './../pages/play/play';
import { ModePage } from './../pages/mode/mode';
import {AvatarPage} from './../pages/avatar/avatar';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MenuPage } from '../pages/menu/menu';
import { PlayTopicPage } from '../pages/play-topic/play-topic';
import { StudyPage } from './../pages/study/study';
import { RulesPage } from '../pages/rules/rules';
import { ProfilePage } from '../pages/profile/profile';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { NativeAudio } from '@ionic-native/native-audio';
import { DataProvider } from '../providers/data/data';
import { HttpModule } from '@angular/http';
import { LoginPageModule } from '../pages/login/login.module';
import { LoginPage } from '../pages/login/login';
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { IntroPage } from '../pages/intro/intro';
import { TypePage } from '../pages/type/type';
import { MenuPageModule } from '../pages/menu/menu.module';
import { RankingPage } from '../pages/ranking/ranking';
import { StudyTopicPage } from '../pages/study-topic/study-topic';
import { DemonstratifsPage } from '../pages/demonstratifs/demonstratifs';
import { InterrogatifPage } from './../pages/interrogatif/interrogatif';
import { PossessivePage } from './../pages/possessive/possessive';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    PlayTopicPage,
    StudyPage,
    RulesPage,
    ProfilePage,
    AvatarPage,
    ModePage,
    PlayPage,
    IntroPage,
    TypePage,
    RankingPage,
    StudyTopicPage,
    DemonstratifsPage,
    InterrogatifPage,
    PossessivePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    MenuPageModule,
    HttpModule,
    LoginPageModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
    driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    MenuPage,
    ContactPage,
    HomePage,
    TabsPage,
    PlayTopicPage,
    StudyPage,
    RulesPage,
    ProfilePage,
    AvatarPage,
    ModePage,
    PlayPage,
    LoginPage,
    IntroPage,
    TypePage,
    RankingPage,
    StudyTopicPage,
    DemonstratifsPage,
    InterrogatifPage,
    PossessivePage
  ],
  providers: [
    StatusBar,
    Storage,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    NativeAudio,
    DataProvider,
    InAppBrowser,
  ]
})
export class AppModule { }
