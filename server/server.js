var grpc = require('@grpc/grpc-js');

var greets = require('./proto/greet_pb');
var service = require('./proto/greet_grpc_pb');

function greet(call, callback){
    var greeting = new greets.GreetResponse();

    greeting.setResult(
        'Hello, ' + call.request.getGreeting().getFirstName()
    );

    callback(null, greeting);
}

function main(){
    var server = new grpc.Server();

    server.addService(service.GreetServiceService, {greet: greet});

    server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), ()=>{
        server.start();
        console.log('✅ Server started:  127.0.0.1:50051');
    });

    
}
main();