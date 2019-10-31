import { Component, OnInit } from '@angular/core';
import { AgeDataService } from '../../services/age-data.service';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private dataService: AgeDataService) { }
  ages;
  names;
  finalArray = [];
  ngOnInit() {
    this.dataService.requestData().subscribe((res) => {
      this.ages = res[0];
      this.names = res[1];
      console.log('receiving api', res);
      const finalArray = {};
      for (let i = 0; i < this.ages.length; i++) {
        finalArray[this.ages[i].id] = this.ages[i];
        console.log('finalArray', finalArray);
      }
      for (let j = 0; j < this.names.length; j++) {
        console.log('inside loop', this.names[j].id);
        console.log('hasProp', finalArray.hasOwnProperty(this.names[j].id));
        if (finalArray.hasOwnProperty(this.names[j].id)) {
          finalArray[this.names[j].id].firstName = (this.names[j].firstName) ? this.names[j].firstName : '';
          finalArray[this.names[j].id].lastName = (this.names[j].lastName) ? (this.names[j].lastName) : '';
        } else {
          finalArray[this.names[j].id] = this.names[j];
          finalArray[this.names[j].id].age = (this.names[j].age) ? this.names[j].age : '';
        }
      }
      this.finalArray = Object.values(finalArray);
    });
  }
}

