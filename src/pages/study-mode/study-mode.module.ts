import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudyModePage } from './study-mode';

@NgModule({
  declarations: [
    StudyModePage,
  ],
  imports: [
    IonicPageModule.forChild(StudyModePage),
  ],
})
export class StudyModePageModule {}
