import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { CookieService } from 'ngx-cookie-service';
import { Router }      from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-visitor-create',
  templateUrl: './visitor-create.component.html',
  styleUrls: ['./visitor-create.component.css']
})
export class VisitorCreateComponent implements OnInit {

  constructor(public mS:MainService,
    public cookie:CookieService,
    public router:Router) { }

  
  dateI:any = new FormControl(new Date());
  dateO:any = new FormControl(new Date());

  timeIH = new FormControl(new Date().getHours());
  timeIM = new FormControl(new Date().getMinutes());

  timeOH = new FormControl(new Date().getHours());
  timeOM = new FormControl(new Date().getMinutes());

  visitorForm = new FormGroup({
  	number_plate: new FormControl(""),
  	card_number: new FormControl(""),
  	name: new FormControl(""),
  	mobile: new FormControl(""),
  	address: new FormControl(""),
  	destination: new FormControl(""),
  	purpose: new FormControl(""),
  	dateI: new FormControl(new Date()),
  	dateO: new FormControl(new Date()),
  	timeIH: new FormControl(new Date().getHours()),
  	timeIM: new FormControl(new Date().getMinutes()),
  	timeOH: new FormControl(new Date().getHours()),
  	timeOM: new FormControl(new Date().getMinutes()),
  })

  ngOnInit() {
  	// console.log(this.timeIH);
  }

  onSubmit(){
  	// console.log(this.visitorForm.value);
  	// console.log(this.visitorForm.get('name'));

  	// console.log(InTime);
  	let timeIH = this.visitorForm.get('timeIH').value.toString().length < 2 ? "0"+this.visitorForm.get('timeIH').value:this.visitorForm.get('timeIH').value;
  	let timeIM = this.visitorForm.get('timeIM').value.toString().length < 2 ? "0"+this.visitorForm.get('timeIM').value:this.visitorForm.get('timeIM').value;

  	let timeOH = this.visitorForm.get('timeOH').value.toString().length < 2 ? "0"+this.visitorForm.get('timeOH').value:this.visitorForm.get('timeOH').value;
  	let timeOM = this.visitorForm.get('timeOM').value.toString().length < 2 ? "0"+this.visitorForm.get('timeOM').value:this.visitorForm.get('timeOM').value;

  	let InTime = this.mS.getDate(this.visitorForm.get('dateI').value)+"T"+timeIH+":"+timeIM+"Z";
  	let OutTime = this.mS.getDate(this.visitorForm.get('dateO').value)+"T"+timeOH+":"+timeOM+"Z";
  	
  	console.log(InTime);
  	console.log(OutTime);


  	let card_number = this.visitorForm.get('card_number').value;
  	let name = this.visitorForm.get('name').value;
  	let address = this.visitorForm.get('address').value;
  	let mobile = this.visitorForm.get('mobile').value;
  	let number_plate = this.visitorForm.get('number_plate').value;
  	let destination = this.visitorForm.get('destination').value;
  	let purpose = this.visitorForm.get('purpose').value;
  	let outtime = OutTime;
  	let intime = InTime;

  	this.mS.addVisitor(card_number,name,address,mobile,number_plate,destination,purpose,outtime,intime).subscribe((r:any)=>{
  		console.log(r);
  		if (r.id) {
  			console.log(r.id);
  			this.router.navigate(['/visitor-list'])
  		}
  	})

  }


  myFocusout(){
  	this.mS.visitorDetails(this.visitorForm.get('number_plate').value).subscribe((r:any)=>{
  		if (r.length > 0) {
  			console.log(r);
  			this.visitorForm.get('name').setValue(r[0][3]);
  			this.visitorForm.get('mobile').setValue(r[0][5]);
  			this.visitorForm.get('address').setValue(r[0][4]);
  			this.visitorForm.get('destination').setValue(r[0][7]);
  			this.visitorForm.get('purpose').setValue(r[0][8]);
  			// console.log(r[0][3]);
  		}else{
  			this.visitorForm.get('name').setValue("");
  			this.visitorForm.get('mobile').setValue("");
  			this.visitorForm.get('address').setValue("");
  			this.visitorForm.get('destination').setValue("");
  			this.visitorForm.get('purpose').setValue("");
  		}
  	})
  }

}
