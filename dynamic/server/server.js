const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const greetProtoPath = path.join(__dirname, "..", "proto", "greet.proto");
const greetProtoDefinition = protoLoader.loadSync(greetProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const greet_proto = grpc.loadPackageDefinition(greetProtoDefinition).greet;

function greet(call, callback) {
  var response = greet_proto.GreetResponse;

  var first_name = call.request.greeting.first_name;
  var last_name = call.request.greeting.last_name;

  response = {
    result: `Hello, ${first_name} ${last_name}`
  };

  callback(null, response);
}

function call_greet_service() {
  var server = new grpc.Server();

  server.addService(greet_proto.GreetService.service, { greet: greet });

  server.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
      console.log("✅ Server started:  127.0.0.1:50051");
    }
  );
}

function main() {
  call_greet_service();
}
main();
