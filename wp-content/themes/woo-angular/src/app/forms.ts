export class UserCredentialsForm {
    constructor(
        public email: string,
        public password1: string,
        public password2: string
    ){ }
}
export class WcCustomerAccountDetailsForm {
    constructor (
        public first_name: string,
        public last_name: string,
        public email: string,
        public currentPassword: string,
        public newPassword1: string,
        public newPassword2: string
    ){}
}
export class WcCustomerAccountAddressesForm {
    constructor (
        public first_name: string,
        public last_name: string,
        public company: string,
        public address_1: string,
        public address_2: string,
        public city: string,
        public state: string,
        public postcode: string,
        public country: string,
        public email: string,
        public phone: string
    ){}
}
export class CheckoutForm {
    constructor(
        public coupon: string,
        public orderNote: string,
        public agreedTerms: boolean
    ){ }
}