import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import SimpleButton from '../Buttons/SimpleButton';
import * as Constantes from '../../utils/Constantes';

const ModalEditarCantidad = ({ setModalVisible, modalVisible, idDetallePedido, idDetalleProducto, cantidadProductoCarrito, getDetalleCarrito, nuevaCantidad, setNuevaCantidad, existencias }) => {

  const ip = Constantes.IP;

  // La función handleUpdateDetalleCarrito permite actualizar un detalle de pedido con una nueva cantidad de producto.
  const handleUpdateDetalleCarrito = async () => {
    try {
      // Se calcula la diferencia entre las existencias disponibles y las existencias requeridas por el usuario.
      if (nuevaCantidad <= (existencias + cantidadProductoCarrito)) {
        // Se inicializa la constante dónde se almacenarán los valores para hacer la petición POST a la API.
        const formData = new FormData();
        formData.append('idDetallePedido', idDetallePedido);
        formData.append('idDetalleProducto', idDetalleProducto);
        formData.append('nuevaCantidad', nuevaCantidad);

        // Se realiza la petición hacia la API.
        const response = await fetch(`${ip}/SeaSmart/api/services/public/detalles_pedidos.php?action=updateDetail`, {
          method: 'POST',
          body: formData
        });

        // Se almacena la respuesta en la constante en formato JSON.
        const data = await response.json();

        // Si la respuesta es satisfactoria se ejecuta el código.
        if (data.status) {
          // Se muestra el mensaje.
          Alert.alert('Se actualizó el detalle del pedido');
          // Se vuelven a cargar los productos agregados al carrito.
          getDetalleCarrito();
        } 
        // Si la respuesta no es satisfactoria se ejecuta el código.
        else {
          // Se muestra el error con el mensaje.
          Alert.alert('Ocurrió un error al editar el detalle del pedido', data.error);
        }
        // Se oculta el modal.
        setModalVisible(false);
      } 
      // Si el valor de la cantidad es mayor a las existencias se muestra el mensaje.
      else {  
        alert("Seleccione un máximo "+ (existencias + cantidadProductoCarrito) +" de existencias");
      }
    } catch (error) {
      Alert.alert("Error en editar carrito", JSON.stringify(error));
      setModalVisible(false);
    }
  };

  // La función cambiarCantidad permite cambiar el valor del texto mostrado al usuario (Texto con la cantidad seleccionada).
  const cambiarCantidad = (operacion) => {
    // Se valida que el valor mínimo seleccionado sea 1.
    if (operacion == -1 && nuevaCantidad > 1) {
      // Si el valor ingresado es mayor a 1 se decrece la cantidad seleccionada.
      setNuevaCantidad(nuevaCantidad - 1);
    } 
    // Si la operación es de suma (Agregar más cantidad) se aumenta la cantidad seleccionada.
    else if (operacion == +1) {
      setNuevaCantidad(nuevaCantidad + 1);
    }
  }

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <TouchableOpacity style={styles.centeredView} activeOpacity={1} onPress={() => setModalVisible(!modalVisible)}>
        <TouchableOpacity style={styles.modalView} activeOpacity={1}>

          <Text style={styles.modalText}>Cantidad actual: {cantidadProductoCarrito}</Text>

          <View style={styles.containerCantidad}>
            <Text style={styles.modalText}>Nueva cantidad:</Text>
            <View style={styles.containerCantidad}>
              <TouchableOpacity onPress={() => cambiarCantidad(-1)}>
                <Image source={require('../../../assets/minus.png')} style={styles.image} />
              </TouchableOpacity>
              <Text style={styles.textoCantidad}>{nuevaCantidad}</Text>
              <TouchableOpacity onPress={() => cambiarCantidad(+1)}>
                <Image source={require('../../../assets/plus.png')} style={styles.image} />
              </TouchableOpacity>
            </View>
          </View>
          
          <SimpleButton textoBoton={'Actualizar cantidad'} accionBoton={handleUpdateDetalleCarrito}/>

        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalEditarCantidad;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: 200,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  containerCantidad: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20
  },
  image: {
    height: 40,
    width: 40
  },
  textoCantidad: {
    fontSize: 20
  }
});
