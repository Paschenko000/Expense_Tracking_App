import { MMKV } from "react-native-mmkv";
const storage = new MMKV();

export function storeData(key: string, value: any) {
  try {
    storage.set(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
}

export function getItem(key: string) {
  try {
    const value = storage.getString(key);
    if (value) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.log(error);
  }
}
