import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { addParalisis, getParalisis } from '../../src/storage/paralisisStorage';

export default function HomeScreen() {
  const [count, setCount] = useState(0);
  const [descripcion, setDescripcion] = useState('');

  const cargarCantidad = async () => {
    const lista = await getParalisis();
    setCount(lista.length);
  };

  useEffect(() => {
    cargarCantidad();
  }, []);

  const handlePress = async () => {
    await addParalisis(descripcion);
    await cargarCantidad();

    Alert.alert('Registrado', 'Se guardó un episodio');
    setDescripcion('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parálisis del sueño</Text>

      <Text style={styles.counter}>{count}</Text>

      <Text style={styles.instructions}>
        De ser necesario primero escriba la situación y luego pulse el botón para guardar la parálisis
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Descripción del episodio..."
        placeholderTextColor="#888"
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>TUVE UNA</Text>
      </TouchableOpacity>

      <Link href="/history" asChild>
        <TouchableOpacity style={styles.historyButton}>
          <Text style={styles.historyText}>Ver historial</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#000'
  },
  counter: {
    fontSize: 60,
    marginBottom: 20,
    color: '#000'
  },
  instructions: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 15,
    paddingHorizontal: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '80%',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  button: {
    backgroundColor: '#ff4444',
    paddingVertical: 30,
    paddingHorizontal: 50,
    borderRadius: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  historyButton: {
    marginTop: 20,
    padding: 15
  },
  historyText: {
    color: 'blue',
    fontSize: 16
  }
});