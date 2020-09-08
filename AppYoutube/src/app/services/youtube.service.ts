import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { YoutubeResponse } from '../models/youtube.models';


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyA0lPNRZtVbpf8Sz_HeWbPVYlDZhn2mOOI';
  private playlistId = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken = '';
  private maxResults = '10';

  constructor( private http: HttpClient ) { }

  getVideos(){

    const url = `${this.youtubeUrl}/playlistItems`;

    const params = new HttpParams()
      .set('part', 'snippet')
      .set('key', this.apiKey)
      .set('playlistId', this.playlistId)
      .set('maxResults', this.maxResults)
      .set('pageToken', this.nextPageToken);

    return this.http.get<YoutubeResponse>(url, { params })
      .pipe(
        map(resp => {
          this.nextPageToken = resp.nextPageToken;
          return resp.items;
        }),
        map(items => items.map( video => video.snippet ))
      );
  }
}
