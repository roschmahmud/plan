import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  private kurse: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private toastCtrl: ToastController) 
  {
    this.kurse = window.localStorage.getItem('kurse') || '';
  }

  kurse_speichern(): void {
    window.localStorage.setItem('kurse', this.kurse);

    this.toastCtrl.create({
      message: `gespeichert :)`,
      duration: 2000,
      dismissOnPageChange: true
    }).present();
  }
}
