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
