import axios from "axios";
import router from "../router/index";
import store from "../vuex/store";

let Api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

Api.defaults.withCredentials = true;
Api.defaults.baseURL = import.meta.env.VITE_BASE_URL;

Api.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${store.getters.token}`;
  store.dispatch("displaySpinnerPage", true);
  return config;
});

function unauthorizedUnauthintecatedErrorResponse(error) {
  if (error.response.status == 419 || error.response.status == 403) {
    let response = error.response;
    if (response.config.method == "post") {
      router.push({ path: "/unauthorized/1" });
    } else if (response.config.method == "get") {
      router.push({ path: "/unauthorized/2" });
    }
  } else if (error.response.status == 401) {
    showUnauthintecatedToast();
  }
}
function showNetworkToast() {
  const NetworkToast = document.getElementById("NetworkErrorToast");
  const NetworkToastBootstrap = new bootstrap.Toast(NetworkToast);
  NetworkToastBootstrap.show();
}

function showUnauthintecatedToast() {
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = new bootstrap.Toast(toastLiveExample);
  sessionStorage.removeItem("User");
  store.dispatch("userData", null);
  store.dispatch("showUnauthToast", true);

  toastBootstrap.show();
}

Api.interceptors.response.use(
  function (response) {
    store.dispatch("displaySpinnerPage", false);

    return response;
  },
  function (error) {
    store.dispatch("displaySpinnerPage", false);
    if (!error.response) {
      console.log(error)
      showNetworkToast();
    } else {
      unauthorizedUnauthintecatedErrorResponse(error);
    }

    return Promise.reject(error);
  }
);

const instances = {
  Api,
};

export default instances;
