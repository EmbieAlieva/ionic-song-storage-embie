import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SongdbService } from '../core/songdb.service';
import { ISong } from '../shared/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public songs: ISong[];
  songsinit: ISong[] = [
    {
      id: '1',
      singer: 'Alan Walker & ISÁK',
      name: 'Sorry',
      genre: 'Electro',
      date: '2021',
      cover: 'https://i.ytimg.com/vi/72agGC5b_Yo/maxresdefault.jpg'
    },
    {
      id: '2',
      singer: 'ATB, Topic, A7S',
      name: 'Your Love (9PM)',
      genre: 'Electro',
      date: '2021',
      cover: 'https://1.bp.blogspot.com/-eWxM4mFnIwg/YBFXldzJQPI/AAAAAAAAT34/cUw5fTjSZsUOixLkGefES6uqIw-8DdvaACLcBGAsYHQ/s640/topic%2Bsingle.jpg'     
    }
  ]

  constructor( private songdbService: SongdbService,  private router: Router ) { }

  ngOnInit(): void {
    // If the database is empty ser initial values
    this.inicialization();
  }

  ionViewDidEnter() {
    // Remove elements if it already has values
    if (this.songs !== undefined) {
      this.songs.splice(0);
    }
    this.retrieveValues();
  }

  inicialization() {
    if (this.songdbService.empty()) {
      this.songsinit.forEach(song => {
        this.songdbService.setItem(song.id, song);
      });
    }
  }

  retrieveValues() {
    // Retrieve values
    this.songdbService.getAll().then(
      (data) => this.songs = data
    );
  }

  songTapped(song) {
    this.router.navigate(['details', song.id]);
  }
}
