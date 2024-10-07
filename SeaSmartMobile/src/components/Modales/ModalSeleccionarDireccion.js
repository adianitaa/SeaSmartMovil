import { StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList, Alert, ScrollView, Image, Modal } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as Constantes from '../../utils/Constantes';
import SimpleButton from '../Buttons/SimpleButton';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';

const ModalSeleccionarDireccion = ({ setModalVisible, modalVisible, finalizarPedido, dataDirecciones, setDireccion, direccion }) => {

    const [isFocus, setIsFocus] = useState(false);

    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <TouchableOpacity activeOpacity={1} style={styles.centeredView} onPress={() => setModalVisible(!modalVisible)}>
                <TouchableOpacity activeOpacity={1} style={styles.modalView}>
                    <Text style={{ fontSize: 18, fontWeight: '900' }}>Seleccione una dirección</Text>

                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={dataDirecciones.map((item) => { return { value: item.direccion, label: item.direccion } })}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Seleccione una dirección' : '...'}
                        searchPlaceholder="Buscar una dirección"
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setDireccion(item.value);
                            setIsFocus(false);
                        }}
                        value={direccion}
                        renderLeftIcon={() => (
                            <AntDesign
                                style={styles.icon}
                                color={isFocus ? 'blue' : 'black'}
                                name="home"
                                size={20}
                            />
                        )}
                    />
                    <SimpleButton textoBoton={'Finalizar pedido'} anchoBoton={'100'} accionBoton={() => finalizarPedido(direccion)} />
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

export default ModalSeleccionarDireccion;

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
        gap: 15,
        width: '90%',
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        width: '100%',
        marginVertical: 20
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});