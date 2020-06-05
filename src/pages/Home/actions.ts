import ibge from '../../services/ibge'

class Actions {

    public async getStates(): Promise<string[]> {
        const states = await ibge.getStates()
        return states.map(uf => uf.sigla)
    }

    public async getCities(uf: string): Promise<string[]> {
        const cities = await ibge.getCities(uf)
        return cities.map(c => c.nome)
    }

}

export default new Actions()