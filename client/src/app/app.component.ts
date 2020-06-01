import { Component } from '@angular/core';
import {Sort} from '@angular/material/sort';
import { element } from 'protractor';


export interface City {
  id: number,

  city:string,
  start_date:Date,
  end_date:Date,
  price:string,
  status:string,
  color:string
}
const CITY_DATA: City[] = [
  
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  displayedColumns: string[] = ['id', 'city', 'start_date', 'end_date','price','status','color'];
  dataSource = CITY_DATA;
  dataCopy = [...CITY_DATA];
  from_date = "";
  to_date = "";
  ngOnInit() {
    var self = this;
    fetch("http://localhost:3000/city").then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      
      return response.json().then(response => {
        
        response.map((city)=>{
          city.start_date = this.formatDate(city.start_date)
          city.end_date = this.formatDate(city.end_date)
        })
        self.dataSource = response
        self.dataCopy = [...response]
      })
    })
  }

  formatDate(date){
    let dateItems = date.split("T")[0].split("-")
    return [dateItems[1],dateItems[2],dateItems[0]].join("/")
  }

  search(){
    // console.log(this.from_date , this.to_date)
    let resData = []
    if(this.from_date != null && this.from_date != undefined && this.from_date != "" && this.to_date != null && this.to_date != undefined && this.to_date != ""){
      this.dataCopy.forEach((element)=>{
        if(new Date(element.start_date) >= new Date(this.from_date)  && new Date(element.end_date) <= new Date(this.to_date) ){
          resData.push({...element})
        }
        this.dataSource = resData;
      })
    }
   
  }

  reset(){
    this.dataSource = [...this.dataCopy]
  }

  compare(a: number | string | Date, b: number | string| Date, isAsc: boolean) {
   
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
   
  sortData(sort: Sort) {
    const data = this.dataSource.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = data;
      return;
    }

    this.dataSource = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return this.compare(a.id, b.id, isAsc);
        case 'start_date': return this.compare(new Date(a.start_date), new Date(b.start_date), isAsc);
        case 'end_date': return this.compare(new Date(a.end_date), new Date(b.end_date), isAsc);
        case 'city': return this.compare(a.city, b.city, isAsc);
        case 'price': return this.compare(a.price, b.price, isAsc);
        case 'status': return this.compare(a.status, b.status, isAsc);
        case 'color': return this.compare(a.color, b.color, isAsc);
        default: return 0;
      }
    });
  }

  

  
  






}
