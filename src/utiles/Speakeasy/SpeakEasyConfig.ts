import speakEasy from 'speakeasy';


export class SpeakEeasy {


   static generate(): any {
        return speakEasy.generateSecret();
    }

}