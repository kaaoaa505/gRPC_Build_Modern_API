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

function call_greet_service(){
  var greet_client = new greet_proto.GreetService(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );

  var greet_request = {
    greeting: {
        first_name: 'Khaled',
        last_name: 'Allam',
    }
  }

  greet_client.greet(greet_request, (error, response) => {
    if (!error) {
      console.log("✅ Greeting Response is: ", response);
      console.log("✅ Greeting Response Result is: ", response.result);
    } else {
      console.log("✅ Greeting Response -ERROR- is: ", error);
    }
  });
}

function main() {
    call_greet_service();
}
main();