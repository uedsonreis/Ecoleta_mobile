import api from '../../services/api'

import { Item, Point } from '../../domain/entities'

class Actions {

    public async getItems(): Promise<Item[]> {
        return await api.getItems()
    }

    public async getPoints(uf: string, city: string, items: Item[]): Promise<Point[]> {
        return await api.getPoints(uf, city, items)
    }

    public contains(list: Item[], item: Item): boolean {
        return list.find(i => i.id === item.id) !== undefined
    }

    public select(list: Item[], item: Item): Item[] {
        if (this.contains(list, item)) {
            return list.filter(i => i.id !== item.id)
        } else {
            return [ ...list, item ]
        }
    }

}

export default new Actions()