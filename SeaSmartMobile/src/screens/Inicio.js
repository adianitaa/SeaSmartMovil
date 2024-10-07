import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, FlatList, Dimensions, SafeAreaView, Text, Image } from 'react-native';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import ModalCompra from '../components/Modales/ModalCompra';
import Constants from 'expo-constants';
import * as Constantes from '../utils/Constantes';
import SimpleButton from '../components/Buttons/SimpleButton';

export default function Inicio({ navigation }) {
  const [categorias, setCategorias] = useState([]);
  const [idCategoria, setIdCategoria] = useState('');
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [usuario, setUsuario] = useState('');
  const ip = Constantes.IP;

  const abrirAgregar = (id, nombre, talla, existencia, precio) => {
    setModalVisible(true);
    setIdCategoria(id);
    setNombreCategoria(nombre);
    setTallaProducto(talla);
    setExistenciaProducto(existencia);
    setPrecioProducto(precio);
  };

  const cargarCategorias = async () => {
    try {
      const response = await fetch(`${ip}/SeaSmart/api/services/public/categorias.php?action=readAll`, {
        method: 'GET'
      });
      const data = await response.json();
      if (data.status) {
        setCategorias(data.dataset);
        setUsuario(data.nombre);
      } else if (data == "Acceso denegado") {
        navigation.navigate('Login');
      } else {
        Alert.alert('No se han agregado categorías', data.error);
      }
    } catch (error) {
      Alert.alert('Error', toString(error));
    }
  };

  const abrirCategoria = async (id, categoria) => {
    navigation.getParent().dispatch(
      CommonActions.navigate({
        name: 'Productos',
        params: { id: id, categoria: categoria },
      }
      ))
  }

  // La acción useFocusEffect se ejecuta una vez que la pantalla se ha terminado de cargar (Similar a useEffect).
  useFocusEffect(
    // La función useCallBack ejecuta el código dentro de ella cada vez que se termina de cargar la pantalla.
    React.useCallback(() => {
      // Llamada a la función cargarCategorias.
      cargarCategorias();
    }, [])
  );

  // Componente principal de renderizado
  return (
    <View style={styles.container}>

      {/* Título de la pantalla */}

      <View style={{ flex: 0.1, alignItems: 'center', flexDirection: 'row', width: Dimensions.get('window').width, justifyContent: 'space-evenly' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../../assets/ola.png')} style={{ height: 70, width: 70 }} />
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>S</Text>
            <Text style={{ color: '#4593EE', fontSize: 20, fontWeight: 'bold' }}>ea</Text>
            <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>S</Text>
            <Text style={{ color: '#4593EE', fontSize: 20, fontWeight: 'bold' }}>mart</Text>
          </View>
        </View>
        <Text style={styles.title2}>¡Bienvenido/a {usuario}!</Text>
      </View>

      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 2,
          width: Dimensions.get('window').width / 1.1,
        }}
      />

      <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'left', width: Dimensions.get('window').width, paddingHorizontal: 30, marginTop: 20 }}>Categorías</Text>

      <SafeAreaView style={styles.containerFlat}>
        <FlatList
          data={categorias}
          horizontal={false}
          contentContainerStyle={{ gap: 10, paddingVertical: 5 }}
          renderItem={({ item }) => (
            <View style={{ backgroundColor: '#3E88DE', borderRadius: 15, padding: 20, gap: 10 }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, width: Dimensions.get('window').width }}>{item.nombre_categoria}</Text>
              <Image source={{ uri: `${ip}/SeaSmart/api/images/categorias/${item.imagen_categoria}` }} style={{ width: 150, height: 150, alignSelf: 'center', borderRadius: 15 }} />
              <Text style={{ color: 'white', fontSize: 18, fontWeight: 'semibold', }}>{item.descripcion_categoria}</Text>
              <View style={{ alignSelf: 'center', width: '100%', alignItems: 'center' }}>
                <SimpleButton textoBoton={'Ver productos'} colorBoton={'#8ab5e7'} colorTexto={'#fff'} anchoBoton={'100'} accionBoton={() => abrirCategoria(item.id_categoria, item.nombre_categoria)} />
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9; // Ancho constante de la tarjeta

const styles = StyleSheet.create({
  containerFlat: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  searchContainer: {
    padding: 10,
    marginTop: 20, // Ajuste para mostrar la barra de búsqueda más abajo
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  categoryText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    marginVertical: 10,
  },
  categoryContainer: {
    alignItems: 'center',
  },
  cardContainer: {
    width: CARD_WIDTH,
    alignItems: 'center',
  },
  card: {
    width: '100%', // Ancho constante
    backgroundColor: '#3498db',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center', // Centra el contenido de las tarjetas
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  cardImage: {
    width: '100%', // Ajusta el ancho de la imagen al ancho de la tarjeta
    height: 150,
    marginVertical: 10,
    resizeMode: 'contain', // Ajusta la imagen dentro de la tarjeta sin distorsionar
  },
  cardDescription: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#5dade2',
    padding: 10,
    borderRadius: 5,
    width: '80%', // Asegura que todos los botones tengan el mismo ancho
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 5,
    color: '#5C3D2E', // Brown color for the title
  }, centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  }, modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: '',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    width: Dimensions.get('window').width,
    marginLeft: Dimensions.get('window').width / 10,
    marginTop: Dimensions.get('window').height / 30,
    flex: 0.06,
    color: '#000',
  },
  title2: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#000',
    maxWidth: Dimensions.get('window').width / 1.4
  },
});
