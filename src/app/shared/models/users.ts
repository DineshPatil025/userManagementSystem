export interface Iusers{
    fname:string;
    lname:string;
    email:string;
    mobnumber:number;
    address:Iaddress,
    userid?:string; 
 }
 
 interface Iaddress{
     street:string|number;
     city :string;
     state:string;
     country:string;
     pincode:number;
 }