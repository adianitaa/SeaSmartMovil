import { StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList, Alert, ScrollView, Image } from 'react-native';
import { TextInput, Button, Modal } from 'react-native-paper';
import { useState, useEffect } from 'react';
import * as Constantes from '../utils/Constantes';
import SimpleButton from '../components/Buttons/SimpleButton';
import ModalCompra from '../components/Modales/ModalCompra';
import ModalComentario from '../components/Modales/ModalComentario';
import Back from '../components/Buttons/Back';

export default function Producto({ route, navigation }) {

    const ip = Constantes.IP;

    const [infoProducto, setInfo] = useState([]);
    const [detallesProducto, setDetalleProducto] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalComentarioVisible, setModalComentarioVisible] = useState(false);
    const [cantidadProducto, setCantidadProducto] = useState(1);
    const [color, setColor] = useState(false);
    const [talla, setTalla] = useState(false);
    const [comentarios, setComentarios] = useState([]);
    const [estadoComentario, setEstadoComentario] = useState(false);
    const [contador, setContador] = useState(0);

    // La función useEffect se ejecuta cada vez que se carga la pantalla.
    useEffect(() => {
        // Se manda a llamar a la función para obtener la información del producto.
        getInfoProducto();
        // Se manda a llamar a la función para obtener los comentarios del producto.
        getCalificaciones();
    }, []);

    // La función getInfoProducto carga los datos provenientes de la API dentro de la constante infoProducto.
    const getInfoProducto = async () => {
        try {
            // Se inicializan las variables que permitirán definir los detalles de producto.
            var colorBoolean = false;
            var tallaBoolean = false;
            // Se inicializa la constante dónde se almacenará el id del producto.
            const formData = new FormData();
            // Se almacena el id de producto en el form.
            formData.append('idProducto', route.params.id);
            // Se realiza la petición para obtener la información del producto.
            const response = await fetch(`${ip}/SeaSmart/api/services/public/productos.php?action=readOne`, {
                method: 'POST',
                body: formData
            });

            // Se almacena la respuesta en la constante en formato JSON.
            const data = await response.json();

            // Si la respuesta es satisfactoria se ejecuta el código.
            if (data.status) {
                // Se carga el conjunto de datos dentro la constante infoProducto.
                setInfo(data.dataset);

                // Se verifica si el producto tiene detalles de producto con color asignado.
                if (data.dataset.colores > 0) {
                    setColor(true);
                    colorBoolean = true;
                } else {
                    setColor(false);
                    colorBoolean = false;
                }
                // Se verifica si el producto tiene detalles de producto con talla asignada.
                if (data.dataset.tallas > 0) {
                    setTalla(true);
                    tallaBoolean = true;
                } else {
                    setTalla(false);
                    tallaBoolean = false;
                }

                /*PETICIÓN PARA OBTENER LOS DETALLES DEL PRODUCTO*/

                // Se inicializa la variable dónde se almacenará la url con la acción.
                var url = '';
                // Switchcase que verifica la opción de fetch a realizar.
                switch (true) {
                    case colorBoolean == true && tallaBoolean == true:
                        url = `${ip}/SeaSmart/api/services/public/productos.php?action=readDetailProduct`;
                        break;
                    case colorBoolean == true && tallaBoolean == false:
                        url = `${ip}/SeaSmart/api/services/public/productos.php?action=readColorDetailProduct`;
                        break;
                    case colorBoolean == false && tallaBoolean == true:
                        url = `${ip}/SeaSmart/api/services/public/productos.php?action=readSizeDetailProduct`;
                        break;
                    case colorBoolean == false && tallaBoolean == false:
                        url = `${ip}/SeaSmart/api/services/public/productos.php?action=readSingleDetailProduct`;
                        break;
                }

                // Se inicializa la constante dónde se almacenará el id del producto.
                const form = new FormData();
                // Se almacena el id del producto en la constante.
                form.append('idProducto', data.dataset.id_producto);
                // Se realiza la petición para obtener los detalles del producto.
                const response_detalle = await fetch(url, {
                    method: 'POST',
                    body: form
                });

                // Se almacena la respuesta en la constante en formato JSON.
                const data_detalle = await response_detalle.json();

                // Si la respuesta es satisfactoria se ejecuta el código.
                if (data_detalle.status) {
                    // Se carga el conjunto de datos dentro la constante detallesProducto.
                    setDetalleProducto(data_detalle.dataset);
                }
                // Si la respuesta no es satisfactoria se ejecuta el código.
                else {
                    // Se muestra el mensaje en consola.
                    console.log("No hay existencias disponibles")
                }
            }
            // Si la respuesta no es satisfactoria se ejecuta el código.
            else {
                // Se muestra el mensaje en consola.
                console.log("No hay existencias disponibles")
            }
        } catch (error) {
            console.error(error, "Error desde Catch");
            Alert.alert('Error', 'Ocurrió un error al cargar la información del producto');
        }
    }

    // Función que permite obtener todas las calificaciones de un producto.
    const getCalificaciones = async () => {

        try {
            // Se inicializa la constante dónde se almacenará el id del producto.
            const formData = new FormData();
            // Se almacena el id de producto en el form.
            formData.append('idProducto', route.params.id);
            // Se realiza la petición para obtener las calificaciones del producto.
            const response = await fetch(`${ip}/SeaSmart/api/services/public/valoracion.php?action=readComments`, {
                method: 'POST',
                body: formData
            });

            // Se almacena la respuesta en la constante en formato JSON.
            const data = await response.json();

            // Si la respuesta es satisfactoria se ejecuta el código.
            if (data.status) {
                // Se configura el valor de la constante.
                setComentarios(data.dataset);
            }
        } catch (error) {
            console.error(error, "Error desde Catch");
            Alert.alert('Error', 'Ocurrió un error al obtener las calificaciones del producto');
        }
    }

    return (
        <>
            <ModalCompra
                visible={modalVisible}
                cerrarModal={setModalVisible}
                data={[infoProducto, detallesProducto, color, talla]}
                cantidad={cantidadProducto}
                setCantidad={setCantidadProducto}
            />
            <ModalComentario
                visible={modalComentarioVisible}
                cerrarModal={setModalComentarioVisible}
                data={infoProducto}
                setEstado={setEstadoComentario}
            />
            {/* <TouchableOpacity style={{
                display: 'flex', flexDirection: 'row', alignItems: 'center', width: Dimensions.get('window').width, marginLeft: Dimensions.get('window').width / 20, marginTop: Dimensions.get('window').height / 40, marginBottom: 20, gap: 10
            }} onPress={() => navigation.goBack()}>
                <Image source={require('../../assets/flecha_regreso.png')} style={{ height: 35, width: 35 }} />
                <Text style={{ fontSize: 20 }}>Regresar</Text>
            </TouchableOpacity> */}
            <View style={{ marginLeft: 15, marginTop: 15, marginBottom: 15 }}>
                <Back
                    navigation={navigation}
                />
            </View>
            <View style={[styles.container, {}]}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {/* Información del producto */}
                    <View style={{ width: Dimensions.get('window').width, flexDirection: 'row', display: 'flex', paddingHorizontal: 15, }}>
                        <View style={{ alignItems: 'center' }}>
                            <Image source={{ uri: ip + '/SeaSmart/api/images/detalles_productos/' + infoProducto.imagen_producto }} style={{ width: 175, height: 175, borderRadius: 15 }} />
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{infoProducto.nombre_producto}</Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#610707' }}>${infoProducto.precio_producto}</Text>
                            {infoProducto.existencias == 0 ?
                                <Text style={{ fontSize: 18, fontWeight: 'bold', }}>No disponible</Text>
                                :
                                <SimpleButton
                                    textoBoton={'Agregar al carrito'}
                                    accionBoton={() => setModalVisible(true)}
                                />
                            }
                        </View>
                    </View>
                    <View style={{}}>
                        <Text style={{ fontSize: 18, fontWeight: 'semibold' }}>{infoProducto.descripcion_producto}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', paddingHorizontal: 5, justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'left', alignSelf: 'flex-start' }}>Reseñas</Text>
                        {
                            infoProducto.compra_cliente && !estadoComentario
                                && !infoProducto.valoraciones
                                ?
                                <SimpleButton textoBoton={'Escribir reseña'} colorBoton={'#fddc5c'} colorTexto={'black'} anchoBoton={'70'} accionBoton={() => setModalComentarioVisible(true)} />
                                : ''
                        }
                    </View>
                    <View style={{}}>
                        {
                            comentarios.length > 0 ?
                                <FlatList
                                    data={comentarios}
                                    scrollEnabled={false}
                                    contentContainerStyle={{ gap: 10, }}
                                    renderItem={({ item }) => (
                                        <View style={{ gap: 10 }}>
                                            <View
                                                style={{
                                                    borderBottomColor: 'black',
                                                    borderBottomWidth: 2,
                                                }}
                                            />
                                            <View style={{ flexDirection: 'row', gap: 10, }}>
                                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 40 }}>{item.calificacion_producto}</Text>
                                                        <Image
                                                            style={{ width: 40, height: 40 }}
                                                            source={require('../../assets/estrella_fill.png')}
                                                        />
                                                    </View>
                                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Calificación</Text>
                                                </View>
                                                <View style={{ alignItems: 'center', gap: 10, flexDirection: 'column' }}>
                                                    <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}>{item.nombre_cliente} {item.apellido_cliente}</Text>
                                                    <Text numberOfLines={100} style={{ fontSize: 17, color: 'black', alignSelf: 'center', width: Dimensions.get('window').width / 1.5 }}>{item.comentario_producto}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                />
                                : <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Este producto no tiene reseñas</Text>
                        }
                    </View>
                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 30,
        padding: 5,
    }
});