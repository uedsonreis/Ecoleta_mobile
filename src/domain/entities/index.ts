
export interface Item {

    id: number
    title: string
    imageUrl: string
}

export interface Point {

    id: number
    name: string
    image: string
    imageUrl: string
    email: string
    whatsapp: string
    latitude: number
    longitude: number
    city: string
    uf: string
    items: Item[]
}