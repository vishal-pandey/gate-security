import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(public mS:MainService,
  	public cookie:CookieService) { }

  ngOnInit() {
  	this.mS.testService();
  }

}
