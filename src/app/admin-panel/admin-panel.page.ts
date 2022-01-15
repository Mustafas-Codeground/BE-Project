import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddUserPage } from '../add-user/add-user.page';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.page.html',
  styleUrls: ['./admin-panel.page.scss'],
})
export class AdminPanelPage implements OnInit {
  get;
  getname;
  constructor(private modalCtrl: ModalController,
    private apiservice: ApiService,
  private router : Router) { }

  async Modal(g) {
    if(g){
      const modal = await this.modalCtrl.create({
        component: AddUserPage,   
        initialBreakpoint: 0.6,
        breakpoints: [0, 0.3, 0.5, 0.8],
        cssClass: 'adduserModal-css',
        componentProps: {
          obj : g,
          isEdit : false
        }
      });
      await modal.present();
    }
    else{
      const modal = await this.modalCtrl.create({
        component: AddUserPage,   
        breakpoints: [0, 0.3, 0.5, 0.8],
        initialBreakpoint: 0.6,
        cssClass: 'adduserModal-css',
        componentProps: {
          obj : g,
          isEdit : true
        }
      });
      await modal.present();
    }
    
    
  }

  // openModal() {
  //   console.log("clicked...........")
  // }
  ngOnInit() {
    let body = {
      get: 'userList'
    };
    this.apiservice.post('userList.php', body).subscribe(data => {
      console.log(data);
      this.get = data.list;

    });
  }

  clicked(getname) {
    this.router.navigate(['/home'], { queryParams: { id: getname }} );
  }

}