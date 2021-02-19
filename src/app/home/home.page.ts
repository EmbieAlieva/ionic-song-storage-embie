import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SongcrudService } from '../core/songcrud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  songs: any;
  songSinger: string;
  songName: string;   
  songGenre: string;
  songDate: string;
  songCover: string;

  constructor( private songcrudService: SongcrudService, private router: Router ) { }

  songTapped(song) {
    this.router.navigate(['details', song.id]);
  }

  ngOnInit(): void {
    this.songcrudService.read_Song().subscribe(data => {
      this.songs = data.map(e => {
        return {
          id: e.payload.doc.id,
          idEdit: false,
          singer: e.payload.doc.data()['singer'],
          name: e.payload.doc.data()['name'],
          genre: e.payload.doc.data()['genre'],
          date: e.payload.doc.data()['date'],
          cover: e.payload.doc.data()['cover']
        };
      })
        console.log(this.songs);
      });    
  }

 /* CreateRecord() {
    let record = {};
    record['singer'] = this.songSinger;
    record['name'] = this.songName;
    record['genre'] = this.songGenre;
    record['date'] = this.songDate;
    record['cover'] = this.songCover;

    this.songcrudService.create_Song(record).then(resp => {
      this.songSinger = "";
      this.songName = "";
      this.songGenre = "";
      this.songDate = "";
      this.songCover = "";
      console.log(resp);
    })
    .catch(error => {
      console.log(error);
    })
  }

  RemoveRecord(rowID) {
    this.songcrudService.delete_Song(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditSinger = record.singer;
    record.EditName = record.name;
    record.EditGenre = record.genre;
    record.EditDate = record.date;
    record.EditCover = record.cover;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['singer'] = recordRow.EditSinger;
    record['name'] = recordRow.EditName;
    record['genre'] = recordRow.EditGenre;
    record['date'] = recordRow.EditDate;
    record['cover'] = recordRow.EditCover;

    this.songcrudService.update_Song(recordRow.id, record);
    recordRow.isEdit = false;
  }*/
}
