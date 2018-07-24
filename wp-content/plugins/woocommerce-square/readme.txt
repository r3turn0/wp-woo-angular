=== WooCommerce Square ===
Contributors: automattic, royho, woothemes
Tags: credit card, square, woocommerce, inventory sync
Requires at least: 4.4
Tested up to: 4.9
Requires PHP: 5.6
Stable tag: 1.0.27
License: GPLv3
License URI: https://www.gnu.org/licenses/gpl-3.0.html

Adds ability to sync inventory between WooCommerce and Square POS. In addition, you can also make purchases through the Square payment gateway.

== Description ==

Adds ability to sync inventory between WooCommerce and Square POS. In addition, you can also make purchases through the Square payment gateway.

= Take Credit card payments easily and directly on your store =

The Square plugin extends WooCommerce allowing you to take payments directly on your store via Square’s API.

== Installation ==

You can download an [older version of this gateway for older versions of WooCommerce from here](https://wordpress.org/plugins/woocommerce-square/developers/).

= Automatic installation =

Automatic installation is the easiest option as WordPress handles the file transfers itself and you don’t need to leave your web browser. To
do an automatic install of, log in to your WordPress dashboard, navigate to the Plugins menu and click Add New.

In the search field type “WooCommerce Square” and click Search Plugins. Once you’ve found our plugin you can view details about it such as the point release, rating and description. Most importantly of course, you can install it by simply clicking "Install Now".

= Manual installation =

The manual installation method involves downloading our plugin and uploading it to your web server via your favorite FTP application. The WordPress codex contains [instructions on how to do this here](http://codex.wordpress.org/Managing_Plugins#Manual_Plugin_Installation).

= Updating =

Automatic updates should work like a charm; as always though, ensure you backup your site just in case.

== Frequently Asked Questions ==

= Does this require an SSL certificate? =

Yes! SSL certificate must be installed on your site to use Square.

= Where can I find documentation? =

For help setting up and configuring, please refer to our [user guide](https://docs.woocommerce.com/document/woocommerce-square/)

= Where can I get support or talk to other users? =

If you get stuck, you can ask for help in the Plugin Forum.

== Screenshots ==

1. The settings panel.

== Changelog ==

= 1.0.27 - 2018-02-19 =
* Fix - In some cases request timeouts are not set long enough causing timeout errors.
* Fix - Square to WC sync sets products with 0 quantity to In Stock.
* Fix - Potential issue with Square to WC sync when response is not an array.
* Fix - When description is more than 4095 characters, sync fails to Square.
* Fix - Add checks to product object before scheduling an event to prevent errors in cron job.
* Fix - Add check to prevent auto inventory poll from running when a manual sync is in progress.

== Upgrade Notice ==

= 1.0.25 =
* Public Release!
