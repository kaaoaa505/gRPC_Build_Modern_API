var grpc = require("@grpc/grpc-js");

var greet_pb = require("./proto/greet_pb");
var greet_grpc_pb = require("./proto/greet_grpc_pb");

var calc_pb = require("./proto/calc_pb");
var calc_grpc_pb = require("./proto/calc_grpc_pb");

function greet(call, callback) {
  var response = new greet_pb.GreetResponse();

  response.setResult(
    "Hello, " +
      call.request.getGreeting().getFirstName() +
      " " +
      call.request.getGreeting().getLastName()
  );

  callback(null, response);
}

function sum(call, callback) {
  var response = new calc_pb.SumResponse();

  response.setSumResult(
    call.request.getFirstNumber() + call.request.getSecondNumber()
  );

  callback(null, response);
}

function main() {
  var server = new grpc.Server();

  server.addService(greet_grpc_pb.GreetServiceService, { greet: greet });
  server.addService(calc_grpc_pb.calcServiceService, { sum: sum });

  server.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
      console.log("✅ Server started:  127.0.0.1:50051");
    }
  );
}
main();
