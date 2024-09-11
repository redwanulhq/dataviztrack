import { useState } from "react";
import Axios from "../lib/axios";
import { toast } from "react-toastify";

const useApi = () => {
  const [loading, setLoading] = useState(false);

  const fetchData = async (endpoint, showToast) => {
    setLoading(true);
    try {
      const response = await Axios[endpoint?.method](
        endpoint?.url,
        endpoint?.data,
        {
          onUploadProgress: (progressEvent) => {
            let percentComplete = progressEvent.loaded / progressEvent.total;
            percentComplete = parseInt(percentComplete * 100);
            if (endpoint?.updateProgress) {
              endpoint?.updateProgress(percentComplete);
            }
          },
        }
      );
      const data = response?.data;
      setLoading(false);
      toast.dismiss();
      if (showToast !== false)
        toast[response.data.success ? "success" : "error"](
          response.data.message
        );
      return data;
    } catch (error) {
      setLoading(false);
      const errorrRes = error?.response?.data;
      return errorrRes;
    }
  };

  return { loading, fetchData };
};

export default useApi;
