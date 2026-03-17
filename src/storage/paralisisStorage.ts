import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'paralisis';

export interface Paralisis {
  id: number;
  fecha: string;
  descripcion?: string;
}

// Obtener todas
export const getParalisis = async (): Promise<Paralisis[]> => {
  try {
    const data = await AsyncStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Guardar una nueva
export const addParalisis = async (descripcion?: string) => {
  try {
    const data = await AsyncStorage.getItem(KEY);
    const lista: Paralisis[] = data ? JSON.parse(data) : [];

    const nuevo: Paralisis = {
      id: Date.now(),
      fecha: new Date().toISOString(),
      descripcion
    };

    lista.push(nuevo);

    await AsyncStorage.setItem(KEY, JSON.stringify(lista));
  } catch (error) {
    console.log(error);
  }
};