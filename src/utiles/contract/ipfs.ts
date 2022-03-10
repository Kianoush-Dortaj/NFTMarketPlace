import { create } from 'ipfs-http-client'
import { InternalServerError } from '../../core/ErrorHandler/DatabaseConectionError';
import OperationResult from '../../core/Operation/OperationResult';

const client = create({
    url: 'https://ipfs.infura.io:5001'
});

export class IPFS {


    static async UploadFile(file: any): Promise<OperationResult<string>> {
        try {

            const added = await client.add(file, {
                progress: (prop) => console.log(`recived : ${prop}`)
            })

            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
            return OperationResult.BuildSuccessResult("", url)

        } catch (error: any) {
            throw new InternalServerError(error.message);
        }
    }

}