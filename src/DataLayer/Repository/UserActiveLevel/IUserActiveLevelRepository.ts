import OperationResult from "../../../core/Operation/OperationResult";
import { UserActiveLevelDto } from "../../../DTO/UserActiveLevel/UserActiveLevelDto";
import { IUserActiveLevelDoc } from "../../Context/UserActiveLevel/IUserActiveLevelDock";

export interface IUserActiveLevelRepository {
    SetUserActiveLevel(item: UserActiveLevelDto): Promise<OperationResult<IUserActiveLevelDoc>>;
    UpdateUserActiveLevel(item: UserActiveLevelDto): Promise<OperationResult<boolean>>;
    findUserLevelNameByUserId(userId: string): Promise<OperationResult<string>>;
    findUserLevelIdByUserId(userId: string): Promise<OperationResult<string>>;
}