import server from "./app";

server.listen(process.env.PORT || 8080, () =>
  console.log("Server is running on port: " + process.env.PORT)
);
