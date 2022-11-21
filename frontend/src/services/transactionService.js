import { api, requestConfig } from "../utils/config";

// Transaction
const transaction = async (data, token) => {
  
  const config = requestConfig("POST", data, token);
  try {
    const res = await fetch(api + "/transaction", config)
      .then((res) => res.json())
      .catch((err) => err)
    
    return res;
  } catch (error) {
  }
};


const transactionService = {
  transaction  
}
export default transactionService;
