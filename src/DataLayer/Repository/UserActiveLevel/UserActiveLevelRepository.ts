import OperationResult from "../../../core/Operation/OperationResult";
import { UserActiveLevelDto } from "../../../DTO/UserActiveLevel/UserActiveLevelDto";
import { IUserActiveLevelDoc } from "../../Context/UserActiveLevel/IUserActiveLevelDock";
import { UserActiveLevelEntitie } from "../../Context/UserActiveLevel/UserActiveLevel";
import { IUserActiveLevelRepository } from "./IUserActiveLevelRepository";

export default class  UserActiveLevelRepository implements IUserActiveLevelRepository {


    /*******
    * Set User Role For User
    ******/
    async SetUserActiveLevel(item: UserActiveLevelDto): Promise<OperationResult<IUserActiveLevelDoc>> {
        try {
            let userRole = await UserActiveLevelEntitie
                .build({ userLevel: item.level, userId: item.userId })

            await userRole.save();

            return OperationResult.BuildSuccessResult('Operation Success', userRole);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }

    }

    /*******
    * Update User Role For User
    ******/

    async UpdateUserActiveLevel(item: UserActiveLevelDto): Promise<OperationResult<boolean>> {

        try {

            const findItem = await UserActiveLevelEntitie.updateOne(
                {
                    userId: item.userId,
                }, {
                $set: {
                    userLevel: item.level
                }
            });

            if (findItem) {
                return OperationResult.BuildSuccessResult('Operation Success', true);
            }

            return OperationResult.BuildFailur('we can not find user level');

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }

    }


    /*******
    * Find Roles By UserId
    ******/

    async findUserLevelNameByUserId(userId: string): Promise<OperationResult<string>> {

        try {

            const findItem = await UserActiveLevelEntitie.findOne({ userId: userId })
                .populate("userLevel");

            if (findItem) {
                return OperationResult.BuildSuccessResult('Operation Success', findItem.userLevel.name);
            }

            return OperationResult.BuildFailur("Can not find User");

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }

    }

    /*******
    * Find Roles By UserId
    ******/

    async findUserLevelIdByUserId(userId: string): Promise<OperationResult<string>> {

        try {

            const findItem = await UserActiveLevelEntitie.findOne({ userId: userId })
                .populate("userLevel");

            if (findItem) {
                return OperationResult.BuildSuccessResult('Operation Success', findItem.userLevel.id);
            }

            return OperationResult.BuildFailur("Can not find User");

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }

    }


}