## Developer Notes - JOHN ERICTA

For local development I used Wamp64 in conjuction with Wordpress, WooCommerce and Angular 5.2.10 (w/ Angular-CLI 1.7.4).

I used Yarn to manage my packages. When you pull the project do a yarn install.

I used a WooCommerce Angular wrapper named ngx-wooapi: https://www.npmjs.com/package/ngx-wooapi but ran into an issue accessing the API while developing locally. I had to set up SSL in my local machine for my Wamp64 Server.

Use the buildProd/buildTest.cmd for deployment. Change the urls accordingly.

Finally adjust appropriately the project name and environments.

Update 12/1/2018 - Added polyfills packages from polyfill.ts and ran yarn upgrade. This gave access to more ngx-wooapi services.