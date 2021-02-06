import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { SongdbService } from '../core/songdb.service';
import { ISong } from '../shared/interfaces';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class DetailsPage implements OnInit {

  id: string;
  public song: ISong;

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private songdbService: SongdbService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.id = this.activatedroute.snapshot.params.id;
    this.songdbService.getItem(this.id).then(
      (data:ISong) => this.song = data
    );
  }

  editRecord(song)  {
    this.router.navigate(['edit', song.id])
  }

  async removeRecord(id) {
    const toast = await this.toastController.create({
      header: 'Eliminar canción',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'delete',
          text: 'ACEPTAR',
          handler: () => {
            this.songdbService.remove(id);
            this.router.navigate(['home']);
          }
        },
        {
          text: 'CANCELAR',
          role: 'cancle',
          handler: () => {
            console.log('Cancel clicked');;
          }
        }
      ]
    });
    toast.present();
  }
}
