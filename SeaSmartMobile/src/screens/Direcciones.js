import { StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList, Alert, ScrollView, Image } from 'react-native';
import { TextInput, Button, Modal } from 'react-native-paper';
import { useState, useEffect } from 'react';
import * as Constantes from '../utils/Constantes';
import SimpleButton from '../components/Buttons/SimpleButton';
import DireccionCard from '../components/Cards/DireccionCard';
import ModalDirecciones from '../components/Modales/ModalDirecciones';
import Back from '../components/Buttons/Back';

export default function Direcciones({ navigation }) {

    const [dataDirecciones, setDataDirecciones] = useState([]);
    const [idDireccion, setIdDireccion] = useState(null);
    const [direccion, setDireccion] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [direccionVieja, setDireccionVieja] = useState(null);

    const ip = Constantes.IP;

    // La función useEffect se ejecuta cada vez que se carga la pantalla.
    useEffect(() => {
        // Se manda a llamar a la función para obtener las direcciones del cliente.
        getDirecciones();
    }, []);

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
            console.error(error, "Error desde Catch");
            Alert.alert('Error', 'Ocurrió un error al cargar las direcciones');
        }
    }

    // Función para manejar la modificación de una dirección
    const handleEditarDireccion = (idDireccion, direccion) => {
        // Se configuran los valores de las constantes para preparar el modal que permite editar una dirección.
        setModalVisible(true);
        setIdDireccion(idDireccion);
        setDireccion(direccion);
        setDireccionVieja(direccion);
    };


    // Función para manejar la acción de agregar de una dirección.
    const handleAgregarDireccion = () => {
        // Se configuran los valores de las constantes para preparar el modal que permite agregar una dirección.
        setModalVisible(true);
        setIdDireccion(null);
        setDireccion('');
    }

    // Función renderItem carga una Card con la dirección.
    const renderItem = ({ item }) => (
        // Se manda a llamar el componente DireccionCard y se configuran los valores iniciales.
        <DireccionCard
            item={item}
            accionBoton={() => handleEditarDireccion(item.id_direccion, item.direccion)}
            updateDataDireccion={setDataDirecciones} // Nueva prop para actualizar la lista
        />
    );

    return (
        <View style={styles.container}>

            <ModalDirecciones
                direccion={direccion}
                getDirecciones={getDirecciones}
                idDireccion={idDireccion}
                modalVisible={modalVisible}
                setDireccion={setDireccion}
                setModalVisible={setModalVisible}
                direccionVieja={direccionVieja}
            />

            <View style={{ justifyContent: 'flex-start', alignSelf: 'flex-start', marginLeft: 15, marginTop: 15 }}>
                <Back
                    navigation={navigation}
                />
            </View>

            {/* Título de la pantalla */}
            <Text style={styles.title}>Direcciones</Text>

            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 2,
                    width: Dimensions.get('window').width / 1.1,
                }}
            />

            {/* Lista de direcciones */}
            {dataDirecciones.length > 0 ? (
                <FlatList
                    data={dataDirecciones}
                    renderItem={renderItem}
                    style={{ width: Dimensions.get('window').width / 1.1, flex: 2 }}
                    keyExtractor={(item) => item.id_direccion.toString()}
                />
            ) : (
                <View style={{ display: 'flex', alignItems: 'center', gap: 100, flex: 1.7 }}>
                    <Text style={styles.titleAddress}>No se han agregado direcciones.</Text>
                    <Image source={require('../../assets/direccion_pregunta.png')} style={{ width: 200, height: 200 }} />
                </View>
            )}

            {/* Botón de finalizar pedido */}
            <View style={{ width: '80%' }}>
                <SimpleButton
                    textoBoton='Agregar dirección'
                    accionBoton={handleAgregarDireccion}
                    anchoBoton={'100'}
                />
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
        paddingVertical: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        width: Dimensions.get('window').width,
        marginLeft: Dimensions.get('window').width / 10,
        flex: 0.1,
        color: '#000', // Brown color for the title
    },
    titleAddress: {
        marginTop: 20,
        fontSize: 17,
    }
});