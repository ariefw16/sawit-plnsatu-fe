import axios from "axios";

export const handleErrorAxios = (e: any, rejectWithValue: any) => {
  if (axios.isAxiosError(e)) {
    if (e.response) {
      return rejectWithValue({
        errorMessage: e.response?.data?.message || e.response?.data,
      });
    }
  }
  return rejectWithValue({ errorMessage: "Network Error" });
};
