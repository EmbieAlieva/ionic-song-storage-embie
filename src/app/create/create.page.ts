import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { SongdbService } from '../core/songdb.service';
import { ISong } from '../shared/interfaces';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  song: ISong;
  songForm: FormGroup;
  private hola: string;

  constructor(
    private router: Router,
    private songdbService: SongdbService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.songForm = new FormGroup({
      singer: new FormControl(''),
      name: new FormControl(''),
      genre: new FormControl(''),
      date: new FormControl(''),
      cover: new FormControl(''),
    });
    
  }

  async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Guardar canción',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.saveSong();
            this.router.navigate(['home']);
          }
        },
        {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  saveSong() {
    this.song = this.songForm.value;
    let nextKey = this.songdbService.getLastId().toString();
    this.song.id = nextKey;
    this.songdbService.setItem(nextKey, this.song);
    console.warn(this.songForm.value);
  }
}
