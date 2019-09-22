class Weapon {
    protected lastFired: number = 0;

    constructor(protected _damage: number,
                protected _accuracy: number,
                protected _range: number,
                protected _cooldown: number) {

    }

    public canFire(): boolean {
        return (Date.now() - this.lastFired) > this.cooldown;
    }

    public fire(): void {
        this.lastFired = Date.now();
    }

    get cooldown(): number {
        return this._cooldown;
    }

    set cooldown(value: number) {
        this._cooldown = value;
    }

    get damage(): number {
        return this._damage;
    }

    set damage(value: number) {
        this._damage = value;
    }

    get accuracy(): number {
        return this._accuracy;
    }

    set accuracy(value: number) {
        this._accuracy = value;
    }

    get range(): number {
        return this._range;
    }

    set range(value: number) {
        this._range = value;
    }
}

export {Weapon};
