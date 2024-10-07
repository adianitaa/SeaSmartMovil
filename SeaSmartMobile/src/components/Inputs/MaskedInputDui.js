import React, { useState } from 'react';
import { StyleSheet, Dimensions, TextInput as ReactTextInput } from 'react-native';
import { TextInput } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';

export default function MaskedInputDui({ dui, setDui, boolean = null, isEditing = null }) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <>
            {
                boolean == null ?
                    <TextInput
                        style={styles.Input}
                        label="Dui"
                        value={dui}
                        onChangeText={setDui}
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
                                    mask: '99999999-9'
                                }}
                                value={dui}
                                onChangeText={setDui}
                            />
                        }
                    />
                    :
                    <TextInput
                        style={styles.input}
                        label="Dui"
                        value={dui}
                        onChangeText={setDui}
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
                                    mask: '99999999-9'
                                }}
                                value={dui}
                                onChangeText={setDui}
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
