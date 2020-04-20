import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() question: any;
  @Input() idx: number;
  @Input() form: FormGroup;

  constructor() { }

  onSelect(e) {
    this.form.value[this.idx] = e.target.innerText;
    const selected = document.getElementsByClassName('question__selected');
    Array.from(selected).forEach(elem => elem.classList.remove('question__selected'));
    e.target.parentNode.classList.add('question__selected');
    e.target.parentNode.classList.add('question__selected');
  }

  ngOnInit(): void {
    this.shuffleOptions(this.question.options);
  }

  get defaultOption() {
    const defaultOption = this.form.value[this.idx];
    return defaultOption;
  }

  private shuffleOptions(arr): [] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

}
