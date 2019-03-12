import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudyTopicPage } from './study-topic';

@NgModule({
  declarations: [
    StudyTopicPage,
  ],
  imports: [
    IonicPageModule.forChild(StudyTopicPage),
  ],
})
export class StudyTopicPageModule {}
