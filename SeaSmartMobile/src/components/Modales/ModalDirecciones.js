import { Text, Modal, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import SimpleButton from '../Buttons/SimpleButton';
import * as Constantes from '../../utils/Constantes';

const ModalDirecciones = ({ setModalVisible, modalVisible, idDireccion, direccion, setDireccion, getDirecciones, direccionVieja }) => {

    const ip = Constantes.IP;

    // La función handleUpdateDireccion permite actualizar una dirección.
    const handleUpdateDireccion = async () => {
        try {
            // Se valida el valor del campo dirección.
            if (validarDireccion()) {
            } 
            // Si la dirección digitada es igual a la dirección actual se oculta el modal.
            else if(direccion.trim() == direccionVieja){
                setModalVisible(!modalVisible);
            } else {
                // Se inicializa la constante que almacenará los valores antes de hacer la petición a la API.
                const formData = new FormData();
                formData.append('idDireccion', idDireccion);
                formData.append('inputDireccion', direccion);

                // Se realiza la petición hacia la API.
                const response = await fetch(`${ip}/SeaSmart/api/services/public/direcciones.php?action=updateRow`, {
                    method: 'POST',
                    body: formData
                });

                // Se almacena la respuesta en la constante en formato JSON.
                const data = await response.json();

                // Si la respuesta es satisfactoria se ejecuta el código.
                if (data.status) {
                    // Se muestra el mensaje.
                    Alert.alert('Dirección actualizada correctamente');
                    // Se vuelven a cargar las direcciones.
                    getDirecciones();
                } 
                // Si la respuesta no es satisfactoria se muestra el error con el mensaje.
                else {
                    Alert.alert('Ocurrió un error al actualizar la dirección', data.error);
                }
                // Se oculta el modal.
                setModalVisible(false);
            }
        } catch (error) {
            Alert.alert("Sucedió un error al editar la dirección", JSON.stringify(error));
            setModalVisible(false);
        }
    };

    // La función handleAddDireccion permite agregar una dirección.
    const handleAddDireccion = async () => {
        try {
            // Se valida el valor del campo dirección.
            if (validarDireccion()) {
            } else {
                // Se inicializa la constante de tipo formData dónde se almacenará la dirección.
                const formData = new FormData();
                formData.append('inputDireccion', direccion);

                // Se realiza la petición a la API.
                const response = await fetch(`${ip}/SeaSmart/api/services/public/direcciones.php?action=createRow`, {
                    method: 'POST',
                    body: formData
                });

                // Se almacena la respuesta en la constante en formato JSON.
                const data = await response.json();

                // Si la respuesta es satisfactoria se ejecuta el código.
                if (data.status) {
                    // Se muestra el mensaje.
                    Alert.alert('Dirección agregada correctamente');
                    // Se vuelven a cargar las direcciones.
                    getDirecciones();
                } 
                // Si la respuesta no es satisfactoria se muestra el error con el mensaje.
                else {
                    Alert.alert('Ocurrió un error al agregar la dirección', data.error);
                }
                // Se oculta el modal.
                setModalVisible(false);
            }
        } catch (error) {
            Alert.alert("Sucedió un error al agregar la dirección", JSON.stringify(error));
            setModalVisible(false);
        }
    }

    // La función validarDireccion valida el valor del campo dirección.
    function validarDireccion() {
        // Si el campo está vacío se ejecuta el código.
        if (direccion.trim() == "") {
            // Se muestra el mensaje.
            Alert.alert('La dirección no es válida', 'Asegúrese de agregar una dirección');
            return true;
        } 
        // Si el campo no cumple con la longitud requerida se ejecuta el código.
        else if (direccion.length < 10 || direccion.length > 100) {
            // Se muestra el mensaje con la advertencia.
            Alert.alert('La dirección no es válida', 'La longitud de la dirección debe ser de mínimo 10 caracteres y máximo 100');
            return true;
        } 
        // Si el campo cumple con la longitud requerida se retorna el valor.
        else {
            return false;
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

                    <TextInput
                        style={styles.input}
                        label="Ingrese su dirección aquí"
                        value={direccion}
                        onChangeText={setDireccion}
                        mode='outlined'
                        outlineColor='white'
                        theme={{
                            colors: {
                                primary: '#4593EE'
                            },
                        }}>
                    </TextInput>

                    {idDireccion == null ? (
                        <SimpleButton textoBoton={'Agregar dirección'} accionBoton={handleAddDireccion} anchoBoton={'100'}/>
                    ) : (
                        <SimpleButton accionBoton={handleUpdateDireccion} textoBoton={'Actualizar Dirección'} anchoBoton={'100'} colorBoton={'#5CB85C'}/>
                    )}

                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

export default ModalDirecciones;

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
        width: '90%'
    },
    input: {
        borderColor: '#ccc',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        width: '100%',
    },
    button: {
        borderWidth: 1,
        borderColor: "#5CB85C",
        width: 300,
        borderRadius: 20,
        backgroundColor: "#5CB85C",
        padding: 10,
        marginVertical: 5
    },
    buttonText: {
        textAlign: 'center',
        color: "#FFF", fontWeight: '500', textTransform: 'uppercase'
    },
});
