import * as SecureStore from "expo-secure-store";

//base url
export const API_URL = 'http://192.168.8.120:5000/api/v1';

//function to retrieve token
export async function getConfig() {
  const token = await SecureStore.getItemAsync("token");
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
}

//logout
export async function logOut() {
  await SecureStore.deleteItemAsync("token");
}
