
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, Dimensions  } from 'react-native';
import { useState } from 'react';
export default function SimpleButton({ textoBoton, accionBoton, colorBoton, colorTexto, anchoBoton }) {

    return(
        <TouchableOpacity style={[styles.button, { backgroundColor: colorBoton != undefined ? colorBoton : '#3E88DE' , borderColor: colorBoton != undefined ? colorBoton : '#3E88DE', width: anchoBoton != undefined ? anchoBoton + '%' : '80%' }]} onPress={accionBoton != undefined ? accionBoton : null}>
            <Text style={[styles.buttonText, { color: colorTexto != undefined ? colorTexto : '#FFF' }]}>{textoBoton}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    button: {
        borderWidth: 1,
        borderRadius: 20,
        padding: 7,
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 17
    }
});