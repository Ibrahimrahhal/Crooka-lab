import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { Endpoint } from "../config";
namespace StorContoller {
  export async function get(key) {
    return await SecureStore.getItemAsync(key);
  }
  export async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
}

namespace APIContoller {
  const endpoint = Endpoint;
  async function getBaseRequest() {
    return axios.create({
      baseURL: endpoint,
      timeout: 1000,
      headers: { Authorization: await StorContoller.get("JWT_TOKEN") },
    });
  }
  export async function isLoggedIn() {
    try {
      const request = await getBaseRequest();
      await request.get("user/logged");
      return true;
    } catch (e) {
      console.log(e.toString());
      return false;
    }
  }
}
export async function isLoggedIn() {
  return await APIContoller.isLoggedIn();
}
export async function isFirstOpen() {
  return !(await StorContoller.get("NotFirstLogin"));
}
