
export type BasketProduct ={
    ordered_quantity: number
}&Product

export type User = {
    id : string 
    image? : string 
    name : string
    email ?: string 
    created_at : string 
    favorite_products : Product []
    orders : Order []  

}


export type Product = {
    id: string;
    name: string;
    rating: number;
    description ? : string 
    price: number;
    image: string;
    quantity: number;
    size_variants: SizeVariant[];
    colors: ColorVariant[]
}

enum SizeVariant {
    L="L",
    M="M",
    S="S"
}
enum ColorVariant {
    blue="blue",
    red="red",
    green="green",
    white="white",
    black="black",
   
}
export type  Category = {
    name :  string 
    image ? : string    
    products :Product[]
}

export type Order =  {
    id     :         string           
    date   :         string         
    user    :        User             
    amount   :       number             
    checkout_url  :  string
    checkout_status: CheckoutStatus
    payment_status:  PaymentStatus
    type       :     string
    status:          OrderStatus
    products:       Product[]
    basket  :        OrderedProduct[]
}
export type OrderedProduct ={
    id_product : string 
    id_order:string 
    product: Product 
    order : Order 
    quantity : number 
    size ?: SizeVariant
    color : ColorVariant
}
  
enum CheckoutStatus {
    open = "open", 
    complete = "complete", 
    expired= "expired"
}
enum PaymentStatus {
    paid="paid",
    unpaid="unpaid", 
    no_payment_required="no_payment_required"
  }
enum OrderStatus {
    progress="progress",
    cancelled="cancelled",
    delivered="delivered"
 }
  
  