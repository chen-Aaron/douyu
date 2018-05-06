class Times{
    constructor(){
        this._Date = new Date();
        this.getYear();
        this.getMonth();
        this.getDay();
    }

    initializes(){
        return `${this._year}-${this._Month}-${this._Day}`;
    }

    getDetail(){
        this.getHours();
        this.getMinutes();
        this.getSecond();

        return `${this._Hours}:${this._Minutes}:${this._Second}`;
    }

    getYear(){
        this._year = this._Date.getFullYear();
    }

    getMonth(){
        let month = this._Date.getMonth();

        this._Month = month < 10 ? '0' + month : month;
    }

    getDay(){
        let day = this._Date.getDate();

        this._Day = day < 10 ? '0' + day : day;
    }

    getHours(){
        this._Hours = this._Date.getHours();
    }

    getMinutes(){
        this._Minutes = this._Date.getMinutes();
    }

    getSecond(){
        this._Second = this._Date.getSeconds();
    }

}

module.exports = Times;