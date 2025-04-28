import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  private uploadUrl = 'https://upload-images-hosting-get-url.p.rapidapi.com/upload';
  private apiKey = environment.forumImageUploadApi;
  private hostHeader = 'upload-images-hosting-get-url.p.rapidapi.com';

  constructor(private http: HttpClient) {}

  uploadImageFromUrl(imageUrl: string, name: string = 'image.jpg'): Observable<any> {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': this.hostHeader,
    });

    const formData = new FormData();
    formData.append('image', imageUrl); // Assuming this is a valid URL or file
    formData.append('name', name);

    // Use multipart/form-data for image uploads
    return this.http.post(this.uploadUrl, formData, { headers });
  }
  
  
}
