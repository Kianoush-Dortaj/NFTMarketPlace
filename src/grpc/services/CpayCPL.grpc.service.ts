import { credentials, Metadata } from '@grpc/grpc-js';
import { promisify } from 'util';
import { CpayCPLClient, EmptyRequest, GetAllFiatCurrencySelectListReponse, GetfiatCurrencyByIdReponse, GetfiatCurrencyByIdRequest, GetRegisterSettingRequest, GetRegisterSettingResponse } from '../models/CpayCPL';

class CpayCplService {

    private readonly client: CpayCPLClient = new CpayCPLClient('localhost:50055', credentials.createInsecure());

    public async getRegisterSetting(param: GetRegisterSettingRequest, metadata: Metadata = new Metadata()): Promise<GetRegisterSettingResponse> {
        return promisify<GetRegisterSettingRequest, Metadata, GetRegisterSettingResponse>(this.client.getRegisterSetting.bind(this.client))(param, metadata);
    }

    public async getAllFiatCurrencySelectedList(param: EmptyRequest, metadata: Metadata = new Metadata()): Promise<GetAllFiatCurrencySelectListReponse> {
        return promisify<EmptyRequest, Metadata, GetAllFiatCurrencySelectListReponse>(this.client.getAllFiatCurrencySelectList.bind(this.client))(param, metadata);
    }

    public async GetFiatCurrencyById(param: GetfiatCurrencyByIdRequest, metadata: Metadata = new Metadata()): Promise<GetfiatCurrencyByIdReponse> {
        return promisify<GetfiatCurrencyByIdRequest, Metadata, GetfiatCurrencyByIdReponse>(this.client.getfiatCurrencyById.bind(this.client))(param, metadata);
    }


}

export const cplayCplClientService: CpayCplService = new CpayCplService();