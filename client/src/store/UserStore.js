import { makeAutoObservable } from 'mobx';

export default class UserStore {
    constructor() {
        this._isUserAuthorized = false;
        this._user = {};
        makeAutoObservable(this);
    }

    setIsUserAuthorized(value) {
        this._isUserAuthorized = value;
    }

    setUser(user) {
        this._user = user;
    }

    get isUserAuthorized() {
        return this._isUserAuthorized;
    }
    get user() {
        return this._user;
    }
}