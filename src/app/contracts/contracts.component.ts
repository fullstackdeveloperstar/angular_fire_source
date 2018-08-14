import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {
  contracts = [];
  constructor(
    private db: AngularFireDatabase,
    private router: Router,
  ) { }

  ngOnInit() {
    var ref = this.db.database.ref('contracts');
    var me = this;
    ref.once('value').then(function (snapshot) {
      // console.log(snapshot.toJSON());
      var x = snapshot.toJSON();
      snapshot.forEach(item => {
        me.contracts.push(item.toJSON());
      });
      me.contracts.reverse();
    });
  }

  gotocontract(uid) {
    console.log(uid);
    this.router.navigate(['/contract/' + uid]);
  }

}
