import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'

interface Props { navigation: any }

export default function BackButtun(props: Props) {

    function handleGoBack() {
        props.navigation.goBack()
    }

    return (
        <TouchableOpacity onPress={handleGoBack}>
            <Icon name="arrow-left" size={24} color="#34cb79" />
        </TouchableOpacity>
    )
}