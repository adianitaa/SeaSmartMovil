import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SimpleButton from '../Buttons/SimpleButton';

const PedidoCard = ({ direccion, estado_pedido, fecha_pedido, precio_total, onPressVerDetalles, id_pedido }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}><Text style={styles.label}>Fecha de pedido: </Text>{fecha_pedido}</Text>
      <Text style={styles.text}><Text style={styles.label}>Estado:</Text> {estado_pedido}</Text>
      <Text style={styles.text}><Text style={styles.label}>Dirección:</Text> {direccion}</Text>
      <Text style={styles.text}><Text style={styles.label}>Total de pedido:</Text> ${precio_total}</Text>
      <SimpleButton
        textoBoton={'Ver detalles'}
        anchoBoton={'100'}
        colorBoton={'#92DCF1'}
        accionBoton={() => onPressVerDetalles(id_pedido)}
      />
    </View>
  );
}; 

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowRadius: 15,
    elevation: 5,
  },
  text: {
    fontSize: 20,
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
});

export default PedidoCard;