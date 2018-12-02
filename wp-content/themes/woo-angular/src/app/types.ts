export class Settings {
    title: string;
    description: string;
    headerImage: string;
    logo: string;
    version: string;
    frontPageSlug: string;
    frontPageID: number;
    shopPageSlug: string;
    shopPageID: number;
    myAccountPageSlug: string;
    myAccountPageID: number;
    checkoutPageSlug: string;
    checkoutPageID: number;
    termsPageID: number;
    termsPageSlug:string;
    infoEmail: string;
    salesEmail: string;
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
    mailchimpEndpoint: string;
    mailchimpHiddenField: string;
    paypalLiveAPI: number;
    paypalProdClientId: string;
    paypalSandboxClientId: string;
    baseCountry: string; // 2 Digit Code
}

// WORDPRESS TYPES
export class WpPage {
    id: number;
    slug: string;
    link: string;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    excerpt: {
        rendered: string;
    };
    status: string;
    menu_order: number;
    parent: number;
    featured_image: string;
}
export class WpMenus {
    term_id: number;
    name: string;
    slug: string;
}
export class WpMenu {
    ID: number;
    name: string;
    slug: string;
    items: [
        {
            id: number;
            order: number;
            parent: number;
            title: string;
            url: string;
            children: [
                {
                    id: number;
                    order: number;
                    parent: number;
                    title: string;
                    url: string;
                }
            ]
        }
    ];
    display: string;
}
export class WpPost {
    id: number;
    slug: string;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    excerpt: {
        rendered: string;
    };
    status: string;
    categories: number [];
    tags: string [];
    featured_image: string;
}
export class WpCategory { // Post Categories
    id: number;
    description: string;
    link: string;
    name: string;
    slug: string;
}
export class WpMedia {
    id: number;
    slug: string;
    title: {
        rendered: string;
    };
    caption: {
        rendered: string;
    };
    alt_text: string;
    media_details: {
        height: number;
        width: number;
        sizes: {
            thumbnail: {
                source_url: string;
            };
            medium: {
                source_url: string;
            };
            large: {
                source_url: string;
            };
            full: {
                source_url: string;
            };
            landscape: {
                source_url: string;
            };
            portrait: {
                source_url: string;
            };
            square: {
                source_url: string;
            };
        }
    }
    source_url: string;
}
// WOOCOMMERCE TYPES
export class WcCustomer {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    username: string;
    billing: {
        first_name: string;
        last_name: string;
        company: string;
        address_1: string;
        address_2: string;
        city: string;
        state: string;
        postcode: string;
        country: string;
        email: string;
        phone: string;
    };
    shipping: {
        first_name: string;
        last_name: string;
        company: string;
        address_1: string;
        address_2: string;
        city: string;
        state: string;
        postcode: string;
        country: string;
    };
}
export class WpUser {
    avatar: string;
    description: string;
    displayname: string;
    email: string;
    firstname: string;
    id: number
    lastname: string;
    url: string;
    username: string;
}
export class UserCredentials {
    constructor(
        public email: string,
        public password1: string,
        public password2: string
    ){ }
}
export class WcCustomerAccountDetails {
    constructor (
        public first_name: string,
        public last_name: string,
        public email: string,
        public currentPassword: string,
        public newPassword1: string,
        public newPassword2: string
    ){}
}
export class WcCustomerAccountAddresses {
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
export class WcCountry {
    code: string;
    name: string;
    states: WcState [];
}
export class WcState {
    code: string;
    name: string;
}
export class WcCart { 
    key:string;
    product_id:number;
    variation_id:number;
    variation:Array<any>;
    quantity:number;
    line_tax_data:{
      subtotal:Array<any>;
      total:Array<any>;
    };
    line_subtotal:number;
    line_subtotal_tax:number;
    line_total:number;
    line_tax:number;
    data: {};
    product_name:string;
}
export class WcPaymentGateway {
    id:string;	
    title:string;	
    enabled:boolean;	
    settings: {
        api_password: {
            value: string;
        }
        api_signature:{
            value: string;
        };
        api_username:{
            value: string;
        };	
        sandbox_api_password: {
            value: string;
        }
        sandbox_api_signature:{
            value: string;
        };
        sandbox_api_username:{
            value: string;
        };
        card_icon: {
            value: string;
        }	
    }	
}
export class WcShippingZones {
    id:number;	
    name:string;
}
export class WcShippingZoneLocations {
    code:string;	
    type:string;
}
export class WcShippingZoneMethods {
    instance_id: number;
    title:string;	
    order:number;	
    enabled:boolean;	
    method_id:string;	
    method_title:string;
    method_description:string;
    settings: {
        cost: {
            value: string;
        }
        min_amount: {
            type: string;
            value: string;
        }
    }
}
export class WcShippingMethods {
    id: string;
    title:string;	
    description:string;	
}
export class WcTaxRates {
    id:number;
    country:string;
    state:string;
    postcode:string;
    city:string;
    rate:string;
    name:string;
    priority:number;
    compound:boolean;
    shipping:boolean;
    order:number;
    'class':string;
}