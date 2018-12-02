export class CheckoutForm {
    constructor(
        public coupon: string,
        public orderNote: string,
        public agreedTerms: boolean
    ){ }
}