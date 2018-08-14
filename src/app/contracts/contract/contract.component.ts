import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { ContractService } from '../contract.service';
@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  uid = '';
  contract: any;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL = '';

  cur_file_uid = '';
  file_name = '';
  cur_file_created = '';
  cur_file_counts = 0;
  cur_uploaded_files = -1;
  progresses = [];

  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute,
    private db: AngularFireDatabase,
    private afStorage: AngularFireStorage,
    private contractService: ContractService,
    private firebase: AngularFireDatabase
  ) {
    this.uid = this.activeRouter.snapshot.params['uid'];
    var reff = this.db.database.ref('contracts/' + this.uid );
    var me = this;
    reff.once('value').then(function (snapshot) {
      console.log(snapshot.toJSON());
      me.contract = snapshot.toJSON();
    });
  }

  ngOnInit() {
  }

  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref('files/' + id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadProgress = this.task.percentageChanges();
    var me = this;
    this.task.then(function (data) {
      // me.downloadURL = data.ref.getDownloadURL()['i'];

      var a = data.ref.getDownloadURL();
      me.cur_file_uid = data.ref.name;
      me.cur_file_created = data.metadata.timeCreated;
      a.then(function (data) {
        me.downloadURL = data;
        me.pushfiledata();
      });
    });   

  }

  uploads(event){
    let files = event.target.files;
    let files_length = files.length;
    this.cur_file_counts = files_length;
    this.cur_uploaded_files = 0;
    this.progresses = [];
    for (let index = 0; index < this.cur_file_counts; index++) {
      this.progresses[index] = 0;
    }
    console.log(files_length);
    for(var i = 0; i < files_length; i++) {
      console.log(i);
      var id = Math.random().toString(36).substring(2);
      this.ref = this.afStorage.ref('files/' + id);
      this.task = this.ref.put(event.target.files[i]);
      this.progresses[i] = this.task.percentageChanges();
      var me = this;
      this.task.then(function (data) {
        var a = data.ref.getDownloadURL();
        var cur_file_uid = data.ref.name;
        var cur_file_created = data.metadata.timeCreated;
        a.then(function (data) {
          // me.downloadURL = data;
          me.contractService.insertContact(me.uid, cur_file_created, data, me.file_name, 0, cur_file_uid).then(
            function(res) {
              console.log(res.key);
              me.addchildfile(res.key, cur_file_created, data, me.file_name, 0, cur_file_uid);
            }
          );
          me.cur_uploaded_files ++;
        });
      });
    }
  }

  pushfiledata() {
   this.contractService.insertContact(this.uid, this.cur_file_created, this.downloadURL, this.file_name, 0, this.cur_file_uid);
  }

  addchildfile(key: string, createdDate: string, mediaUrl: string, name: string, type: number, uid: string) {
    var me = this;
    this.db.object('/contracts/' + this.uid + '/files/' + key)
      .update({
        contractId: me.uid,
        createdDate: createdDate,
        mediaUrl: mediaUrl,
        name: name,
        type: type,
        uid: uid,
        isprivate: 0
       });
    var event = new Date();
    var timestamp = event.toISOString();

    timestamp = timestamp.slice(0, -1);

    var gallery = this.firebase.list('/users/' + this.contract.agentId + '/gallery').push({
      mediaId: "",
      mediaUrl: mediaUrl,
      timestamp: timestamp,
      type: 0,
      lat: me.contract.lat,
      lng: me.contract.lng,
      address: me.contract.address
    }).then(function(data){
      me.db.object('/users/' + me .contract.agentId + '/gallery/' + data.key)
        .update({
          mediaId: data.key
        });
    });


    var galleryphotographer = this.firebase.list('/users/' + this.contract.photographerId + '/gallery').push({
      mediaId: "",
      mediaUrl: mediaUrl,
      timestamp: timestamp,
      type: 0,
      lat: me.contract.lat,
      lng: me.contract.lng,
      address: me.contract.address
    }).then(function (data) {
      me.db.object('/users/' + me.contract.photographerId + '/gallery/' + data.key)
        .update({
          mediaId: data.key
        });
    });
  }
}
