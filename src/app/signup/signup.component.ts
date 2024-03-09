import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent  implements OnInit {
  public signupForm!:FormGroup
  constructor(private formBuilder:FormBuilder, private http:HttpClient,private router:Router) { }

  ngOnInit() {
    this.signupForm=this.formBuilder.group({
name:['',Validators.required],
email:['',Validators.required],
password:['',Validators.required],
phoneNumber:['',Validators.required]

  })
  }
  signUp(){
this.http.post<any>("http://localhost:3000/signupUsers",this.signupForm.value).subscribe((res)=>{
  alert("signup successfull");
  this.signupForm.reset();
  console.log(res)
  this.router.navigate(['login'])
},err=>{
  {alert("signup failed")}
})
  }
}
