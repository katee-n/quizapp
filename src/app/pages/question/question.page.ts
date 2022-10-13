import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Question } from 'src/app/services/Question';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {

  public question: Question;

  constructor(public data: DataService, private route: ActivatedRoute) {
      let questionId = this.route.snapshot.paramMap.get("id");
      console.log(questionId);
      if(questionId!='new')
        this.question = this.data.getQuestion(questionId);
      else
        this.question = this.data.getNewQuestion();
      console.log(this.question);
   }

  ngOnInit() {
  }

  ionViewWillLeave(){
    this.data.addQuestion(this.question);
  }

}
