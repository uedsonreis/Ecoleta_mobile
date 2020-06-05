import axios from 'axios'
import { Item, Point } from '../domain/entities'

class Service {

    private api = axios.create({
        baseURL: 'http://192.168.0.25:3333/'
    })

    public async getItems(): Promise<Item[]> {
        const response = await this.api.get('items')
        return response.data
    }

    public async getPoints(uf: string, city: string, items: Item[]): Promise<Point[]> {
        const stringItems = items.map(i => i.id).toString()
        const response = await this.api.get('points', { params: { uf, city, items: stringItems } })
        return response.data
    }

    public async getPoint(id: number): Promise<Point> {
        const response = await this.api.get('points/'+ id)
        return response.data
    }

}

export default new Service()