import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Question } from './models/question';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'quizapp';

  apiUrl = 'https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple';

  questions: Question[];
  questionNumber: number = 0;
  correctAns: number = 0;
  result: string = '';
  start: boolean = false;
  done: boolean = false;
  disabledBtn: boolean = true;
  seconds: number = 0;
  counter;

  form: FormGroup;

  constructor(
    private http: HttpClient,
  ) { }

  get end() {
    const end = (this.questionNumber) >= this.questions.length - 1;
    return end;
  }

  ngOnInit(): void {
    this.http.get(this.apiUrl).subscribe(res => {
      this.questions = res['results'];
      this.questions.forEach(question => {
        question['options'] = this.getOptions(question);
      });
      this.form = this.toFormGroup(this.questions);
      this.disabledBtn = false;
    });
  }

  onStart() {
    this.start = true;
    this.done = false;
    this.counter = setInterval(() => {this.seconds += 1},1000);
  };

  onNext() {
    this.questionNumber += 1;
  }

  onSubmit() {
    clearInterval(this.counter);
    this.questions.forEach((question, idx) => {
      if (question.correct_answer === this.form.value[idx]) {
        this.correctAns += 1;
      }
    })
    this.result = this.correctAns >= 5 ? 'You passed the quiz!' : "Sorry, you didn't pass the quiz :(";
    this.done = true;
  }

  onReset() {
    window.location.reload();
  }

  private toFormGroup(questions) {
    let group: any = {};
    questions.forEach((question, idx) => {
      const defaultOption = question.options[Math.floor(Math.random() * question.options.length)];
      group[idx] = new FormControl(defaultOption, Validators.required);
    });

    return new FormGroup(group);
  }

  private getOptions(question): [] {
    const options = question.incorrect_answers;
    options.push(question.correct_answer);
    return options;
  }

}
