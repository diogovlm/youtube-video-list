"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = void 0;
const auth_1 = require("firebase/auth");
const firebaseConfig_1 = require("../config/firebaseConfig");
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCredential = yield (0, auth_1.signInWithEmailAndPassword)(firebaseConfig_1.auth, email, password);
        return userCredential.user.uid;
    }
    catch (error) {
        throw new Error('Error logging in: ' + error.message);
    }
});
exports.loginUser = loginUser;
const logoutUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, auth_1.signOut)(firebaseConfig_1.auth);
        return true;
    }
    catch (error) {
        throw new Error('Error logging out: ' + error.message);
    }
});
exports.logoutUser = logoutUser;
