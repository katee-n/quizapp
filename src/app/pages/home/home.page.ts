import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  constructor(public data: DataService, private navCtrl: NavController) {
    console.log(data.currentQuiz.questions.length);
  }

  public showList() {
    this.navCtrl.navigateForward("/question-list");
  }

  public showTest() {
    this.navCtrl.navigateForward("/test");
  }

}
