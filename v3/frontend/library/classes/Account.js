export default class Account {
    constructor(firstName, lastName, id, email, password, profiles, age, birthday, gender) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.profiles = profiles;
        this.age = age;
        this.birthday = birthday;
        this.gender = gender;
    }
    
    returnFirstName() {
        return this.firstName;
    }
    returnLastName() {
        return this.lastName;
    }
    returnEmail() {
        return this.email;
    }
    returnBirthday() {
        return this.birthday;
    }
    returnGender() {
        return this.gender;
    }
    returnAge() {
        return this.age;
    }
    returnPassword() {
        return this.password;
    }
    returnProfiles() {
        return this.profiles;
    }
}
