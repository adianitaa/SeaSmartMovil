import { StyleSheet, Dimensions } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export default function Input({ placeHolder, setValor, contra, setTextChange, boolean = null, isEditing = null }) {

  return (
    <>
      {
        boolean == null ?
          <TextInput
            style={styles.Input}
            label={placeHolder}
            value={setValor}
            secureTextEntry={contra}
            onChangeText={setTextChange}
            mode="outlined"
            outlineColor="white"
            theme={{
              colors: {
                primary: '#4593EE'
              }
            }}
          />
          :
          <TextInput
            style={styles.input}
            label={placeHolder}
            value={setValor}
            secureTextEntry={contra}
            onChangeText={setTextChange}
            mode="outlined"
            outlineColor="white"
            editable={isEditing}
            theme={{
              colors: {
                primary: '#4593EE'
              }
            }}
          />
      }
    </>
  );
}

const styles = StyleSheet.create({
  Input: {
    backgroundColor: '#FFF',
    color: "#090A0A", fontWeight: '800',
    width: 300,
    borderRadius: 5,
    padding: 5,
    marginVertical: 10,
    width: Dimensions.get('window').width / 1.2,
    backgroundColor: '#FFFFFF',
  },
  input: {
    backgroundColor: '#FFF',
    color: "#090A0A",
    fontWeight: '800',
    flex: 1,
    borderRadius: 5,
  },
});