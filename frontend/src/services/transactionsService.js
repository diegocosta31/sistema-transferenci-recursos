import { api, requestConfig } from "../utils/config";

// Get transactions details
const transactionsDetails = async (data, token) => {
  const config = requestConfig("GET", data, token);

  try {
    const res = await fetch(api + "/transactions", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};



const transactionsDetail = {
  transactionsDetails,
};

export default transactionsDetail;
