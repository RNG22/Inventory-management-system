import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isloggedIn() {
    //let flag = false;
    // console.log(localStorage.key)
    // if (localStorage.getItem("token") != '' && localStorage.getItem("token") != undefined) {
    //   flag = true;
    // }
    // return flag;

    return (localStorage.getItem("token") != '' && localStorage.getItem("token") != undefined) ? true:false;
   // return flag;
    // return !!localStorage.getItem('token');
  }
}
