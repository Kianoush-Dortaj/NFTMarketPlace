import { ICloud } from './ICloud';
import { IDatabase } from './IDatabase';
import { IRegular } from './IReular';
import MongooDbCloud from './MongooDBCloud';
import MongooDbRegular from './MongooDbRegular';

export default class MongoDB implements IDatabase {

    RegularConnect(): IRegular {
        return new MongooDbRegular();
    }

    CloudConnect(): ICloud {
        return new MongooDbCloud();
    }

}