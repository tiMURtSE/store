import { makeAutoObservable } from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = [];
        this._brands = [];
        this._devices = [];
        this._selectedType = {};
        this._selectedBrand = {};
        this._selectedPage = 1;
        this._totalCount = 0;
        this._limit = 3;
        this._devicesInUserBasket = [];
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

    setTotalCount(count) {
        this._totalCount = count;
    }

    setLimit(limit) {
        this._limit = limit;
    }

    setDevicesInUserBasket(devices) {
        this._devicesInUserBasket = devices;
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

    get totalCount() {
        return this._totalCount;
    }

    get limit() {
        return this._limit;
    }    

    get devicesInUserBasket() {
        return this._devicesInUserBasket;
    }
}