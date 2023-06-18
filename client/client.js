var grpc = require("@grpc/grpc-js");

var greet_pb = require("../server/proto/greet_pb");
var greet_grpc_pb = require("../server/proto/greet_grpc_pb");

var calc_pb = require("../server/proto/calc_pb");
var calc_grpc_pb = require("../server/proto/calc_grpc_pb");

function main() {
  var greet_client = new greet_grpc_pb.GreetServiceClient(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );

  var calc_client = new calc_grpc_pb.calcServiceClient(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );

  var greetObj = new greet_pb.Greeting();
  greetObj.setFirstName("Khaled");
  greetObj.setLastName("Allam");

  var greet_request = new greet_pb.GreetRequest();
  greet_request.setGreeting(greetObj);

  var calc_request = new calc_pb.SumRequest();
  calc_request.setFirstNumber(200900);
  calc_request.setSecondNumber(700100);

  greet_client.greet(greet_request, (error, response) => {
    if (!error) {
      console.log("✅ Greeting Response is: ", response.getResult());
    } else {
      console.log("✅ Greeting Response -ERROR- is: ", error);
    }
  });

  calc_client.sum(calc_request, (error, response) => {
    if (!error) {
      console.log("✅ Sum Response is: ", response.getSumResult());
      console.log(
        calc_request.getFirstNumber() +
          ` + ` +
          calc_request.getSecondNumber() +
          ` = ` +
          response.getSumResult()
      );
    } else {
      console.log("✅ Sum Response -ERROR- is: ", error);
    }
  });
}
main();
