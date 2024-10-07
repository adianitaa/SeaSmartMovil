import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';

export default function MaskedInputTelefono({ telefono, setTelefono, placeholder, boolean = null, isEditing = null }) {
    const [isFocused, setIsFocused] = useState(false);

    const handleTelefonoChange = (text) => {
        if (placeholder === "Teléfono fijo" && text.length === 1 && text !== '2') {
            return;
        }
        if (placeholder === "Teléfono móvil" && text.length === 1 && text !== '7') {
            return;
        }
        setTelefono(text);
    };

    return (
        <>
            {
                boolean == null ?
                    <TextInput
                        style={styles.Input}
                        label={placeholder}
                        value={telefono}
                        onChangeText={handleTelefonoChange}
                        mode="outlined"
                        outlineColor="white"
                        theme={{
                            colors: {
                                primary: '#4593EE'
                            }
                        }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        render={props =>
                            <TextInputMask
                                {...props}
                                type={'custom'}
                                options={{
                                    mask: '9999-9999'
                                }}
                                value={telefono}
                                onChangeText={handleTelefonoChange}
                            />
                        }
                    />
                    :
                    <TextInput
                        style={styles.input}
                        label={placeholder}
                        value={telefono}
                        onChangeText={handleTelefonoChange}
                        mode="outlined"
                        outlineColor="white"
                        theme={{
                            colors: {
                                primary: '#4593EE'
                            }
                        }}
                        editable={isEditing}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        render={props =>
                            <TextInputMask
                                {...props}
                                type={'custom'}
                                options={{
                                    mask: '9999-9999'
                                }}
                                value={telefono}
                                onChangeText={handleTelefonoChange}
                            />
                        }
                    />
            }
        </>
    );
}

const styles = StyleSheet.create({
    Input: {
        backgroundColor: '#FFF',
        color: "#090A0A",
        fontWeight: '800',
        width: Dimensions.get('window').width / 1.2,
        borderRadius: 5,
        padding: 5,
        marginVertical: 10,
    },
    input: {
        backgroundColor: '#FFF',
        color: "#090A0A",
        fontWeight: '800',
        flex: 1,
        borderRadius: 5,
    },
});
