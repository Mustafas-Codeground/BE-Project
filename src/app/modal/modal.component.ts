import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() vehicle:any;

  constructor(private modalCtrl: ModalController,
              private router: Router) { }

  

  ngOnInit() {
    console.log(this.vehicle)
  }

_dismiss(){
  console.log("dismiss")
  this.modalCtrl.dismiss()
}



}
