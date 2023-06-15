var grpc = require('@grpc/grpc-js');

var greet_pb = require('../server/proto/greet_pb');
var greet_grpc_pb = require('../server/proto/greet_grpc_pb');

function main(){    
    var greet_client = new greet_grpc_pb.GreetServiceClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    );

    var greetObj = new greet_pb.Greeting();
    greetObj.setFirstName("Khaled");
    greetObj.setLastName("Allam");

    var greet_request = new greet_pb.GreetRequest();
    greet_request.setGreeting(greetObj);

    greet_client.greet(greet_request, (error, response)=>{
        if(!error){
            console.log('✅ Greeting Response is: ', response.getResult());
        }else{
            console.log('✅ Greeting Response -ERROR- is: ', error);
        }
    });
}
main();