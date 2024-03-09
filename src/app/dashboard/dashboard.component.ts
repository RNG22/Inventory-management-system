//import { Component, OnInit } from '@angular/core';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

import { OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent  implements OnInit {
  displayedColumns: string[] = ['productName', 'category', 'date', 'freshness','price','comment','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private api:ApiService,private router:Router) {}
  ngOnInit(): void {
    this.getAllProducts()
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
    
    width:'30%',
    }).afterClosed().subscribe(val=>{
     if(val=="save") {
      this.getAllProducts()
     }
    });
  }
  getAllProducts(){
    this.api.getProduct().subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
        console.log(res)
      },
      error:(err)=>{
        alert("error while getting the data")
      }
    })
  }
  editProduct(row:any){
    console.log("t")
this.dialog.open(DialogComponent,{
  width:'30%',
  data:row
}).afterClosed().subscribe(val=>{
  if(val=="update") {
   this.getAllProducts()
  }
 });
  }
  deleteProduct(id:number){
    this.api.deleteProduct(id).subscribe({
next:(res)=>{
  alert("product deleted successfully")
  this.getAllProducts();
},
error:()=>{
 alert("error occured while deleting product") 
}
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  logout(){
    this.router.navigate(['login']);
    localStorage.clear();

  }
}

