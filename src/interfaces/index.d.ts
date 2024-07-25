export interface IProduct {
    id: number,
    created_at: string,
    title: string,
    category_id: ICategory,
    fabricator_id: IFabricator,
    media: string,
    description: string,
    price: number,
    quantity: number,
    weight: number
}

export interface ICategory {
    id: number,
    title: string,
    parent_id?: ICategory
}

export interface IHotDeal {
    id: number,
    created_at: string,
    start_date: string,
    end_date: string,
    title: string,
    description: string,
    category_id: ICategory,
    discount_percent: number,
}

export interface IFabricator {
    id: number,
    title: string
}

export interface IStatus {
    id: number,
    title: string,
    icon: string,
    description: string
}

export interface IOrder {
    id: number,
    order_date: string,
    total: number,
    delivery_address: string,
    user_id: IUser,
    status_id: IStatus
}

export interface IOrderItem {
    id: number,
    order_id: IOrder,
    product_id: IProduct,
    quantity: number,
}

export interface IUser {
    id: number,
    first_name: string,
    last_name: string
}
