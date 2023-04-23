export interface Product {
    productId: string;
    price: number;
}

export interface DataInterface {
    [key: string]: { price: string; time: string }[];
}
