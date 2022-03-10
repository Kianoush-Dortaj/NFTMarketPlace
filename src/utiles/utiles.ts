import { Request } from "express";
import { Translate } from "./locals/Locals";
import { locales } from './../i18n/i18n-util';
import { Locales } from "../i18n/i18n-types";
import OperationResult from "../core/Operation/OperationResult";
import RedisRepository from "./Redis/RedisRepository";
import { GenerateHashcodeResult } from "../DTO/Utiles/GetrateHashcodeResult";
import uniqueString from 'unique-string';

export class Utiles {



    static acceptLanguage(req: any): Locales {
        const lang = req.headers["accept-language"] ? req.headers["accept-language"] : 'en';
        const local = locales.find(x => x == lang);
        if (!local) {
            return locales[0];
        }
        return local;

    }

    static getDirectoryImage(dir: string) {
        return dir.substring(10);
    }

    static async getRandomInt(min: number, max: number): Promise<number> {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    static async percentage(partialValue: number, totalValue: number | string): Promise<number> {
        return (partialValue / 100) * Number(totalValue);
    }

    static genRanHex(size: number): string {
        return [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

    }

    // static convertEnumToArray(value: any): GetAllUserActivityModel[] {

    //     const map: GetAllUserActivityModel[] = [];

    //     for (let key in value) {
    //         //TypeScript does not allow enum keys to be numeric
    //         if (!isNaN(Number(key))) continue;

    //         const val = value[key] as string | number;

    //         //TypeScript does not allow enum value to be null or undefined
    //         if (val !== undefined && val !== null)
    //             map.push({
    //                 key: val,
    //                 value: key
    //             });
    //     }

    //     return map;
    // }

    // static async getAcceptLang(req: any): Promise<string> {

    //     let lang = null;

    //     if (req.headers['accept-language']) {
    //         lang = req.headers['accept-language'];
    //     } else {

    //         const defaultItem = await UnitOfWork.LanguageRepository.
    //             GetDefulatLanguage();

    //         if (defaultItem.success) {

    //             lang = defaultItem.success ?
    //                 defaultItem.result ?
    //                     defaultItem.result?.uniqueSeoCode : 'en' : 'en';
    //         } else {
    //             lang = null;
    //         }
    //     }
    //     return lang;
    // }

    static async GerateHashCode(redisKey: any): Promise<OperationResult<GenerateHashcodeResult>> {
        try {

            let hash = uniqueString();
            let code = await this.getRandomInt(1111111, 999999);

            const setValue = await RedisRepository.SetValueWithexiperationTime(redisKey, {
                code: code,
                hash: hash
            }, 120)

            if (setValue.success) {
                return OperationResult.BuildSuccessResult("Success", {
                    code: code,
                    hash: hash
                })
            }
            
            return OperationResult.BuildFailur(setValue.message);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }
    }

    static async CheckHashCode(redisKey: any, code: string, hash: string): Promise<OperationResult<boolean>> {

        try {

            let findKeyInRedis = await RedisRepository.Get<any>(redisKey);

            if (!findKeyInRedis.success) {

                return OperationResult.BuildFailur(findKeyInRedis.message);

            }
            else if (!findKeyInRedis.result) {

                return OperationResult.BuildSuccessResult(findKeyInRedis.message, true);
            }
            else if (findKeyInRedis.result.code != code || findKeyInRedis.result.hash != hash) {

                return OperationResult.BuildFailur('Your code is Expire . please Type again');

            }

            return OperationResult.BuildSuccessResult(findKeyInRedis.message, true);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }



    }

}

