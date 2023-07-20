

export type AuthProvider= "google"
export type BasketProduct ={
    ordered_quantity: number
    color: ColorVariant 
    size ? : SizeVariant
    
}&Product

export type GoogleUser = {
    id: string;
    name: string | null;
    email: string;
    photo: string | null;
    familyName: string | null;
    givenName: string | null;
    scopes?: string[];
    idToken: string | null;
    serverAuthCode: string | null;
}
export type User = {
    id : string 
    image? : string 
    name : string
    email ?: string 
    address ? : string 
    created_at : string 
    favorite_products : Product []
    orders : Order []  
    tokens ?: AuthCredentials

    
}
export type AuthCredentials = {
    access: {
        token: string 
        expiresIn : number 
    }, 
    refresh:{
        token : string 
    }
}

export type Product = {
    id: string;
    name: string;
    rating: number;
    description ? : string 
    price: number;
    address : string 
    image: string;
    quantity: number;
    size_variants: SizeVariant[];
    colors: ColorVariant[]
    likedBy ?: User[]
    _count ? :{
        liked_by: number
    }
}

export enum SizeVariant {
    L="L",
    M="M",
    S="S"
}
export enum ColorVariant {
    blue="blue",
    red="red",
    green="green",
    white="white",
    black="black",
   
}
export type  Category = {
    name :  string 
    image ? : string | null  
    products :Product[]
}

export type Order =  {
    id     :         string           
    date   :         string         
    user    :        User             
    amount   :       number             
    payment_status :PaymentIntentStatus
    address ?: string 
    type       :     string[]
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
  
enum PaymentIntentStatus {
    canceled = "canceled", 
    processing = "processing", 
    requires_action= "requires_action", 
    requires_capture= "requires_capture", 
    requires_confirmation= "requires_confirmation", 
    requires_payment_method= "requires_payment_method", 
    succeeded= "succeeded", 
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
  
  