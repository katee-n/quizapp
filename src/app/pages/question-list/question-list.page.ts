import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Question } from 'src/app/services/Question';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.page.html',
  styleUrls: ['./question-list.page.scss'],
})
export class QuestionListPage implements OnInit {


  constructor(public data: DataService, private navCtrl: NavController) { }

  ngOnInit() {
  }
  show(q: Question) {
    this.navCtrl.navigateForward('/question/'+q.id);
  }
  showNew() {
    this.navCtrl.navigateForward('/question/new');
    }

  delete(q: Question) {
      this.data.deleteQuestion(q);
      console.log("lksdkf");
  }
}
