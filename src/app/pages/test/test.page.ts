import { Component, OnInit } from '@angular/core';
import { ListenDecorator } from 'ionicons/dist/types/stencil-public-runtime';
import { DataService } from 'src/app/services/data.service';
import { Quiz } from 'src/app/services/Quiz';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

    mode: string  = "start";
    checkValue: boolean;
    checkPressed: boolean = false;
    loggedInAnswar: number;
    buttonStyles: String[] = ["light","light","light","light"];

  constructor(public data: DataService, private navCtrl: NavController) { 
  }

  public startQuiz(){
    this.mode = "game";
    this.data.startQuiz();
  }

  public getNextQuestion(){ 
    this.buttonStyles = ["light","light","light","light"];
    if(this.data.counter+1==this.data.currentQuiz.questions.length){
      this.mode = "end";
    }else{
      this.data.updateCounter();
    }
    this.checkPressed = false;
  }

  public getCurrentQuestion(){
    return this.data.runningQuiz.questions[this.data.counter];
  }

  public checkAnswer(){
    if(this.getCurrentQuestion().correct === this.loggedInAnswar){
      console.log("true");
      this.checkValue = true;
      this.data.rightOnes++;
      this.buttonStyles[this.loggedInAnswar-1] = "success";
    }else{
      this.checkValue = false;
      this.buttonStyles[this.loggedInAnswar-1] = "danger";
      console.log("false");
    }
    this.loggedInAnswar = 0;
    this.checkPressed = true;
  }

  public loginAnswer(selected:number){
    this.loggedInAnswar = selected;
    this.buttonStyles = ["light","light","light","light"];
    this.buttonStyles[selected-1] = "medium";
  }

  goToStart() {
    this.navCtrl.navigateForward('/home');
  }


  ngOnInit() {
  }


}
