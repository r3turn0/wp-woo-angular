// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// For wamp server
export const environment = {
  production: false,
  wpBase: '//localhost/woo-angular/wp-json/wp/v2/',
  host: '//localhost/woo-angular',
  origin: '//localhost/woo-angular/wp-json/wc/v2',
  woocommerce: {
    consumer_key:  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    consumer_secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
  }
};
