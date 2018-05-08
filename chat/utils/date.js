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
        let hours = this._Date.getHours() + 1;

        this._Hours = hours < 10 ? '0' + hours : hours;
    }

    getMinutes(){
        let minutes = this._Date.getMinutes();

        this._Minutes = minutes < 10 ? '0' + minutes : minutes;
    }

    getSecond(){
        let second = this._Date.getSeconds();

        this._Second = second < 10 ? '0' + second : second;
    }

}

module.exports = Times;