import { Component, OnInit } from '@angular/core';
import { Question } from '../../classes/question';
import { QuestionService } from '../../services/question/question.service';
import { ScoreComponent } from '../../components/gamescreen/score/score.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorMessage } from '../../classes/errormessage';
import {AngularFireDatabase} from 'angularfire2/database';
import {LocalStorage} from '@ngx-pwa/local-storage';

const INTERVAL = 1000;

@Component({
  selector: 'app-gamescreen',
  templateUrl: './gamescreen.component.html',
  styleUrls: ['./gamescreen.component.css']
})
export class GamescreenComponent implements OnInit {

  questions: Question[];
  question: Question = null;
  timer: any;
  score = 0;
  timetogo = 5;
  errormessages: ErrorMessage[] = new Array();
  wronngtimes = 0;
  gamestatus = 'intro';
  effect1: string;
  effect2: string;
  introtext: string;
  user: string;

  intro: any = [
    {
      action : () => {
        this.introtext = 'Enter commands in terminal ⌨';
        console.log(this.introtext);
        this.effect1 = 'blink';
      }
    },
    {
      action : () => {
        this.introtext = 'See your score and time 🔥';
        this.effect1 = '';
        this.effect2 = 'blink';
      }
    },
    {
      action : () => {
        this.introtext = 'Let\'s Start';
        this.effect2 = '';
      }
    }
    ,
    {
      action : () => {
        this.startGame();
      }
    }
  ];


  constructor(private questionservice: QuestionService,
              private router: Router,
              private af: AngularFireDatabase,
              private localStorage: LocalStorage,
              ) {
  }

  getQuestions(): void {
    this.questions = this.questionservice.getQuestions();
  }

  randomQuestion(): void {
    this.question = this.questions[Math.floor(((Math.random() * 10000000) % this.questions.length))];
    console.log(this.questions);
  }

  clearErrorMessages(): void {
    this.errormessages = new Array();
  }

  addErrorMessage(error: ErrorMessage): void {
    this.errormessages.push(error);
  }

  processChildInput(input: string): void {

    this.addErrorMessage({
      type : '$',
      content : input
    });

    if (this.question.answer == input) {
      this.score += this.question.points;
      this.randomQuestion();
      this.wronngtimes = 0;
      this.addErrorMessage({
        type : 'SUCCESS',
        content : 'Perfect!! You did it.'
      });
    } else {
      if (this.wronngtimes < 2) {
        this.wronngtimes++;
        this.addErrorMessage({
          type : 'ERROR',
          content : 'The command you entered is incorrect. ' + this.wronngtimes + ' of 3 incorrect tries.'
        });
      } else {
        this.score = this.score > 0 ? (this.score - 1) : this.score;
        this.addErrorMessage({
          type : 'WARNING',
          content : 'The command you entered is incorrect. 1 point is reduced due to 3 incorrect tries.'
        });
        this.randomQuestion();
        this.wronngtimes = 0;
      }
    }

  }

  clearHint(): void {
    /*if(this.errormessages.length > 10) {
      this.addErrorMessage({
        type : 'INFO',
        content : 'I.'
      });
    }*/
  }

  startGame(): void {

    this.getQuestions();
    this.randomQuestion();
    this.timer = setInterval(() => {
      if (this.timetogo == 1) {
        clearInterval(this.timer);
        const userdata = {
          user: this.user,
          score: this.score
        };

        this.localStorage.getItem('key').subscribe(key => {
          if (key) {
            this.af.list('score').update(key, userdata).then(() => {
              this.router.navigateByUrl('/finish');
            });
          } else {
            this.af.list('/score').push(userdata).then((data) => {
              this.localStorage.setItem('key', data.key).subscribe(() => {
                this.router.navigateByUrl('/finish');
              });
            });
          }
        });



      }
      this.timetogo --;
    },
    INTERVAL);
  }

  ngOnInit() {

    this.localStorage.getItem('currentUser').subscribe((user) => {
      this.user = user;
    });


    for (let i = 0; i < this.intro.length; i++) {
      setTimeout(() => {
        this.intro[i].action();
      }, 1500 * (i + 1) );
    }


  }

}
