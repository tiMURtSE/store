import { makeAutoObservable } from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = [];
        this._brands = [];
        this._devices = [];
        this._selectedType = {};
        this._selectedBrand = {};
        this._selectedPage = 1;
        this._totalNumberOfDevices = 0;
        this._limit = 3;
        this._userBasket = [];
        makeAutoObservable(this);
    }

    setTypes(types) {
        this._types = types;
    }

    setBrands(brands) {
        this._brands = brands;
    }

    setDevices(devices) {
        this._devices = devices;
    }

    setSelectedType(type) {
        this.setSelectedPage(1);
        this._selectedType = type;
    }

    setSelectedBrand(brand) {
        this.setSelectedPage(1);
        this._selectedBrand = brand;
    }

    setSelectedPage(page) {
        this._selectedPage = page;
    }

    setTotalNumberOfDevices(number) {
        this._totalNumberOfDevices = number;
    }

    setLimit(limit) {
        this._limit = limit;
    }

    setUserBasket(devices) {
        this._userBasket = devices;
    }

    get types() {
        return this._types;
    }

    get brands() {
        return this._brands;
    }

    get devices() {
        return this._devices;
    }

    get selectedType() {
        return this._selectedType;
    }

    get selectedBrand() {
        return this._selectedBrand;
    }

    get selectedPage() {
        return this._selectedPage;
    }

    get totalNumberOfDevices() {
        return this._totalNumberOfDevices;
    }

    get limit() {
        return this._limit;
    }    

    get userBasket() {
        return this._userBasket;
    }
}