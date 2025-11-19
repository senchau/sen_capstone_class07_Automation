export class UserModel {
    constructor(public account: string, public password: string, public email: string, public firstname: string, public lastname: string) {
        this.account = account;
        this.password = password;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    get fullname(): string {
        return `${this.firstname} ${this.lastname}`
    }
}