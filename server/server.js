var grpc = require('@grpc/grpc-js');

function main(){
    var server = new grpc.Server();

    server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), ()=>{
        server.start();
        console.log('✅ Server started:  127.0.0.1:50051');
    });

    
}
main();