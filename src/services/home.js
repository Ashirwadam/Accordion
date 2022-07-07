import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const axiosMockInstance = new AxiosMockAdapter(axios, { delayResponse: 0 });

export async function getResult(payload) {
  try {
    axiosMockInstance.onPost().reply(200, { name: "ash" });
    return axios.post("http://localhost:8080/testUI", payload);
  } catch (err) {
    return { err };
  }
}
