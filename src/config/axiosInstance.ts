import axios from "axios";

const axiosInstance = axios.create({
  validateStatus: function (status) {
    // Resolve the promise if the status code is in the range 200-599
    return status >= 200 && status <= 599;
  },
});

export { axiosInstance };
