import axios from "axios";
import MockAdapter from "axios-mock-adapter";

export const Landing = () => {
  const click = () => {
    var mock = new MockAdapter(axios);

    // Mock any GET request to /users
    // arguments for reply are (status, data, headers)
    mock.onGet("/users").reply(500, {
      users: [{ id: 1, name: "John Smith" }],
    });

    axios
      .get("/users")
      .then(function (response) {
        console.log("Valid", response);
      })
      .catch((response) => {
        console.log("Error", { response });
      });
  };
  return (
    <>
      <button onClick={click}>Click me</button>
    </>
  );
};
