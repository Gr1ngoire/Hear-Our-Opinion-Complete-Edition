import axios from "axios";
import configFile from "../config.json";
import { toast } from "react-toastify";

const http = axios.create({
    baseURL: configFile.apiEndpoint
});

http.interceptors.response.use(
    (res) => {
        if (Array.isArray(res.data)) {
            res.data = {
                content: res.data.map((piece) => {
                    const temp1 = piece.requiredVoices;
                    delete piece.required;
                    return {
                        ...piece,
                        voicesRequired: temp1
                    };
                })
            };
        } else {
            const temp1 = res.data.required;
            delete res.data.required;
            res.data = {
                content: {
                    ...res.data,
                    voicesRequired: temp1
                }
            };
        }
        return res;
    },
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;

        if (!expectedErrors) {
            toast.error(
                "Something went wrong on server. Wait a bit and try again later =)"
            );
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
    patch: http.patch
};

export default httpService;
