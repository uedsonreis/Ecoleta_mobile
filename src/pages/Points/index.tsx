import React, { useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View, Image, Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import MapView, { Marker } from 'react-native-maps'
import { SvgUri } from 'react-native-svg'
import * as location from 'expo-location'

import BackButton from '../../components/BackButton'
import { Item, Point } from '../../domain/entities'

import actions from './actions'
import styles from './styles'

export default function Points() {
    const navigation = useNavigation()
    const route = useRoute()
    
    const { state, city } = route.params as { state: string, city: string }

    const [items, setItems] = useState<Item[]>([])
    const [selectedItems, setSelectedItems] = useState<Item[]>([])
    const [position, setPosition] = useState<[number, number]>([ 0, 0 ])
    const [points, setPoints] = useState<any[]>([])

    useEffect(() => {
        location.requestPermissionsAsync().then(response => {
            if (response.status !== 'granted') {
                Alert.alert('Localização Negada', 'Sem sua localização não podemos filtrar os Pontos de Coleta no mapa.')
            } else {
                location.getCurrentPositionAsync().then(position => {
                    const { latitude, longitude } = position.coords
                    setPosition([ latitude, longitude ])
                })
            }
        })

        actions.getItems().then(items => {
            actions.getPoints(state, city, items).then(points => {
                setPoints(points)
            })
            setItems(items)
        })
    }, [])

    useEffect(() => {
        const filterItems = (selectedItems.length > 0) ? selectedItems : items
        actions.getPoints(state, city, filterItems).then(points => {
            setPoints(points)
        })
    }, [selectedItems])

    function handleSelectedItem(item: Item) {
        setSelectedItems([ ...actions.select(selectedItems, item) ])
    }

    function handleGoToDetail(point: Point) {
        navigation.navigate('detail', point)
    }

    return (
        <>
            <View style={styles.container}>
                <BackButton navigation={navigation} />

                <Text style={styles.title}>Bem vindo!</Text>
                <Text style={styles.description}>Encontro no mapa um ponto de coleta.</Text>

                <View style={styles.mapContainer}>
                    { position[0] !== 0 &&
                        <MapView
                            style={styles.map}
                            initialRegion={{ latitude: position[0], longitude: position[1], latitudeDelta: 0.014, longitudeDelta: 0.014 }}
                        >
                            {points.map(point => (
                                <Marker
                                    key={String(point.id)}
                                    onPress={() => handleGoToDetail(point)}
                                    coordinate={{ latitude: Number(point.latitude), longitude: Number(point.longitude) }}
                                >
                                    <View style={styles.mapMarkerContainer}>
                                        <Image style={styles.mapMarkerImage} source={{ uri: point.image }} />
                                        <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                                    </View>
                                </Marker>
                            ))}
                        </MapView>
                    }
                </View>
            </View>

            <View style={styles.itemsContainer}>
                <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }} showsHorizontalScrollIndicator={false} horizontal>
                    {items.map(item => (
                        <TouchableOpacity
                            key={String(item.id)}
                            style={[ styles.item, (actions.contains(selectedItems, item)) ? styles.selectedItem : {}]}
                            activeOpacity={0.5}
                            onPress={() => handleSelectedItem(item)}
                        >
                            <SvgUri width={42} height={42} uri={item.imageUrl} />
                            <Text style={styles.itemTitle}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </>
    )
}