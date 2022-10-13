import { Injectable } from '@angular/core';
import { Question } from './Question';
import { Quiz } from './Quiz';
import {v4 as uuidv4} from 'uuid';
import {Preferences } from '@capacitor/preferences';
import { HttpClient } from '@angular/common/http'; //neu

let myuuid = uuidv4();

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  public counter: number;
  public rightOnes: number;

  public currentQuiz: Quiz = {
    id: '1',
    quizName: 'neu',
    questions: []
  };

  public runningQuiz: Quiz = {
    id: '',
    quizName: 'neu',
    questions: []
  };

  constructor(private http: HttpClient) {
    this.counter = 0;
    this.rightOnes = 0;
    this.loadQuiz();
  }

  public loadFromWebService(){
    
    this.http.get("https://schmiedl.co.at/json_cors/data.json",{responseType: "json"}).subscribe((loadedData: Quiz)=>{
        if(loadedData != null){    
          if(loadedData.id !=null){
            this.currentQuiz = loadedData;
            console.log(JSON.stringify(this.currentQuiz));
          }
        }
    },(theError)=>{
        console.log(theError)
    });
  }

  public getQuestion(qid:string): Question{
    return this.currentQuiz.questions.find(q => (q.id === qid));
  }

  public getNewQuestion(): Question{
    return {
      id: "",
      title: "",
      a1: "",
      a2: "",
      a3: "",
      a4: "",
      correct: 1
    }
  }

  public addQuestion(q: Question) {
    if (q.id === '' && q.title.length > 0) {
      q.id = uuidv4();
      this.currentQuiz.questions.push(q);
    }
    this.saveQuiz();
  }

  public deleteQuestion(q:Question){
    let index = this.currentQuiz.questions.indexOf(q);
    if(index>-1){
      this.currentQuiz.questions.splice(index,1);
    }
    this.saveQuiz();
  }

  public saveQuiz(){
    console.log("saving");
    Preferences.set({
      key: 'meinFragebogen',
      value: JSON.stringify(this.currentQuiz),
    });
  }

  public async loadQuiz(){
    console.log("start loading");
    try{
      let obj = await Preferences.get({ key: 'meinFragebogen' });
      console.log(JSON.parse(obj.value));
      this.currentQuiz = JSON.parse(obj.value);
      console.log("fertig geladen");
      console.log(JSON.stringify(this.currentQuiz));
    }catch{
      console.log("Fehler ist aufgetreten");
    }
  }

  public startQuiz(){
    this.counter=0;
    this.rightOnes=0;
    this.runningQuiz.questions = [...this.currentQuiz.questions];
    let currentIndex = this.runningQuiz.questions.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [this.runningQuiz.questions[currentIndex], this.runningQuiz.questions[randomIndex]] = [ this.runningQuiz.questions[randomIndex], this.runningQuiz.questions[currentIndex]];
    }
  }

  public updateCounter(){
    this.counter++;
  }


}
