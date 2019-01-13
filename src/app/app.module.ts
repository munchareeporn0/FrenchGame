import { PlayPage } from './../pages/play/play';
import { ModePage } from './../pages/mode/mode';
import { AvatarPage } from './../pages/avatar/avatar';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

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


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MenuPage,
    PlayTopicPage,
    StudyPage,
    RulesPage,
    ProfilePage,
    AvatarPage,
    ModePage,
    PlayPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MenuPage,
    PlayTopicPage,
    StudyPage,
    RulesPage,
    ProfilePage,
    AvatarPage,
    ModePage,
    PlayPage
  ],
  providers: [
    StatusBar,
    Storage,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativeAudio,
    DataProvider,
  ]
})
export class AppModule {}
