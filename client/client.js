var grpc = require('@grpc/grpc-js');

var services = require('../server/proto/hello_grpc_pb');

function main(){
    console.log('✅ client start---------------------------')
    
    var client = new services.HelloServiceClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    );

    console.log('✅ client    ', client)
    

    console.log('✅ client end---------------------------')
}
main();