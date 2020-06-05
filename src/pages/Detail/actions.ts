import * as MailComposer from 'expo-mail-composer'

import api from '../../services/api'

import { Item, Point } from '../../domain/entities'

class Actions {

    public async getPoint(point: Point): Promise<Point> {
        return await api.getPoint(point.id)
    }

    public mapToText(items: Item[]) {
        const titles = items.map((item, index) => {
            return (index === 0) ? item.title : " "+item.title
        })
        return titles.toString()
    }

    public sendMail(email: string, subject: string): void {
        MailComposer.composeAsync({ subject, recipients: [email] }).then(status => {
            console.log('Mail Status: ', status)
        })
    }

}

export default new Actions()