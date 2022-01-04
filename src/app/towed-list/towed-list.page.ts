import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-towed-list',
  templateUrl: './towed-list.page.html',
  styleUrls: ['./towed-list.page.scss'],
})
export class TowedListPage implements OnInit {

towedVehicles=[];

  constructor(private apiService:ApiService) { }

  ngOnInit() {
  	let body = {
    	get: 'towedVehicles'
    };

  	this.apiService.post('towedList.php', body).subscribe(data =>{
    	console.log(data);
      console.log(data.list);
    	this.towedVehicles=data.list; 
  	});
  }

}
