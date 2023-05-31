import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
import { InternalServerError } from '../../core/ErrorHandler/DatabaseConectionError';
import OperationResult from '../../core/Operation/OperationResult';

// const client = create({
//     url: 'https://ipfs.infura.io:5001/api/v0',
//     headers: {
//         authorization: 'Bearer 81bcc9f320fd4e5e8cd25af3293b5c15'
//     }
// });

const ipfsClient = require('ipfs-http-client');

const projectId = '2QYs5TT5s5EDgEf7hqeEdzJqxHB';   // <---------- your Infura Project ID

const projectSecret = '722ff1d0b753ef0fca8ef156770ab8e6';  // <---------- your Infura Secret
// (for security concerns, consider saving these values in .env files)

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = ipfsClient.create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

// const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

export class IPFS {


    static async UploadFile(file: any): Promise<OperationResult<string>> {
        try {

            const added = await client.add(file, {
                progress: (prop:any) => console.log(`recived : ${prop}`)
            })

            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
            return OperationResult.BuildSuccessResult("", url)

        } catch (error: any) {
            throw new InternalServerError(error.message);
        }
    }

}