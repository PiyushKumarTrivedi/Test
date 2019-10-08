import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnChanges {

  constructor() { }
  @Input() rating1: number;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter();

  ngOnChanges() {
    setTimeout(() => {
   console.log(this.rating1 + ' ngOnInit');
    });
  }
  isAboveRating(index: number) {
  return index > this.rating1 ;
  }
   GetColor(index: number) {
    console.log('index ' + index);
    console.log('rating ' + this.rating1);
    if (this.isAboveRating(index)) {
      return 'grey';
    }
    switch (this.rating1) {
          case 1:
          case 2:
          case 4:
          case 5:
          case 3:
            return 'red';
            break;
          default:
            break;
        }
  }
  rateNum(index: number) {
  console.log('ratenum ckicked ' + index);
  this.rating1 = index;
  this.ratingChange.emit(this.rating1);
  }
}
