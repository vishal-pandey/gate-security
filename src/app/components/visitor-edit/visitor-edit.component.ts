import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MainService } from '../../services/main.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-visitor-edit',
  templateUrl: './visitor-edit.component.html',
  styleUrls: ['./visitor-edit.component.css']
})
export class VisitorEditComponent implements OnInit {

  constructor(private route: ActivatedRoute,
  private router: Router,
  public mS:MainService,
  private _snackBar: MatSnackBar) { }

  r:any;
  id:any;
  isUpdate:boolean = false;

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
  	this.route.paramMap.subscribe((r:any)=>{
			this.r = r;
      this.id = r.params.id;
			console.log(r.params.id);
      if (r.params.id) {
  			this.mS.visitorEditDetail(r.params.id).subscribe((r:any)=>{
  				console.log(r);
  				this.visitorForm.get('number_plate').setValue(r.number_plate);
  				this.visitorForm.get('card_number').setValue(r.card_number);
  				this.visitorForm.get('name').setValue(r.name);
  				this.visitorForm.get('mobile').setValue(r.mobile);
  				this.visitorForm.get('address').setValue(r.address);
  				this.visitorForm.get('destination').setValue(r.destination);
  				this.visitorForm.get('purpose').setValue(r.purpose);
  				this.visitorForm.get('dateI').setValue(new Date(r.intime.toString()));
  				this.visitorForm.get('dateO').setValue(new Date(r.outtime.toString()));

  				this.visitorForm.get('timeIH').setValue(new Date(new Date(r.intime.toString()).toISOString().slice(0, -1)).getHours());
  				this.visitorForm.get('timeIM').setValue(new Date(new Date(r.intime.toString()).toISOString().slice(0, -1)).getMinutes());
  				this.visitorForm.get('timeOH').setValue(new Date(new Date(r.outtime.toString()).toISOString().slice(0, -1)).getHours());
  				this.visitorForm.get('timeOM').setValue(new Date(new Date(r.outtime.toString()).toISOString().slice(0, -1)).getMinutes());

  				let x = new Date(r.intime.toString()).toUTCString();
          x = x.slice(0,-1);
          let y = new Date(x);

          console.log(x);
  				console.log(y);
  			})
      }else{
        this.isUpdate = true;
      }
    })
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

  	this.mS.updateVisitor(card_number,name,address,mobile,number_plate,destination,purpose,outtime,intime, this.id).subscribe((r:any)=>{
  		console.log(r);
  		if (r.id) {
  			console.log(r.id);
        this.openSnachbar();
  			this.router.navigate(['/visitor-list'])
  		}
  	})
  }

  navigateToEdit(id){
    this.router.navigate(['/visitor-edit/'+id]);
  }

  openSnachbar(){
    this._snackBar.open("Updated", "X", {
      duration: 1000
    })
  }

}
