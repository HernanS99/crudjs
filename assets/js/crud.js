class Usuario {
    constructor (name,age,mail){
        this.name = name;
        this.age = age;
        this.mail = mail;
    }
    get parameters () {
        return `${this.name} ${this.age} ${this.mail}`;
    }
    set parameters (parameters){
        for (let parameter in parameters)
        {
            this[parameter] = parameters[parameter]
        }
    }
    
}