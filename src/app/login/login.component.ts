import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  
})
export class LoginComponent  implements OnInit {
  // hide = true;
  //   email = new FormControl('', [Validators.required, Validators.email]);
  
    // getErrorMessage() {
    //   if (this.email.hasError('required')) {
    //     return 'You must enter a value';
    //   }
  
    //   return this.email.hasError('email') ? 'Not a valid email' : '';
    // }
    public loginForm!:FormGroup
  //  public userlogedIn=false;
  constructor(private fomBuilder:FormBuilder,private http:HttpClient,private router:Router) { }

  ngOnInit() {
    this.loginForm=this.fomBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
  login(){
this.http.get<any>('http://localhost:3000/signupUsers').subscribe(res=>{
  const user=res.find((a:any)=>{
return a.email===this.loginForm.value.email && a.password===this.loginForm.value.password 
  });
  if(user){
   // this.userlogedIn=true;
    alert("login");
    let tokenData=Math.random()
    localStorage.setItem('token',tokenData.toString())
    this.loginForm.reset();
    this.router.navigate(['dashboard'])
  }else{
    alert("user not found")
  }
},err=>{
  alert("something went wrong")
})
  }

}
