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
    parent_id: ICategory
}

export interface IFabricator {
    id: number,
    title: string
}
