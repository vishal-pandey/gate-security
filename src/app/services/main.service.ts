import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router }      from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient,
  	private cookie:CookieService,
  	public router: Router, ) { }


  apiUrl="https://gateapi.vishalpandey.xyz/";
  // apiUrl="http://localhost:8000/";


  client_id = "ZCI15L3nitQ0f04oNlhKDMvl0jngEX6OP5oxp2so";
  grant_type = "password";

  login(username, password){
  	let tosend = new FormData();
  	tosend.append('username', username)
  	tosend.append('password', password)
  	tosend.append('client_id', this.client_id)
  	tosend.append('grant_type', this.grant_type)
  	return this.http.post(this.apiUrl+"o/token/", tosend);
  }

  logout(){
  	this.cookie.deleteAll();
    this.router.navigate(['/']);
  }

  isLoggedIn(){
  	if (this.cookie.check('access_token')) {
  		return true;
  	}else{
  		return false;
  	}
  }

  getUserDetail(access_token){
    return this.http.get(this.apiUrl+"current?access_token="+access_token).subscribe((r:any)=>{
      if (r.id) {
        this.cookie.set("id",r.id,360000,"/");
        this.cookie.set("username",r.username,360000,"/");
        this.cookie.set("email",r.email,360000,"/");
        this.cookie.set("first_name",r.first_name,360000,"/");
        this.cookie.set("last_name",r.last_name,360000,"/");
        return true;
      }
      else{
      	return false;
      }
    }, (error:any)=>{
    	// this.logout()
    	this.router.navigate(['/']);
    })
  }

  signup(username, email, first_name, last_name){
    let tosend = new FormData();
    tosend.append('username', username);
    tosend.append('email', email);
    tosend.append('first_name', first_name);
    tosend.append('last_name', last_name);
    // tosend.append('password', password);
    return this.http.post(this.apiUrl+"signup", tosend);
  }


  visitorList(date){
    let tosend = new FormData();
    tosend.append('visit_date', date);
    return this.http.post(this.apiUrl+"visitor-by-visit-date/"+"?access_token="+this.cookie.get('access_token'), tosend)
  }

  visitorList1(vn){
    let tosend = new FormData();
    tosend.append('all', '1');
    tosend.append('number_plate', vn);
    return this.http.post(this.apiUrl+"visitor-by-number-plate/?access_token="+this.cookie.get('access_token'), tosend);
  }

  
  visitorDetails(vn){
    let tosend = new FormData();
    tosend.append('all', '0')
    tosend.append('number_plate', vn);
    return this.http.post(this.apiUrl+"visitor-by-number-plate/?access_token="+this.cookie.get('access_token'), tosend);

  }

  addVisitor(card_number,name,address,mobile,number_plate,destination,purpose,outtime,intime){
    let tosend = new FormData();
    tosend.append("card_number", card_number);
    tosend.append("name", name);
    tosend.append("address", address);
    tosend.append("mobile", mobile);
    tosend.append("number_plate", number_plate);
    tosend.append("destination", destination);
    tosend.append("purpose", purpose);
    tosend.append("outtime", outtime);
    tosend.append("intime", intime);
    return this.http.post(this.apiUrl+"visitor/?access_token="+this.cookie.get('access_token'), tosend);
  }

  updateVisitor(card_number,name,address,mobile,number_plate,destination,purpose,outtime,intime, id){
    let tosend = new FormData();
    tosend.append("card_number", card_number);
    tosend.append("name", name);
    tosend.append("address", address);
    tosend.append("mobile", mobile);
    tosend.append("number_plate", number_plate);
    tosend.append("destination", destination);
    tosend.append("purpose", purpose);
    tosend.append("outtime", outtime);
    tosend.append("intime", intime);
    return this.http.put(this.apiUrl+"visitor-detail/"+id+"/?access_token="+this.cookie.get('access_token'), tosend);
  }



  visitorEditDetail(id){
    return this.http.get(this.apiUrl+"visitor-detail/"+id+"/?access_token="+this.cookie.get('access_token'));
  }

  testService(){
  	console.log("Test SuccessFul");
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
