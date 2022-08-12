import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { window } from 'rxjs';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  recommendProduct:any;
  sliderImg:any = [];
  data:any;
  listProduct:any;
  listCategory:any;
  quantity:number = 1;

  constructor(private productService:ProductService,private actRoute:ActivatedRoute,private route:Router,private cartService:CartService) { }

  ngOnInit(): void {
    let _id = this.actRoute.snapshot.params['id'];

    this.productService.getAll().subscribe((data)=>{
       let a = data.find((item)=>{
        return item.id == _id
      })
      this.listProduct = a;
      this.sliderImg = a?.allImg;
    })
    let id:any;
    this.actRoute.paramMap.subscribe(params =>{
      id = params.get('id')
      // if (id == 1|| id ==2 || id==3||id==4||id==5||id==6||id==7||id==8||id==9||id==10||id==11||id==12) {
      //   this.productService.getFilterList(id).subscribe((data) => {
      //     this.listCategory= data;
      //   });
      // } else {
      //   this.productService.getAll().subscribe((data) => {
      //     this.listCategory= data;
      //   });
      // }
    })
    this.productService.getAll().subscribe((data:any)=>{
      let dataProduct:any = data.find((dataProduct:any)=>{
        return id == dataProduct.id
      })
      this.listCategory = data.filter((item:any)=>{
        // console.log(item);
        return dataProduct.category_id == item.category_id
      })
      // console.log(id);
    })
    
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    autoplay:true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }
  reload(id:number):void{
    
    document.documentElement.scrollTop = 0;
    this.route.navigate([`/detail/${id}`]);
    this.productService.getAll().subscribe((data:any)=>{
      this.listProduct =  data.find((item:any)=>{
        return item.id ==id
      })
      this.sliderImg = this.listProduct.allImg;
    })
    
  }
  giamQuantity(){
    this.quantity = this.quantity - 1;
    if(this.quantity <= 0){
      this.quantity = 1
    }
  }
  tangQuantity(){
    this.quantity = this.quantity + 1;
  }
  addToCart(product:any){
    this.cartService.add(product)
    this.route.navigate(['/carts'])
  }
}
