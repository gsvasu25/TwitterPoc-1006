import mockAxios from "axios";
import { fetchData } from "../Api/request";

it("should call a fetchData function", (done) => {
  fetchData("https://jsonplaceholder.typicode.com/posts", {}).then(
    (response) => {
      expect(response).toEqual({
        data: {},
      });
    }
  );

  done();
});
