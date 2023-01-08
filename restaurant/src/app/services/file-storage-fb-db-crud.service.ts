import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileUpload } from '../files';
import { Observable } from 'rxjs';
import { pipe } from 'rxjs';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileStorageFbDbCrudService {
  private basePath = '/uploads';
  uploaded_imgs_paths: string[] = []
  how_many_to_upload = 0;
  number_of_uploaded = 0;

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {}

  pushFileToStorage(fileUpload: FileUpload, resolve: any): Observable<number | undefined>  {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
  
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          this.number_of_uploaded += 1;
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.uploaded_imgs_paths.push(fileUpload.url);
          if(this.number_of_uploaded == this.how_many_to_upload)
          {
            resolve(this.uploaded_imgs_paths);
          }
        });
      })
    ).subscribe();
  
    return uploadTask.percentageChanges();
  }

  public setHowManyToUpload(how_many: number)
  {
    this.how_many_to_upload = how_many;
  }

  public resetImgsPathsToUpload()
  {
    this.uploaded_imgs_paths = [];
    this.how_many_to_upload = 0;
    this.number_of_uploaded = 0;
  }

  public getBasePathToStorage()
  {
    return this.basePath;
  }

  public getFileRelativePathInStorage(full_path_to_file: string): string
  {
        const regexp = /\/uploads.*\?/;
        const match = full_path_to_file.match(regexp);

        let relative_path_to_img = "";

        if(match != null)
        {
          relative_path_to_img = match[0];
        }

        // change %2f to / and delete ? at the end

        relative_path_to_img = relative_path_to_img.replace("%2F", "/").slice(0, -1);
        // console.log("Mathcing path of img: " + relative_path_to_img);
        
        return relative_path_to_img;
  }
}
