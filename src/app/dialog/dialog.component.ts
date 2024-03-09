import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent  


implements OnInit {
freshnessList=["brand new","second hand","Refurbished"];
//productForm:FormGroup;
productForm:FormGroup=new FormGroup({});
actionBtn:string="Save"
  constructor(private formBuilder:FormBuilder, private api:ApiService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef:MatDialogRef<DialogComponent>) { }

  ngOnInit():void {
    this.productForm=this.formBuilder.group({
      productName:['',Validators.required],
      category:['',Validators.required],
      freshness:['',Validators.required],
      price:['',Validators.required],
      comment:['',Validators.required],
      date:['',Validators.required],
      adresses:this.formBuilder.array([])
    })
    if(this.editData){
      this.actionBtn="Update"
      this.productForm.controls['productName'].setValue(this.editData.productName)
      this.productForm.controls['category'].setValue(this.editData.category)
      this.productForm.controls['freshness'].setValue(this.editData.freshness)
      this.productForm.controls['price'].setValue(this.editData.price)
      this.productForm.controls['comment'].setValue(this.editData.comment)
      this.productForm.controls['date'].setValue(this.editData.date)
    }
  }
  adressForms() {
    return this.productForm.get('adresses') as FormArray
  }
  
  addAdress() {
    const address = this.formBuilder.group({
    address1: [],
    address2: [],
    pinCode: []
  })
  this.adressForms().push(address);
  }
  
  deleteAdress(i:any) {
    this.adressForms().removeAt(i)
  }
  /////
  addProduct(){
  if(!this.editData){
    if(this.productForm.valid){
      this.api.postProduct(this.productForm.value).subscribe({
        next:(res)=>{
          alert("product added successsfully");
          this.productForm.reset();
          this.dialogRef.close("save");
        },
        error:()=>{
          alert("Error has occured while adding a product")
        }
      })
    }
  }else{
    this.updateProduct()
  }
 
   // console.log(this.productForm.value)
  }
  updateProduct(){
    this.api.putProduct(this.productForm.value,this.editData.id).subscribe({
      next:(res)=>{
        alert("product updated");
        this.productForm.reset();
        this.dialogRef.close('update')
      },error:()=>{
        alert("error while updating the record")
      }
    })
      }

}
