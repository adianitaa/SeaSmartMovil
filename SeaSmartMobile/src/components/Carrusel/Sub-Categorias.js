// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, FlatList } from 'react-native';
// import fetchData from '../utils/fetchData';
// import ProductoCard from './ProductoCard';

// const SubCategoria = ({ subCategoria }) => {
//     const [productos, setProductos] = useState([]);

//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     const fetchProducts = async () => {
//         try {
//             const response = await fetchData('productos', 'readAllSub', { idSubCategoria: subCategoria.id_sub_categoria });
//             if (response.status === 1) {
//                 setProductos(response.dataset);
//             } else {
//                 console.error('Error al obtener productos:', response.error);
//             }
//         } catch (error) {
//             console.error('Error al obtener productos:', error);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>{subCategoria.nombre_sub_categoria}</Text>
//             <FlatList
//                 data={productos}
//                 renderItem={({ item }) => <ProductoCard producto={item} />}
//                 keyExtractor={(item) => item.id_producto.toString()}
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//                 contentContainerStyle={styles.listContainer}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         marginVertical: 10,
//     },
//     title: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         marginLeft: 10,
//         marginVertical: 10,
//     },
//     listContainer: {
//         paddingHorizontal: 10,
//     },
// });

// export default SubCategoria;
