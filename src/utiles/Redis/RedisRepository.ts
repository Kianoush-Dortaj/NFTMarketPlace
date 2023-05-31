import redis from "redis";
import OperationResult from "../../core/Operation/OperationResult";
import { WinstonLogger } from "../logger/winston/WinstonLogger";


export class RedisManager {

  static client: any;

  /*******
   * Set Value on Redis
   *  ******/
  static async Set(key: string, value: any): Promise<OperationResult<boolean>> {
    try {
      this.client.set(key, JSON.stringify(value));
      return OperationResult.BuildSuccessResult('Operation Success', true);
    }
    catch (err: any) {
      return OperationResult.BuildFailur(err.message);
    }
  }


  static async SetValueWithexiperationTime(key: string, value: any, time: number): Promise<OperationResult<boolean>> {
    try {
      this.client.setex(key, time, JSON.stringify(value));
      return OperationResult.BuildSuccessResult('Operation Success', true);
    }
    catch (err: any) {
      return OperationResult.BuildFailur(err.message);
    }
  }


  /*******
   * Get Value in Redis
   *  ******/
  static async Get<TValue>(key: string): Promise<OperationResult<TValue>> {
    try {
      return new Promise((resolve, reject) => {
        this.client.get(key, async (err: any, data: any) => {
          if (err) reject(OperationResult.BuildFailur(err.message));
          resolve(OperationResult.BuildSuccessResult('Operation Success', JSON.parse(data)));
        });
      });
    } catch (error: any) {
      return OperationResult.BuildFailur(error.message);
    }
  }

  /*******
     * Remove Value on Redis
     *  ******/
  static async Remove(key: string): Promise<OperationResult<boolean>> {
    try {
      this.client.del(key);
      return OperationResult.BuildSuccessResult('success Operation', true);
    } catch (error: any) {
      return OperationResult.BuildFailur(error.message);
    }
  }

  static async ResetSingleItem<T>(key: string, value: T): Promise<OperationResult<boolean>> {
    try {

      await this.client.del(key);
      await this.Set(key, value);

      return OperationResult.BuildSuccessResult('success Operation', true);

    } catch (error: any) {
      return OperationResult.BuildFailur(error.message);

    }

  }

  static Connet() {

    this.client = redis.createClient({
      host: 'luca.iran.liara.ir',
      port: 34670,
      password: 'gjMSEMgcXKlkQhk5JBLq51tJ'
    });


    this.client.on("connect", function () {
      console.log('connect redis')
      WinstonLogger.logger.info("Connect to Redis")
    });

    this.client.on("error", function () {
      console.log('error redis')

      WinstonLogger.logger.error("Error Connect ot Redis")
    });

  }

}

export default RedisManager;
