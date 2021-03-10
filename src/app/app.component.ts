import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map, tap, max, min, count, debounce, ignoreElements, retry } from 'rxjs/operators';
import { of, fromEvent, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'test-application';
  userDetails = [];
  profile: any;
  numbers = [];
  oddNumbers = [];
  max: number;
  min: number;
  total: number;
  message: string;
  reduceTotal: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://randomuser.me/api/').subscribe(data => {
      console.log(data);
      // tslint:disable-next-line: no-string-literal
      this.userDetails = data['results'];
      console.log(this.userDetails);
    });

    this.getSquare();
    this.tapExample();
    this.MathematicalOperatorsExample();
    this.filterOperators();

    this.total = this.calculateSum(21);
    console.log('ES6 Default Parameters Example', this.total);
    this.reduceTotal = this.sum(1, 2, 3);

    console.log('ES6 Rest and Rxjs Reduce Operators Example', this.reduceTotal);

    this.getDifference();
  }

  getSquare() {
    const result = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
      .pipe(
        filter(num => num % 2 === 0),
        map(num => num * num)
      );

    result.subscribe((numb => {
      console.log(numb);
      this.numbers.push(numb);
    }));
  }

  tapExample() {
    const list = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
    const val = list.pipe(tap(x => console.log('From tap', + x),
      e => console.log(e),
      () => console.log('Task completed')), filter(x => x % 3 === 0));
    val.subscribe(x => {
      console.log('Odd numbers', + x);
      this.oddNumbers.push(x);
    });
  }

  MathematicalOperatorsExample() {
    const list = of(3, 6, 9, 10, 67, 23, 56);
    const result = list.pipe(max());
    result.subscribe(x => {
      console.log(x);
      this.max = x;
    });

    const result1 = list.pipe(min());
    result1.subscribe(x => {
      console.log(x);
      this.min = x;
    });

    const result2 = list.pipe(count());
    result2.subscribe(x => {
      console.log(x);
      this.total = x;
    });
  }

  filterOperators() {
    const btn = document.getElementById('btnclick');
    // tslint:disable-next-line: variable-name
    const btn_clicks = fromEvent(btn, 'click');
    const case1 = btn_clicks.pipe(debounce(() => interval(2000)));
    case1.subscribe(x => console.log(x));

    const list = of(1, 6, 5, 10, 9, 20, 40);
    const ignoredList = list.pipe(ignoreElements());
    ignoredList.subscribe(
      x => console.log('The last value is = ' + x),
      e => console.log('error:', e),
      () => {
        console.log('The task is complete');
        this.message = 'The task is complete';
      }
    );
  }


  calculateSum(x, y = 7) {
    return x - y;
}
  // Example of rxjs Reduce and ES6 rest Operators

  sum( ...Args) {
     return Args.reduce((previous, current) => {
       return previous + current;
     });
  }

  // Differemce between rest and spread operator
  getDifference() {
    // Rest Operator
    const name = ['Natasha', 'Dilip', 'Mansharamani'];
    const [firstName, ...familyName] = name;

    console.log('first Name', firstName);
    console.log('Family Name', familyName);

    // Spread Operator
    const myName = ['Natasha', 'Mansharamani'];
    // const myDetails = [...myName, 'Female', 29];
    const myDetails = ['Female', 29, ...myName];
    console.log(myDetails);

  }
}

