import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ContractService {
  fileList: AngularFireList<any>;

  constructor(
    private firebase: AngularFireDatabase
  ) {
    this.fileList = firebase.list('/files');
   }

  insertContact(contractId: string, createdDate: string, mediaUrl: string, name: string, type: number, uid: string) {
    return this.fileList.push({
      contractId: contractId,
      createdDate: createdDate,
      mediaUrl: mediaUrl,
      name: name,
      type: type,
      uid: uid,
      isprivate: 0
    });

  }

  // updateContrackChilds(key: string, contractId: string, createdDate: string, mediaUrl: string, name: string, type: number, uid: string){
  //   var contractchilds = this.firebase.list('/contracts/' + contractId + '/files/' + key);
  //   contractchilds.update({
  //     contractId: contractId,
  //     createdDate: createdDate,
  //     mediaUrl: mediaUrl,
  //     name: name,
  //     type: type,
  //     uid: uid
  //   });
  // }

}
