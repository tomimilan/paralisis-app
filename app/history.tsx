import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { getParalisis, Paralisis } from '../src/storage/paralisisStorage';

export default function HistoryScreen() {
  const [data, setData] = useState<Paralisis[]>([]);

  const cargarData = async () => {
    const lista = await getParalisis();
    setData(lista.reverse()); // más recientes primero
  };

  useEffect(() => {
    cargarData();
  }, []);

  const renderItem = ({ item }: { item: Paralisis }) => (
    <View style={styles.card}>
      <Text style={styles.fecha}>
        {new Date(item.fecha).toLocaleString()}
      </Text>

      {item.descripcion ? (
        <Text style={styles.descripcion}>{item.descripcion}</Text>
      ) : (
        <Text style={styles.sinDesc}>Sin descripción</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay registros aún</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#000',
    textAlign: 'center'
  },
  card: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10
  },
  fecha: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5
  },
  descripcion: {
    fontSize: 16,
    color: '#000'
  },
  sinDesc: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic'
  },
  empty: {
    textAlign: 'center',
    marginTop: 50,
    color: '#999'
  }
});