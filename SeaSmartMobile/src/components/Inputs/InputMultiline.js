
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

export default function InputMultiline({ placeHolder, setValor, valor }) {

  return (

    <TextInput
      style={styles.Input}
      placeholder={placeHolder}
      value={valor}
      onChangeText={setValor}
      placeholderTextColor={'#090A0A'}
      multiline={true}
      numberOfLines={4}
      maxLength={200}
      theme={{
          colors: {
              primary: '#4593EE'
          },
      }}
    />

  );
}

const styles = StyleSheet.create({
  Input: {
    backgroundColor: '#FFF',
    color: "black",
    width: '100%'
  },

});