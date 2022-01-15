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
towedVehicle;




  constructor(private apiService:ApiService,
              private modalCtrl: ModalController,
              private router: Router) { }

  async openModal(vehicle) {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      initialBreakpoint: 0.5,
      breakpoints: [0,0.5,1],
      componentProps:{
        'vehicle' : vehicle
      },
    
      
    });

    await modal.present();
  }


  ngOnInit() {
  	let body = {
    	get: 'towedVehicles'
    };

  	this.apiService.post('towedList.php', body).subscribe(data =>{
    	console.log(data);
    	this.towedVehicles = data.list; 
      this.towedVehicle =this.towedVehicles;
    
  	});
  }
  clicked(towedVehicle): void {
  
    this.router.navigate(['/home']);
  }
  get(e:any) {
    var val = e.target.value;

    this.towedVehicles=this.towedVehicle;
    if(val && val.trim() != ''){
      this.towedVehicles = this.towedVehicles.filter((towedVehicle:any) => {
        return (towedVehicle.regn.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  
}

