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
  columnsToDisplay = ['ID', 'First Name', 'Last Name', 'Age'];
  finalArray = [];
  ngOnInit() {
    this.dataService.requestData().subscribe((res) => {
      this.ages = res[0];
      this.names = res[1];
      const finalArray = {};
      for (const age of this.ages) {
        finalArray[age.id] = age;
      }
      for (const name of  this.names) {
        if (finalArray.hasOwnProperty(name.id)) {
          finalArray[name.id].firstName = (name.firstName) ? name.firstName : '';
          finalArray[name.id].lastName = (name.lastName) ? (name.lastName) : '';
        } else {
          finalArray[name.id] = name;
          finalArray[name.id].age = (name.age) ? name.age : '';
        }
      }
      this.finalArray = Object.values(finalArray);
    });
  }
}

