import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import SimpleButton from '../Buttons/SimpleButton';
import * as Constantes from '../../utils/Constantes'
import { Dropdown } from 'react-native-element-dropdown';

const ModalCompra = ({ visible, cerrarModal, data, cantidad, setCantidad }) => {

    const ip = Constantes.IP;
    const [color, setColor] = useState(0);
    const [coloresDetalle, setColoresDetalle] = useState([]);
    const [talla, setTalla] = useState(0);
    const [tallasDetalle, setTallasDetalle] = useState([]);

    // La función useEffect se ejecuta cada vez que se carga la pantalla.
    useEffect(() => {
        // Se manda a llamar a la función para establecer el conjunto de datos
        // que se utilizarán en los selects.
        configurarSelects();
    }, [data]);

    const configurarSelects = async () => {
        try {
            // Switch case para verificar información y configurar constantes.
            switch (true) {
                case data[2] && data[3]:
                    // Se almacenan en la variable los nombres de las subcategorías encontradas en los productos.
                    var colores = data[1].map((item) => { return { color: item.color_producto, id_color: item.id_producto_color } });
                    // Se almacena en la variable los colores que se encuentran en el conjunto de datos.
                    var array_colores = data[1].map(item => item.color_producto);
                    // Se remueven los duplicados del array y se almacena el conjunto de datos en la variable.
                    var colores_filtrado = colores.filter(({ color }, index) => !array_colores.includes(color, index + 1));
                    // Se almacena en la constante el conjunto de datos configurado para utilizarlo en el select.
                    var selectColores = colores_filtrado.map((item) => { return { value: item.id_color, label: item.color } });

                    // Se almacenan en la variable los nombres de las subcategorías encontradas en los productos.
                    var tallas = data[1].map((item) => { return { talla: item.talla, id_talla: item.id_producto_talla } });
                    // Se almacena en la variable los colores que se encuentran en el conjunto de datos.
                    var array_tallas = data[1].map(item => item.talla);
                    // Se remueven los duplicados del array y se almacena el conjunto de datos en la variable.
                    var tallas_filtrado = tallas.filter(({ talla }, index) => !array_tallas.includes(talla, index + 1));
                    // Se almacena en la constante el conjunto de datos configurado para utilizarlo en el select.
                    var selectTallas = tallas_filtrado.map((item) => { return { value: item.id_talla, label: item.talla } });

                    // Se configuran el valor de las constantes.
                    setColoresDetalle(selectColores);
                    setTallasDetalle(selectTallas);

                    selectTallas.length == 1 ? setTalla(selectTallas[0].value) : null;

                    selectColores.length == 1 ? setColor(selectColores[0].value) : null;

                    break;
                case !data[2] && data[3]:
                    // Se almacenan dentro de la constante las tallas encontradas en el conjunto de datos.
                    const tallasDetalles = data[1].filter((row) => { return row.talla });
                    // Se almacena en la constante el conjunto de datos configurado para utilizarlo en el select.
                    const itemsTallas = tallasDetalles.map((item) => { return { value: item.id_producto_talla, label: item.talla } });
                    // Se establece el valor de la constante.
                    setTallasDetalle(itemsTallas);
                    break;
                case data[2] && !data[3]:
                    // Se almacenan dentro de la constante los colores encontrados en el conjunto de datos.
                    const coloresDetalles = data[1].filter((row) => { return row.color_producto });
                    // Se almacena en la constante el conjunto de datos configurado para utilizarlo en el select.
                    const itemsColores = coloresDetalles.map((item) => { return { value: item.id_producto_color, label: item.color_producto } });
                    // Se establece el valor de la constante.
                    setColoresDetalle(itemsColores);
                    break;
                case !data[2] && !data[3]:
                    // Se asigna el valor del id del detalle de producto.
                    idDetalle = data[1].id_detalle_producto;
                    // Se asigna el valor de las existencias del detalle de producto.
                    existencias = data[1].existencia_producto;
                    // Se restablece el valor de la variable.
                    error = 0;
                    break;
            }
        } catch (error) {
        }
    }

    const cambiarCantidad = (operacion) => {
        if (operacion == -1 && cantidad > 1) {
            setCantidad(cantidad - 1);
        } else if (operacion == +1) {
            setCantidad(cantidad + 1);
        }
    }

    const handleAgregarDetalle = async () => {

        const precioProducto = data[0].precio_producto;

        try {
            // Se inicializa la variable dónde se almacenará la existencia de un detalle de producto.
            var existencias = 0;
            var idDetalle = 0;
            var error = 0;
            var advertencia = 0;
            // Switch case para verificar información y configurar variables.
            switch (true) {
                case data[2] && data[3]:
                    // Se verifica que se haya seleccionado una talla y un color.
                    if (talla == 0) {
                        // Se configura el valor de la variable.
                        existencias = 1;
                        advertencia = 1;
                        // Se muestra la advertencia.
                        Alert.alert('Seleccione una talla', 'Asegúrese de seleccionar una talla de la lista de opciones');
                    } else if (color == 0) {
                        // Se configura el valor de la variable.
                        existencias = 1;
                        advertencia = 1;
                        // Se muestra la advertencia.
                        Alert.alert('Seleccione un color', 'Asegúrese de seleccionar un color de la lista de opciones');
                    } else {
                        // Se almacena en la variable el conjunto de datos que cumple con la condición.
                        var data_detalle = data[1].filter(({ id_producto_color, id_producto_talla }) =>
                            id_producto_color == color && id_producto_talla == talla
                        );

                        if (data_detalle.length == 0) {
                            error = 1;
                        } else {
                            // Si configuran el valor de las variables.
                            existencias = data_detalle[0].existencia_producto;
                            idDetalle = data_detalle[0].id_detalle_producto;
                            // Se restablece el valor de la variable.
                            error = 0;
                        }
                    }
                    break;
                case !data[2] && data[3]:
                    // Se verifica que el usuario haya seleccionado una talla.
                    if (talla != 0) {
                        // Se recorre el conjunto de datos.
                        data[1].forEach(row => {
                            // Si la talla seleccionada coincide se almacena el id de detalle de producto en la variable y se configuran las existencias.
                            row.id_producto_talla == talla ? (idDetalle = row.id_detalle_producto, existencias = row.existencia_producto) : '';
                        });
                        // Se restablece el valor de la variable.
                        error = 0;
                    } else {
                        existencias = 1;
                        advertencia = 1;
                        Alert.alert('Seleccione una talla', 'Asegúrese de seleccionar una talla de la lista de opciones');
                    }
                    break;
                case data[2] && !data[3]:
                    // Se verifica que el usuario haya seleccionado un color.
                    if (color != 0) {
                        // Se recorre el conjunto de datos.
                        data[1].forEach(row => {
                            // Si el color seleccionado coincide se almacena el id de detalle de producto en la variable y se configuran las existencias.
                            row.id_producto_color == color ? (idDetalle = row.id_detalle_producto, existencias = row.existencia_producto) : '';
                        });
                        // Se restablece el valor de la variable.
                        error = 0;
                    } else {
                        existencias = 1;
                        advertencia = 1;
                        Alert.alert('Seleccione un color', 'Asegúrese de seleccionar un color de la lista de opciones');
                    }
                    break;
                case !data[2] && !data[3]:
                    // Se asigna el valor del id del detalle de producto.
                    idDetalle = data[1].id_detalle_producto;
                    // Se asigna el valor de las existencias del detalle de producto.
                    existencias = data[1].existencia_producto;
                    // Se restablece el valor de la variable.
                    error = 0;
                    break;
            }

            if (existencias == 0 || error) {
                Alert.alert('El producto no se encuentra disponible', 'Lo sentimos mucho');
            }
            else if (advertencia == 1) {
            }
            else if (existencias < cantidad && !error) {
                Alert.alert('La cantidad requerida excede las existencias', 'Seleccione un máximo de ' + existencias + ' existencias.');
            } else if (!error) {

                const response_start_order = await fetch(`${ip}/SeaSmart/api/services/public/pedido.php?action=startOrder`, {
                    method: 'GET'
                });

                const data_order = await response_start_order.json();

                if (data_order.status) {

                    const formData = new FormData();
                    formData.append('idDetalleProducto', idDetalle);
                    formData.append('cantidadRequerida', cantidad);
                    formData.append('precioProducto', precioProducto);

                    const response_product_order = await fetch(`${ip}/SeaSmart/api/services/public/detalles_pedidos.php?action=readCartWithDetail`, {
                        method: 'POST',
                        body: formData
                    });

                    const data_product_order = await response_product_order.json();

                    if (data_product_order.status) {
                        const response = await fetch(`${ip}/SeaSmart/api/services/public/detalles_pedidos.php?action=addDetail`, {
                            method: 'POST',
                            body: formData
                        });

                        const data = await response.json();

                        if (data.status) {
                            Alert.alert('Producto agregado al carrito');
                            cerrarModal(false);
                        } else {
                            Alert.alert('Error', data.error);
                        }
                    } else if (data_product_order.error == "El detalle del producto ya ha sido agregado al carrito") {
                        Alert.alert('No se puede agregar el producto al carrito', 'El producto ya ha sido agregado al carrito');
                    }
                    else {
                        Alert.alert('Error', data_product_order.error);
                    }
                } else {
                    Alert.alert('Error', data_order.error);
                }
            }
        } catch (error) {
            console.log(error);
            Alert.alert(toString(error), 'Ocurrió un error al crear detalle');
        }
    };

    return (
        <>
            {
                data[2] && data[3] ?
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
                                <Text style={styles.modalText}>{data[0].nombre_producto}</Text>
                                {
                                    tallasDetalle.length > 1 ?
                                        <>
                                            <Text style={{ fontSize: 16, alignSelf: 'flex-start', fontWeight: '600' }}>Opción de talla:</Text>
                                            <View style={{ borderRadius: 20, borderWidth: 1, overflow: 'hidden', borderColor: '#000', width: '100%' }}>
                                                {
                                                    <Dropdown
                                                        style={[styles.dropdown]}
                                                        placeholderStyle={styles.placeholderStyle}
                                                        selectedTextStyle={styles.selectedTextStyle}
                                                        inputSearchStyle={styles.inputSearchStyle}
                                                        iconStyle={styles.iconStyle}
                                                        data={tallasDetalle}
                                                        value={talla}
                                                        placeholder='Seleccione una talla'
                                                        search
                                                        maxHeight={300}
                                                        labelField="label"
                                                        valueField="value"
                                                        searchPlaceholder="Buscar una talla..."
                                                        onChange={item => {
                                                            setTalla(item.value);
                                                        }}
                                                    />
                                                }
                                            </View>
                                        </>
                                        : (
                                            <>
                                                {tallasDetalle != undefined && tallasDetalle[0] != undefined ? <>{() => setTalla(tallasDetalle[0].value)}</> : <></>}
                                                <View style={{ width: '100%', flexDirection: 'row', gap: 30 }}>
                                                    <Text style={{ fontSize: 16, fontWeight: '600' }}>Opción de talla:</Text>
                                                    <Text style={{ color: 'black', fontSize: 18, }}>
                                                        {tallasDetalle != undefined && tallasDetalle[0] != undefined ? tallasDetalle[0].label : <></>}
                                                    </Text>
                                                </View>
                                            </>
                                        )
                                }
                                {
                                    coloresDetalle.length > 1 ?
                                        <>
                                            <Text style={{ fontSize: 16, alignSelf: 'flex-start', fontWeight: '600' }}>Opción de color:</Text>
                                            <View style={{ borderRadius: 20, borderWidth: 1, overflow: 'hidden', borderColor: '#000', width: '100%' }}>
                                                <Dropdown
                                                    style={[styles.dropdown]}
                                                    placeholderStyle={styles.placeholderStyle}
                                                    selectedTextStyle={styles.selectedTextStyle}
                                                    inputSearchStyle={styles.inputSearchStyle}
                                                    iconStyle={styles.iconStyle}
                                                    data={coloresDetalle}
                                                    placeholder='Seleccione un color'
                                                    search
                                                    value={color}
                                                    maxHeight={300}
                                                    labelField="label"
                                                    valueField="value"
                                                    searchPlaceholder="Buscar un color..."
                                                    onChange={item => {
                                                        setColor(item.value);
                                                    }}
                                                />
                                            </View>
                                        </>
                                        :
                                        (
                                            <>
                                                {coloresDetalle != undefined && coloresDetalle[0] != undefined ? <>{() => setColor(coloresDetalle[0].value)}</> : <></>}
                                                <View style={{ width: '100%', flexDirection: 'row', gap: 30 }}>
                                                    <Text style={{ fontSize: 16, fontWeight: '600' }}>Opción de color:</Text>
                                                    <Text style={{ color: 'black', fontSize: 16 }}>
                                                        {coloresDetalle != undefined && coloresDetalle[0] != undefined ? coloresDetalle[0].label : <></>}
                                                    </Text>
                                                </View>
                                            </>
                                        )
                                }
                                <View style={styles.containerCantidad}>
                                    <Text style={styles.textoCantidad}>Cantidad:</Text>
                                    <View style={styles.containerCantidad}>
                                        <TouchableOpacity onPress={() => cambiarCantidad(-1)}>
                                            <Image source={require('../../../assets/minus.png')} style={styles.image} />
                                        </TouchableOpacity>
                                        <Text style={styles.textoCantidad}>{cantidad}</Text>
                                        <TouchableOpacity onPress={() => cambiarCantidad(+1)}>
                                            <Image source={require('../../../assets/plus.png')} style={styles.image} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <SimpleButton
                                    textoBoton='Agregar al carrito'
                                    accionBoton={() => handleAgregarDetalle()}
                                    anchoBoton={'100'}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </Modal>
                    : data[2] && !data[3] ?
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
                                    <Text style={styles.modalText}>{data[0].nombre_producto}</Text>
                                    <Text style={{ fontSize: 16, alignSelf: 'flex-start', fontWeight: '600' }}>Opción de color:</Text>
                                    <View style={{ borderRadius: 20, borderWidth: 1, overflow: 'hidden', borderColor: '#000', width: '100%' }}>
                                        <Dropdown
                                            style={[styles.dropdown]}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            inputSearchStyle={styles.inputSearchStyle}
                                            iconStyle={styles.iconStyle}
                                            data={coloresDetalle}
                                            search
                                            placeholder='Seleccione un color'
                                            value={color}
                                            maxHeight={300}
                                            labelField="label"
                                            valueField="value"
                                            searchPlaceholder="Buscar un color..."
                                            onChange={item => {
                                                setColor(item.value);
                                            }}
                                        />
                                    </View>
                                    <View style={styles.containerCantidad}>
                                        <Text style={styles.textoCantidad}>Cantidad:</Text>
                                        <View style={styles.containerCantidad}>
                                            <TouchableOpacity onPress={() => cambiarCantidad(-1)}>
                                                <Image source={require('../../../assets/minus.png')} style={styles.image} />
                                            </TouchableOpacity>
                                            <Text style={styles.textoCantidad}>{cantidad}</Text>
                                            <TouchableOpacity onPress={() => cambiarCantidad(+1)}>
                                                <Image source={require('../../../assets/plus.png')} style={styles.image} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <SimpleButton
                                        textoBoton='Agregar al carrito'
                                        accionBoton={() => handleAgregarDetalle()}
                                        anchoBoton={'100'}
                                    />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </Modal>
                        : !data[2] && data[3] ?
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
                                        <Text style={styles.modalText}>{data[0].nombre_producto}</Text>
                                        <Text style={{ fontSize: 16, alignSelf: 'flex-start', fontWeight: '600' }}>Opción de talla:</Text>
                                        <View style={{ borderRadius: 20, borderWidth: 1, overflow: 'hidden', borderColor: '#000', width: '100%' }}>
                                            <Dropdown
                                                style={[styles.dropdown]}
                                                placeholderStyle={styles.placeholderStyle}
                                                selectedTextStyle={styles.selectedTextStyle}
                                                inputSearchStyle={styles.inputSearchStyle}
                                                iconStyle={styles.iconStyle}
                                                data={tallasDetalle}
                                                placeholder='Seleccione una talla'
                                                search
                                                value={talla}
                                                maxHeight={300}
                                                labelField="label"
                                                valueField="value"
                                                searchPlaceholder="Buscar una talla..."
                                                onChange={item => {
                                                    setTalla(item.value);
                                                }}
                                            />
                                        </View>
                                        <View style={styles.containerCantidad}>
                                            <Text style={styles.textoCantidad}>Cantidad:</Text>
                                            <View style={styles.containerCantidad}>
                                                <TouchableOpacity onPress={() => cambiarCantidad(-1)}>
                                                    <Image source={require('../../../assets/minus.png')} style={styles.image} />
                                                </TouchableOpacity>
                                                <Text style={styles.textoCantidad}>{cantidad}</Text>
                                                <TouchableOpacity onPress={() => cambiarCantidad(+1)}>
                                                    <Image source={require('../../../assets/plus.png')} style={styles.image} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <SimpleButton
                                            textoBoton='Agregar al carrito'
                                            accionBoton={() => handleAgregarDetalle()}
                                            anchoBoton={'100'}
                                        />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            </Modal>
                            :
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
                                        <Text style={styles.modalText}>{data[0].nombre_producto}</Text>
                                        <View style={styles.containerCantidad}>
                                            <Text style={styles.textoCantidad}>Cantidad:</Text>
                                            <View style={styles.containerCantidad}>
                                                <TouchableOpacity onPress={() => cambiarCantidad(-1)}>
                                                    <Image source={require('../../../assets/minus.png')} style={styles.image} />
                                                </TouchableOpacity>
                                                <Text style={styles.textoCantidad}>{cantidad}</Text>
                                                <TouchableOpacity onPress={() => cambiarCantidad(+1)}>
                                                    <Image source={require('../../../assets/plus.png')} style={styles.image} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <SimpleButton
                                            textoBoton='Agregar al carrito'
                                            accionBoton={() => handleAgregarDetalle()}
                                            anchoBoton={'100'}
                                        />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            </Modal>
            }
        </>
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
    modalText: {
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        width: 200,
        textAlign: 'center',
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
        alignItems: 'center',
        flexDirection: 'row',
        gap: 20,
        width: '85%',
        justifyContent: 'space-between'
    },
    image: {
        height: 40,
        width: 40
    },
    textoCantidad: {
        fontSize: 16,
        alignSelf: 'center',
        textAlign: 'left',
        fontWeight: '600'
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
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

export default ModalCompra;
