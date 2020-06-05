import React, { useEffect, useState } from 'react'
import { Image, Linking, SafeAreaView, Text, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather, FontAwesome } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'
import { AppLoading } from 'expo'

import BackButton from '../../components/BackButton'
import { Point } from '../../domain/entities'

import actions from './actions'
import styles from './styles'

export default function Detail() {
    const navigation = useNavigation()
    const route = useRoute()

    const [point, setPoint] = useState<Point>({} as Point)

    useEffect(() => {
        actions.getPoint(route.params as Point).then(point => {
            setPoint(point)
        })
    }, [])

    if (!point.items) return <AppLoading />

    function handleComposeMail() {
        actions.sendMail(point.email, 'Interesse na coleta de resíduos')
    }

    function handleWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=55${point.whatsapp}`)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <BackButton navigation={navigation} />

                <Image style={styles.pointImage} source={{ uri: point.imageUrl }} />
                <Text style={styles.pointName}>{point.name}</Text>
                <Text style={styles.pointItems}>{actions.mapToText(point.items)}</Text>

                <View style={styles.address}>
                    <Text style={styles.addressTitle}>Endereço</Text>
                    <Text style={styles.addressContent}>{point.city}, {point.uf}</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={handleWhatsapp}>
                    <FontAwesome name="whatsapp" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Whatsapp</Text>
                </RectButton>

                <RectButton style={styles.button} onPress={handleComposeMail}>
                    <Feather name="mail" size={20} color="#fff" />
                    <Text style={styles.buttonText}>E-mail</Text>
                </RectButton>
            </View>
        </SafeAreaView>
    )
}