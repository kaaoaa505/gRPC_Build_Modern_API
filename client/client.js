var grpc = require('@grpc/grpc-js');

var greet_pb = require('../server/proto/greet_pb');
var greet_grpc_pb = require('../server/proto/greet_grpc_pb');

var hello_grpc_pb = require('../server/proto/hello_grpc_pb');

function main(){

    console.log('\n\n\n')
    console.log('✅ ---------------------------client start---------------------------')
    console.log('\n\n\n')
    
    var hello_client = new hello_grpc_pb.HelloServiceClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    );
    
    var greet_client = new greet_grpc_pb.GreetServiceClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    );

    console.log('----✅ hello_client    ', hello_client)
    console.log('----✅ greet_client    ', greet_client)

    var greetObj = new greet_pb.Greeting()
    greetObj.setFirstName("Khaled");
    greetObj.setLastName("Allam");

    var greet_request = new greet_pb.GreetRequest()
    greet_request.setGreeting(greetObj);

    greet_client.greet(greet_request, (error, response)=>{
        console.log('\n\n\n')
        if(!error){
            console.log('✅ Greeting Response is: ', response.getResult());
        }else{
            console.log('✅ Greeting Response -ERROR- is: ', error);
        }
        console.log('\n\n\n')
    })

    console.log('\n\n\n')
    console.log('✅ ---------------------------client end---------------------------')
    console.log('\n\n\n')
}
main();