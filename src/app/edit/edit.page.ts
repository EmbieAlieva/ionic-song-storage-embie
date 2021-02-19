import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { SongcrudService } from '../core/songcrud.service';
import { ISong } from '../shared/interfaces';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  id: string;
  editedSong: ISong;
  public song: ISong;
  songForm: FormGroup;

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
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
          this.songForm.get('singer').setValue(this.song.singer);
          this.songForm.get('name').setValue(this.song.name);
          this.songForm.get('genre').setValue(this.song.genre);
          this.songForm.get('date').setValue(this.song.date);
          this.songForm.get('cover').setValue(this.song.cover);
        }
      });
    });
    this.songForm = new FormGroup({
      singer: new FormControl(''),
      name: new FormControl(''),
      genre: new FormControl(''),
      date: new FormControl(''),
      cover: new FormControl(''),
    });  
  }

  async editRecord(id) {
    const toast = await this.toastController.create({
      header: 'Editar canción',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'create',
          text: 'ACEPTAR',
          handler: () => {
            this.editSong();
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

  editSong() {  
    this.editedSong = this.songForm.value;
    let nextKey = this.song.id.trim();
    this.editedSong.id = nextKey;
    this.songcrudService.update_Song(nextKey, this.editedSong);
    console.warn(this.songForm.value);
  }
}
