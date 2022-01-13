import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {

  @Input() obj: any;
  perName;
  mobNum;
  constructor(private router:Router) {
  }
  
  ngOnInit() {
    console.log('Recieved: ', this.obj);
    this.perName = this.obj.name;
    this.mobNum = this.obj.contact;
  }

  submit() {
    this.router.navigate(['/home']);
  }
}