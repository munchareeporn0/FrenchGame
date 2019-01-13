import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Http, Headers , RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
  items: any = [];
  key: string = 'items';
  url: string = 'https://jsonplaceholder.typicode.com/posts';

  constructor(public http: HttpClient, private storage: Storage) {
  }

  getData() {
    // let data:Observable<any> = this.http.get(this.url);

    // data.subscribe(result => {
    //   this.items = result;
    // })
    return new Promise((resolve, reject) => {
      return this.http.get(this.url).subscribe(
        (data) => {
          resolve(data);
        }, (error) => {
          reject(error)
        });

    })
  }

  saveData() {
    this.storage.set(this.key, JSON.stringify(this.items))
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );
  }

  loadData() {
    this.storage.get(this.key).then((val) => {
      if (val != null && val != undefined) {
        this.items = JSON.parse(val);
        console.log(this.items)
      }
    });
  }

//   postCall()
// {
//     let headers = new HttpHeaders(
//         {'Content-Type': 'application/json' 
//     });
//     let options = new RequestOptions({ headers: headers });    
//     let postParams = {
//         params :{
//           UserName: "munchareeporn_p@cmu.ac.th",
//           Password: "tequiilaxpolizz"
//       }
//     }

//     return new Promise((resolve, reject) => {
//       this.http.post('https://sis.cmu.ac.th/cmusis/API/User/checkUser',postParams,options)
//       .toPromise()
//       .then((response) =>
//       {
//         console.log('API Response : ', response.json());
//         resolve(response.json());

//       })
//       .catch((error) =>
//       {
//         console.error('API Error : ', error.status);
//         console.error('API Error : ', JSON.stringify(error));
//         this.postCall();
//         reject(error.json());
//       });
//     });
// };

}
