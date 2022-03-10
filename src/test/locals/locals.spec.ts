import assert from "assert";
import { Translate } from "../../utiles/locals/Locals"

describe("Translate", () => {

    beforeEach(() => {
        Translate.InitialConfig();
    })

    it("Translate With Constant Language", () => {
        const translateMessage = Translate.translate.en.Test({ name: 'Test' });
        assert.equal(translateMessage, 'By Test')
    })

    it("Translate With Dynamic Language", () => {
        const translateMessage = Translate.translate['en'].Test({ name: 'Test' });
        assert.equal(translateMessage, 'By Test')
    })
})