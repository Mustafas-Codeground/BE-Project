import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-towed-list',
  templateUrl: './towed-list.page.html',
  styleUrls: ['./towed-list.page.scss'],
})
export class TowedListPage implements OnInit {

towedVehicles=[];

  constructor(private apiService:ApiService,
              private modalCtrl: ModalController,
              private router: Router) { }

  async openModal(vehicle) {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps:{
        'vehicle':vehicle
      }
      
    
    });

     modal.present();
  }


  ngOnInit() {
  	let body = {
    	get: 'towedVehicles'
    };

  	this.apiService.post('towedList.php', body).subscribe(data =>{
    	console.log(data);
    	this.towedVehicles=data.list; 
  	});
  }
  clicked(towedVehicle): void {
  
    this.router.navigate(['/home']);
  }

}
