import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { CookieService } from 'ngx-cookie-service';
import { Router }      from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-visitor-list',
  templateUrl: './visitor-list.component.html',
  styleUrls: ['./visitor-list.component.css']
})
export class VisitorListComponent implements OnInit {

  constructor(public mS:MainService,
    public cookie:CookieService,) { }

  visitors:any;
  myDate:any;
  dateS:any = new FormControl(new Date());

  ngOnInit() {
  	this.myDate = this.getDate("")
    // this.dateS = new Date();
  	this.mS.visitorList(this.myDate).subscribe((r:any)=>{
  		console.log(r);
  		this.visitors = r;
  	})
  }

  myChange(){
  	console.log("Hello");
  	console.log(this.dateS.value);
  	this.myDate = this.getDate(this.dateS.value)
  	this.mS.visitorList(this.myDate).subscribe((r:any)=>{
  		console.log(r);
  		this.visitors = r;
  	})

  }

  myChange1(vn){
    this.mS.visitorList1(vn).subscribe((r:any)=>{
      console.log(r);
      this.visitors = r;
    })
  }


  getDate(theDate){
  	if (theDate != "") {
  		let date = new Date(theDate).getDate().toString().length < 2 ? "0"+new Date(theDate).getDate():new Date(theDate).getDate();
	  	let month = (new Date(theDate).getMonth()+1).toString().length < 2 ? "0"+(new Date(theDate).getMonth()+1):new Date(theDate).getMonth();
	  	let year = new Date(theDate).getFullYear();
	  	return year+"-"+month+"-"+date;	
  	}
  	let date = new Date().getDate().toString().length < 2 ? "0"+new Date().getDate():new Date().getDate();;
  	let month = (new Date().getMonth()+1).toString().length < 2 ? "0"+(new Date().getMonth()+1):new Date().getMonth();
  	let year = new Date().getFullYear();
  	return year+"-"+month+"-"+date;
  }



}
