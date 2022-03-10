"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const Locals_1 = require("../utiles/locals/Locals");
describe("Locals Translate", () => {
    it("Get Translte", () => {
        const translateMessage = Locals_1.Translate.translate.en.BY({ name: 'Kianoush' });
        assert_1.default.equal(translateMessage, 'By Kianoush');
    });
});
