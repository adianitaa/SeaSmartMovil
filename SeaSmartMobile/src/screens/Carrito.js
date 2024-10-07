import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, FlatList, Dimensions } from 'react-native';
import SimpleButton from '../components/Buttons/SimpleButton';
import { useFocusEffect } from '@react-navigation/native';
import * as Constantes from '../utils/Constantes';
import ModalEditarCantidad from '../components/Modales/ModalEditarCantidad';
import ModalSeleccionarDireccion from '../components/Modales/ModalSeleccionarDireccion';
import CarritoCard from '../components/Cards/CarritoCard';

export default function Carrito({ navigation }) {

  const [dataDetalleCarrito, setDataDetalleCarrito] = useState([]);
  const [idDetallePedido, setIdDetallePedido] = useState(null);
  const [idDetalleProducto, setIdDetalleProducto] = useState(null);
  const [cantidadProductoCarrito, setCantidadProductoCarrito] = useState(0);
  const [existenciaProducto, setExistenciaProducto] = useState(0);
  const [nuevaCantidad, setNuevaCantidad] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDireccionVisible, setModalDireccionVisible] = useState(false);
  const [dataDirecciones, setDataDirecciones] = useState([]);
  const [direccion, setDireccion] = useState('');
  const ip = Constantes.IP;

  // La acción useFocusEffect se ejecuta una vez que la pantalla se ha terminado de cargar (Similar a useEffect).
  useFocusEffect(
    // La función useCallBack ejecuta el código dentro de ella cada vez que se termina de cargar la pantalla.
    React.useCallback(() => {
      // Llamada a la función getDetalleCarrito.
      getDetalleCarrito();
      // Se manda a llamar a la función para obtener las direcciones del cliente.
      getDirecciones();
    }, [])
  );

  // La función getDirecciones carga los datos provenientes de la API dentro de la constante dataDirecciones.
  const getDirecciones = async () => {
    try {
      // Se realiza la petición para obtener las direcciones agregadas por el cliente.
      const response = await fetch(`${ip}/SeaSmart/api/services/public/direcciones.php?action=readAll`, {
        method: 'GET',
      });

      // Se almacena la respuesta en la constante en formato JSON.
      const data = await response.json();

      // Si la respuesta es satisfactoria se ejecuta el código.
      if (data.status) {
        // Se carga el conjunto de datos dentro la constante dataDirecciones.
        setDataDirecciones(data.dataset);
      }
      // Si la respuesta no es satisfactoria se ejecuta el código.
      else {
        // Se muestra el mensaje en consola.
        console.log("No hay direcciones disponibles")
      }
    } catch (error) {
      console.error(error, "Error desde Catcha");
      Alert.alert('Error', 'Ocurrió un error al cargar las direcciones');
    }
  }

  // Función para obtener los detalles del carrito desde la API.
  const getDetalleCarrito = async () => {
    try {
      // Se realiza la petición a la API para obtener los productos.
      const response = await fetch(`${ip}/SeaSmart/api/services/public/pedido.php?action=readCart`, {
        method: 'GET',
      });

      // Se almacena la respuesta en la constante en formato JSON.
      const data = await response.json();

      // Si la respuesta es satisfactoria se ejecuta el código.
      if (data.status) {
        // Se configura el valor de la variable DataDetalleCarrito.
        setDataDetalleCarrito(data.dataset);
      }
      // Si la respuesta no es satisfactoria se ejecuta el código.
      else {
        // Se muestra el mensaje en la consola.
        console.log("No hay detalles del carrito disponibles")
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert('Error', 'Ocurrió un error al cargar los productos del carrito');
    }
  };

  // Función para finalizar el pedido.
  const finalizarPedido = async (direccion) => {
    try {
      if (direccion == "") {
        Alert.alert('Seleccione una dirección', 'Asegúrese de seleccionar una dirección');
      } else {
        // Se inicializa la constante de tipo form dónde se almacenará la dirección antes de realizar la petición.
        const formData = new FormData();
        // Se almacena la dirección en la constante.
        formData.append('direccion', direccion);

        // Se realiza la petición hacia la API.
        const response = await fetch(`${ip}/SeaSmart/api/services/public/pedido.php?action=finishOrder`, {
          method: 'POST',
          body: formData
        });

        // Se almacena la respuesta en la constante en formato JSON.
        const data = await response.json();
        console.log(data);
        // Si la respuesta es satisfactoria se ejecuta el código.
        if (data.status) {
          // Se restablecen los valores de las constantes.
          setDataDetalleCarrito([]);
          setModalDireccionVisible(false);
          setDireccion('');
          // Se muestra el mensaje.
          Alert.alert('Pedido realizado', 'Pedido realizado correctamente');
        } else {
          console.log("Error", data.error)
        }
      }
    } catch (error) {
      console.error(error, "Error desde catch");
      Alert.alert('Error', 'Ocurrió un error al cargar los productos del carrito');
    }
  };

  // Función para manejar la modificación de un detalle del carrito
  const handleEditarDetalle = (idDetallePedido, cantidadDetalle, existencias, idDetalleProducto) => {
    // Se configuran los valores de las variables para preparar el modal que permite editar el detalle del pedido.
    setModalVisible(true);
    setIdDetallePedido(idDetallePedido);
    setIdDetalleProducto(idDetalleProducto);
    setCantidadProductoCarrito(cantidadDetalle);
    setNuevaCantidad(cantidadDetalle);
    setExistenciaProducto(existencias);
  };

  // Función renderItem carga una Card con la información del detalle del pedido.
  const renderItem = ({ item }) => (
    // Se manda a llamar el componente CarritoCard y se configuran los valores iniciales.
    <CarritoCard
      item={item}
      accionBotonDetalle={() => handleEditarDetalle(item.id_detalle_pedido, item.cantidad_producto, item.existencia_producto, item.id_detalle_producto)}
      updateDataDetalleCarrito={setDataDetalleCarrito} // Nueva prop para actualizar la lista
    />
  );

  function redirigirDirecciones() {
    Alert.alert('No se han agregado direcciones', 'Agregue una dirección para poder finalizar el pedido');
    navigation.navigate('Direcciones');
  }

  return (
    <View style={styles.container}>

      <ModalEditarCantidad
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        idDetallePedido={idDetallePedido}
        idDetalleProducto={idDetalleProducto}
        cantidadProductoCarrito={cantidadProductoCarrito}
        getDetalleCarrito={getDetalleCarrito}
        nuevaCantidad={nuevaCantidad}
        setNuevaCantidad={setNuevaCantidad}
        existencias={existenciaProducto}
      />

      <ModalSeleccionarDireccion
        modalVisible={modalDireccionVisible}
        setModalVisible={setModalDireccionVisible}
        dataDirecciones={dataDirecciones}
        finalizarPedido={finalizarPedido}
        setDireccion={setDireccion}
        direccion={direccion}
      />

      {/* Título de la pantalla */}
      <Text style={styles.title}>Carrito de compra</Text>

      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 2,
          width: Dimensions.get('window').width / 1.1,
        }}
      />

      {/* Lista de detalles del carrito */}
      {dataDetalleCarrito.length > 0 ? (
        <FlatList
          data={dataDetalleCarrito}
          renderItem={renderItem}
          contentContainerStyle={{ borderRadius: 20 }}
          style={{ width: Dimensions.get('window').width / 1.1, flex: 2 }}
          keyExtractor={(item) => item.id_detalle_producto.toString()}
        />
      ) : (
        <View style={{ display: 'flex', alignItems: 'center', gap: 100 }}>
          <Text style={styles.titleDetalle}>No se han agregado productos al carrito.</Text>
          <Image source={require('../../assets/carro.png')} style={{ width: 200, height: 200 }} />
        </View>
      )}

      {/* Botón de finalizar pedido */}
      <View style={{ width: '80%' }}>
        {dataDetalleCarrito.length > 0 && (
          <SimpleButton
            textoBoton='Finalizar Pedido'
            accionBoton={dataDirecciones.length > 0 ? (() => setModalDireccionVisible(true)) : (() => redirigirDirecciones())}
            anchoBoton={'100'}
          />
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    width: Dimensions.get('window').width,
    marginLeft: Dimensions.get('window').width / 10,
    marginTop: Dimensions.get('window').height / 30,
    flex: 0.1,
    color: '#000',
  },
  titleDetalle: {
    marginTop: 20,
    fontSize: 17,
  }
});