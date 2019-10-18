import { File,FileOriginal } from '@ionic-native/file/';
import { concat } from 'rxjs';
// import { MediaFile } from '@ionic-native/video-capture-plus/index';
import { Component, OnInit, ViewChild } from '@angular/core';
 
 // import { VideoCapturePlus, VideoCapturePlusOptions, MediaFile } from '@ionic-native/video-capture-plus/ngx';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture/ngx';
import { Storage } from '@ionic/storage';
import {Media, MediaObject} from '@ionic-native/media/ngx';


const MEDIA_FILE_KEYS = 'mediaFiles';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit {

  @ViewChild('MyVideo') MyVideo: any;
  mediaFiles: [];
  constructor(private mediaCapture: MediaCapture, private storage: Storage, private media: Media, private file: FileOriginal) {}

  ngOnInit() {

    // const options: VideoCapturePlusOptions = {
    //   limit: 1,
    //   highquality: true,
    //   portraitOverlay: 'assets/img/camera/overlay/portrait.png',
    //   landscapeOverlay: 'assets/img/camera/overlay/landscape.png'

    // };

    // this.videoCapturePlus.captureVideo(options)
    // .then((mediafile: MediaFile[]) => console.log(mediafile), error => console.error(error));
  }

  ionviewLoad() {
    this.storage.get(MEDIA_FILE_KEYS).then(res => {
    this.mediaFiles = JSON.parse(res) || [];
    });
  }

captureAudio() {
this.mediaCapture.captureAudio().then(res => {
this.storageMediaFile(res);
});
}


captureVideo() {
  const option: CaptureVideoOptions = {
  limit: 1,
  duration: 30
  };
  this.mediaCapture.captureAudio(option).then((res: MediaFile[]) => {
    const captureFile = res[0];
    console.log('my file : ' , captureFile);
    const fileName = captureFile.name;
    // const dir = captureFile..split('/');
    // dir.pop();
    // const fromDirectory = dir.join('/');
    const toDirectory = this.file.dataDirectory;
    // this.file.copyFile(fromDirectory, fileName, toDirectory, fileName).then(res1 => {
      //  const url = res1.nativeURL.replace(/^file:\/\//, '');
     //  this.storageMediaFile([{name: fileName, size: captureFile.size}]);
    });
}

  storageMediaFile(files) {
    console.log('file', files);
    this.storage.get(MEDIA_FILE_KEYS).then(res => {

    if (res) {
      let arr = JSON.parse(res);
      arr = arr.concat(files);
      this.storage.set(MEDIA_FILE_KEYS, JSON.stringify(files));
    } else {
      this.storage.set(MEDIA_FILE_KEYS, JSON.stringify(files));
    }
  });
  }

  playfile(myFile) {
    console.log('Play', File);
    if (myFile.name.indexOf('.wav') > -1) {
    const audioFile: MediaObject = this.media.create(myFile.localURL);
    audioFile.play();
    } else {
      const path = this.file.dataDirectory + myFile.name;
      const url = path.replace(/^file:\/\//, '');
      const video = this.MyVideo.nativeElement;
      video.src = url;
    }
  }
}
