class Store {
    _store: { [k: string]: any }

    get(k: string): any {
        return this._store[k];
    }

    set(k: string, v: any): void {
        this._store[k] = v;
    }
}

export const cache = new Store();
