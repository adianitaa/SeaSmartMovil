import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function Back({ navigation }) {

    return (
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    backButton: {
        width: 50,
        backgroundColor: '#92DCF1', // Color de fondo del botón
        borderRadius: 25, // Redondeado
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});