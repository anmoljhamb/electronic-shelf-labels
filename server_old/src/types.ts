export interface Product {
    productId: string;
    price: number;
}

export interface DataInterface {
    [key: string]: { price: string; time: string }[];
}

export interface ProductInterface {
    productId: string;
    price: string;
    desc: string;
    title: string;
}

export interface DevicesInterface {
    [key: string]: ProductInterface;
}

export interface Customers {
    [key: string]: {
        email: string;
        cart: string[];
    };
}
