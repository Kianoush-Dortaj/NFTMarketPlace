import { Locales, TranslationFunctions } from './../../i18n/i18n-types'
import { detectLocale } from './../../i18n/i18n-util'
import { loadAllLocales } from './../../i18n/i18n-util.sync'
import { initAcceptLanguageHeaderDetector, initRequestParametersDetector } from 'typesafe-i18n/detectors'
import { i18n } from './../../i18n/i18n-util';

export class Translate {

   static translate = i18n();

    static InitialConfig(): void {

        loadAllLocales();
    }

    getPreferredLocale(req: any): Locales {

        const requestParametersDetector = initRequestParametersDetector(req, 'locale')
        const acceptLanguageDetector = initAcceptLanguageHeaderDetector(req)

        return detectLocale(requestParametersDetector, acceptLanguageDetector)
    }

}
