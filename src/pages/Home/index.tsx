import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, KeyboardAvoidingView, Text, View, TextInput, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Feather as Icon } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'
import PickerSelect from 'react-native-picker-select'

import actions from './actions'
import styles from './styles'

export default function Home() {

    const navigation = useNavigation()

    const [states, setStates] = useState<string[]>([])
    const [cities, setCities] = useState<string[]>([])

    const [selectedState, setSelectedState] = useState<string>('')
    const [selectedCity, setSelectedCity] = useState<string>('')

    useEffect(() => {
        actions.getStates().then(states => {
            setStates(states)
        })
    }, [])

    useEffect(() => {
        actions.getCities(selectedState).then(cities => {
            setCities(cities)
        })
    }, [selectedState])

    function handleGoToPoints() {
        navigation.navigate('points', { state: selectedState, city: selectedCity })
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ImageBackground
                style={styles.container} imageStyle={{ width: 274, height: 368 }}
                source={require('../../assets/home-background.png')}
            >
                <View style={styles.main}>
                    <Image source={require('../../assets/logo.png')} />
                    <View>
                        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
                        <Text style={styles.description}>
                            Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
                        </Text>
                    </View>
                </View>

                <View style={styles.footer}>

                    <PickerSelect
                        value={selectedState} onValueChange={(text) => setSelectedState(text)}
                        placeholder={{ label: "Selecione um Estado", value: ''}}
                        items={states.map(state => ({ label: state, value: state, key: state }))}
                        style={{ inputIOS: styles.input, inputAndroid: styles.input }}
                    />

                    <PickerSelect
                        value={selectedCity} onValueChange={(text) => setSelectedCity(text)}
                        placeholder={{ label: "Selecione uma Cidade", value: ''}}
                        items={cities.map(city => ({ label: city, value: city, key: city }))}
                        style={{ inputIOS: styles.input, inputAndroid: styles.input }}
                    />

                    <RectButton style={styles.button} onPress={handleGoToPoints}>
                        <View style={styles.buttonIcon}><Icon name="arrow-right" color="#fff" size={24} /></View>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </RectButton>
                </View>

            </ImageBackground>
        </KeyboardAvoidingView>
    )
}
