import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { SongcrudService } from '../core/songcrud.service';
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
    private songcrudService: SongcrudService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.id = this.activatedroute.snapshot.params.id;
    this.songcrudService.read_Song().subscribe(data => {
      let songs = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          singer: e.payload.doc.data()['singer'],
          name: e.payload.doc.data()['name'],
          genre: e.payload.doc.data()['genre'],
          date: e.payload.doc.data()['date'],
          cover: e.payload.doc.data()['cover']
        };
      })
      console.log(songs);

      songs.forEach(element => {
        if (element.id == this.id)  {
          this.song = element;
        }
      });
    });
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
            this.songcrudService.delete_Song(id);
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
