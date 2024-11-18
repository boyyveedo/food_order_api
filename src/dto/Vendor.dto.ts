export interface CreateVendorInput {
    name: string;
    ownerName: string;
    foodType: [string];
    pincode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    serviceAvailable: boolean
    rating: number

}


export interface VendorLoginInput {
    email: string;
    password: string;
}