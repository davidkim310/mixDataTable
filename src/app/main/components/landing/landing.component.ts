import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AgeDataService } from '../../services/age-data.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, AfterViewInit {
  constructor(private dataService: AgeDataService, private cdr: ChangeDetectorRef) { }
  ages;
  names;
  columnsToDisplay: string[]  = ['ID', 'First Name', 'Last Name', 'Age'];
  originalArray: NameItem[] = [];
  sortedArray: NameItem[] = [];
  dataSource;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

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
      this.sortedArray = Object.values(finalArray);
      this.originalArray = Object.values(finalArray);
      this.dataSource = new MatTableDataSource(this.sortedArray);
    });
  }
  ngAfterViewInit() {
  this.sort.sortChange.subscribe((sort) => {
      this.sort = sort;
      this.dataSource.sortData = this.sortTable(this.sort);
      this.cdr.detectChanges();
    });
  }
  sortTable(sort) {
    const data = this.sortedArray.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = new MatTableDataSource(this.originalArray);
      return;
    }
    this.sortedArray = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'ID': return compare(a.id, b.id, isAsc);
        case 'First Name': return compare(a.firstName, b.firstName, isAsc);
        case 'Last Name': return compare(a.lastName, b.lastName, isAsc);
        case 'Age': return compare(a.age, b.age, isAsc);
        default: return 0;
      }
    } );
    this.dataSource = new MatTableDataSource(this.sortedArray);
  }
}
export interface NameItem {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

