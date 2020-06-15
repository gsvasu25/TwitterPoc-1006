import axios from "axios";
export const fetchData = async (query, config) => {
  try {
    const { data } = await axios.request({
      method: "get",
      url: encodeURI(query),
      ...config,
    });

    return data;
  } catch (e) {
    console.error("Could not fetchData", e);
  }
};
