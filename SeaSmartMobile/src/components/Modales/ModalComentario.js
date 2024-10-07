import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import SimpleButton from '../Buttons/SimpleButton';
import * as Constantes from '../../utils/Constantes'
import InputMultiline from '../Inputs/InputMultiline';

const ModalComentario = ({ visible, cerrarModal, data, setEstado }) => {

    const ip = Constantes.IP;

    const [comentario, setComentario] = useState('');
    const [calificacion, setCalificacion] = useState(1);

    // Función que permite aumentar o disminuir la calificación del producto.
    const cambiarCalificacion = (operacion) => {
        if (operacion == -1 && calificacion > 1) {
            setCalificacion(calificacion - 1);
        } else if (operacion == +1 && calificacion < 5) {
            setCalificacion(calificacion + 1);
        }
    }

    // Función que permite realizar la reseña de un producto.
    const realizarComentario = async (info) => {

        try {
            // Se verifica que el usuario haya agregado un comentario.
            if (comentario.trim() == '') {
                // Se muestra la advertencia.
                Alert.alert('Debe agregar un comentario del producto', 'Agregue un comentario para poder reseñar el producto');
            } else if(comentario.length < 20){
                // Se muestra la advertencia.
                Alert.alert('La reseña es demasiado corta', 'Alarge la reseña a un mínimo de 20 caracteres');
            } else if(comentario.length > 200){
                // Se muestra la advertencia.
                Alert.alert('La reseña es demasiado larga', 'Acorte la reseña a un máximo de 200 caracteres');
            } else {
                // Se inicializa la constante dónde se almacenará la información que se enviará a la api.
                const formData = new FormData();
                // Se almacena en la constante el comentario, la calificación del producto y el id del detalle de pedido.
                formData.append('comentarioProducto', comentario);
                formData.append('calificacionProducto', calificacion);
                formData.append('idDetallePedido', info.compra_cliente);
                // Se realiza la petición a la api para realizar el comentario.
                const response = await fetch(`${ip}/SeaSmart/api/services/public/valoracion.php?action=makeComment`, {
                    method: 'POST',
                    body: formData
                });

                // Se almacena en la constante la respuesta de la api en formato json.
                const data = await response.json();
                
                // Se verifica el estado de la acción.
                if (data.status) {
                    // Se muestra el éxito de la acción.
                    Alert.alert('Se realizó la reseña correctamente');
                    // Se oculta el modal.
                    cerrarModal(!visible);
                    // Se cambia el estado de la reseña.
                    setEstado(true);
                    // Se restablecen los valores de los campos.
                    setComentario('');
                    setCalificacion(1);
                } else {
                    // Se muestra el error al usuario.
                    Alert.alert('Error', data.error);
                    // Se oculta el modal.
                    cerrarModal(!visible);
                }
            }
        } catch (error) {
            console.log(error);
            Alert.alert(toString(error), 'Ocurrió un error al reseñar el producto');
            cerrarModal(!visible);
        }
    };

    return (

        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
                cerrarModal(!visible);
            }}
        >
            <TouchableOpacity style={styles.centeredView} activeOpacity={1} onPress={() => cerrarModal(!visible)}>
                <TouchableOpacity style={styles.modalView} activeOpacity={1}>
                    <View style={styles.containerCalificacion}>
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Calificación: </Text>
                        <TouchableOpacity onPress={() => cambiarCalificacion(-1)}>
                            <Image source={require('../../../assets/minus.png')} style={styles.image} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 17 }}>{calificacion}/5 estrellas</Text>
                        <TouchableOpacity onPress={() => cambiarCalificacion(+1)}>
                            <Image source={require('../../../assets/plus.png')} style={styles.image} />
                        </TouchableOpacity>
                    </View>
                    <InputMultiline
                        placeHolder={'Escriba sus comentarios aquí'}
                        setValor={setComentario}
                        valor={comentario}
                    />
                    <SimpleButton
                        textoBoton={'Realizar reseña'}
                        anchoBoton={'100'}
                        accionBoton={() => realizarComentario(data)}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

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
        width: '90%',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        gap: 15,
        alignItems: 'flex-start'
    },
    image: {
        height: 40,
        width: 40
    },
    containerCalificacion: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 20,
        width: '100%',
        justifyContent: 'space-between'
    },
});

export default ModalComentario;
