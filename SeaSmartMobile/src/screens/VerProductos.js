import { StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList, Alert, ScrollView, Image, SafeAreaView } from 'react-native';
import { TextInput, Button, Modal } from 'react-native-paper';
import { useState, useEffect } from 'react';
import * as Constantes from '../utils/Constantes';
import SimpleButton from '../components/Buttons/SimpleButton';
import Constants from 'expo-constants';
import { CommonActions } from '@react-navigation/native';
import Back from '../components/Buttons/Back';

export default function VerProductos({ route, navigation }) {

    const [dataProductos, setDataProductos] = useState([]);
    const [dataSubcategorias, setSubcategorias] = useState([]);

    const ip = Constantes.IP;

    // La función useEffect se ejecuta cada vez que se carga la pantalla.
    useEffect(() => {
        // Se manda a llamar a la función para obtener los productos de la categoría.
        getProductos();
    }, []);

    const abrirProducto = async (id) => {
        // navigation.getParent().dispatch(
        //   CommonActions.navigate({
        //     name: 'Producto',
        //     params: { id: id },
        //   }
        //   ))

        navigation.navigate('Producto', {
            id: id,
        });
    }

    // La función getProductos carga los datos provenientes de la API en relación con la categoría.
    const getProductos = async () => {
        try {
            // Se inicializa la constante que almacenará el id de la categoría.
            const formData = new FormData();
            // Se almacena el id de la categoría en la constante.
            formData.append('idCategoria', route.params.id);
            // Se realiza la petición para obtener los productos de la categoría.
            const response = await fetch(`${ip}/SeaSmart/api/services/public/productos.php?action=getProducts`, {
                method: 'POST',
                body: formData
            });

            // Se almacena la respuesta en la constante en formato JSON.
            const data = await response.json();

            // Se almacenan en la variable los nombres de las subcategorías encontradas en los productos.
            var subcategorias = data.dataset.map((item) => { return { nombre_subcategoria: item.nombre_sub_categoria } });
            // Se almacena en la variable las subcategorias que se encuentran en el conjunto de datos.
            var array_subcategorias = data.dataset.map(item => item.nombre_sub_categoria);
            // Se remueven los duplicados del array y se almacena el conjunto de datos en la variable.
            var subcategorias_filtrado = subcategorias.filter(({ nombre_subcategoria }, index) => !array_subcategorias.includes(nombre_subcategoria, index + 1));

            //Se almacena en la constante el conjunto de datos con las subcategorías sin repeticiones.
            setSubcategorias(subcategorias_filtrado);

            // Si la respuesta es satisfactoria se ejecuta el código.
            if (data.status) {
                // Se carga el conjunto de datos dentro la constante dataProducto.
                setDataProductos(data.dataset);
            }
            // Si la respuesta no es satisfactoria se ejecuta el código.
            else {
                // Se muestra el mensaje en consola.
                console.log("No hay productos disponibles")
            }
        } catch (error) {
            console.error(error, "Error desde Catch");
            Alert.alert('Error', 'Ocurrió un error al cargar los productos');
        }
    }

    return (
        <>
            {/* <TouchableOpacity style={{
                display: 'flex', flexDirection: 'row', alignItems: 'center', width: Dimensions.get('window').width, marginLeft: Dimensions.get('window').width / 20, marginTop: Dimensions.get('window').height / 40, marginBottom: 5, gap: 10
            }} onPress={() => navigation.goBack()}>
                <Image source={require('../../assets/flecha_regreso.png')} style={{ height: 35, width: 35 }} />
                <Text style={{ fontSize: 20 }}>Regresar</Text>
            </TouchableOpacity> */}
            <View style={styles.container}>
                <ScrollView>
                    <Back
                        navigation={navigation}
                    />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'flex-start', marginTop: 5 }}>Productos de la categoría {route.params.categoria}</Text>
                    <SafeAreaView style={styles.containerFlat}>
                        <FlatList
                            data={dataSubcategorias}
                            horizontal={false}
                            scrollEnabled={false}
                            contentContainerStyle={{ gap: 30 }}
                            renderItem={({ item }) => (
                                <View style={{ gap: 20, width: Dimensions.get('window').width }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'flex-start' }}>
                                        {item.nombre_subcategoria}
                                    </Text>
                                    <FlatList
                                        data={dataProductos.filter((row) => { if (row.nombre_sub_categoria == item.nombre_subcategoria) { return row } })}
                                        horizontal={true}
                                        contentContainerStyle={{ gap: 20, paddingRight: 40 }}
                                        renderItem={({ item }) => (
                                            <View style={{ backgroundColor: '#3E88DE', borderRadius: 15, height: Dimensions.get('window').height / 5, width: Dimensions.get('window').width / 1.3, flexDirection: 'row', padding: 15 }}>
                                                <Image source={{ uri: ip + '/SeaSmart/api/images/detalles_productos/' + item.imagen_producto }} style={{ width: 100, height: 100, borderRadius: 15, alignSelf: 'center' }} />
                                                <View style={{ alignItems: 'center', flex: 1, gap: 10, display: 'flex', }}>
                                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>
                                                        {item.nombre_producto}
                                                    </Text>
                                                    <Text style={{ fontSize: 17, color: '#fff' }}>Precio: ${item.precio_producto}</Text>
                                                    <Text style={{ fontSize: 17, color: '#fff', fontWeight: 'bold' }}>{item.existencias > 0 ? 'Disponible' : 'No disponible'}</Text>
                                                    <SimpleButton
                                                        textoBoton={'Ver producto'}
                                                        colorBoton={'#8ab5e7'}
                                                        accionBoton={() => abrirProducto(item.id_producto)}
                                                    />
                                                </View>
                                            </View>
                                        )}
                                    />
                                </View>
                            )}
                        />
                    </SafeAreaView>
                </ScrollView>
            </View>
        </>
    );


}

const styles = StyleSheet.create({
    containerFlat: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 20
    },
});