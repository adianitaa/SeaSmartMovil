// import React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// const ProductoCard = ({ producto }) => {
//     return (
//         <View style={styles.card}>
//             <Image source={producto.imagen_producto ? { uri: producto.imagen_producto } : { uri: producto.imagen_producto } } style={styles.image} />
//             <Text style={styles.title}>{producto.nombre_producto}</Text>
//             <Text style={styles.price}>Precio: ${producto.precio_producto}</Text>
//             <Text style={styles.available}>{producto.estado_producto ? 'Disponible' : 'No disponible'}</Text>
//             <TouchableOpacity style={styles.button}>
//                 <Text style={styles.buttonText}>Ver producto</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     card: {
//         backgroundColor: '#3498db',
//         borderRadius: 10,
//         padding: 20,
//         alignItems: 'center',
//         margin: 10,
//     },
//     image: {
//         width: 100,
//         height: 150,
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#fff',
//         marginVertical: 10,
//     },
//     price: {
//         fontSize: 16,
//         color: '#fff',
//     },
//     available: {
//         fontSize: 14,
//         color: '#fff',
//     },
//     button: {
//         marginTop: 10,
//         backgroundColor: '#5dade2',
//         padding: 10,
//         borderRadius: 5,
//     },
//     buttonText: {
//         fontSize: 16,
//         color: '#fff',
//         textAlign: 'center',
//     },
// });

// export default ProductoCard;
