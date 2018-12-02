<?php 
// Start functions.php

/* -------------- ENABLE CORS -------------- */
add_action( 'init', 'nt_cors_enable' );
function nt_cors_enable() {
  header("Access-Control-Allow-Origin: " . get_http_origin());
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
  header("Access-Control-Allow-Credentials: true");
  header("Access-Control-Allow-Headers: Authorization, Content-Type");
  header("Access-Control-Expose-Headers: x-wc-totalpages, x-wc-total", false);
  if ( 'OPTIONS' == $_SERVER['REQUEST_METHOD'] ) {
    status_header(200);
    exit();
  }
}

/* -------------- THEME SETUP -------------- */
add_action( 'after_setup_theme', 'SITENAME_setup' );
function SITENAME_setup() {
	load_theme_textdomain( 'SITENAME', get_template_directory() . '/languages' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	set_post_thumbnail_size( 840, 0 );
	add_image_size( 'landscape', 560, 420, true );
	add_image_size( 'portrait', 480, 640, true );
	add_image_size( 'square', 480, 480, true );
	register_nav_menus(
		array( 'Main Menu' => __( 'Main Menu', 'SITENAME Navigation' ) )
	);
}

add_filter( 'the_title', 'SITENAME_title' );
function SITENAME_title( $title ) {
	if ( $title == '' ) {
		return '&rarr;';
	} else {
		return $title;
	}
}

add_filter( 'wp_title', 'SITENAME_filter_wp_title' );
function SITENAME_filter_wp_title( $title ) {
	return $title . esc_attr( get_bloginfo( 'name' ) );
}

// Add filter for title separator
function change_title_separator(){
	return ' | ';
}
add_filter('document_title_separator', 'change_title_separator');

/* ------------- SHOW ALL CATEGORIES ------------ */
add_filter( 'widget_categories_args', 'wpb_force_empty_cats' );
function wpb_force_empty_cats($cat_args) {
    $cat_args['hide_empty'] = 0;
    return $cat_args;
}

/* ------------ HEADER IMAGE ------------ */
function header_img_setup() {
	$defaults = array(
		'height' => 'auto',
        'width'  => 'auto',
		'flex-width'    => true,
		'flex-height'   => true,
	);
	add_theme_support( 'custom-header', $defaults );
}
add_action( 'after_setup_theme', 'header_img_setup' );

/* ------------ LOGO ------------ */
function logo_setup() {
    $defaults = array(
        'height'      => 'auto',
        'width'       => 'auto',
        'flex-height' => true,
        'flex-width'  => true,
        'header-text' => array( 'site-title', 'site-description' ),
    );
    add_theme_support( 'custom-logo', $defaults );
}
add_action( 'after_setup_theme', 'logo_setup' );

function getCustomLogo(){
	$custom_logo_id = get_theme_mod( 'custom_logo' );
	$image = wp_get_attachment_image_src( $custom_logo_id , 'full' );
	return $image[0];
}

// GET IMAGES
function get_thumbnail_url($post){
    if(has_post_thumbnail($post['id'])){
        $imgArray = wp_get_attachment_image_src( get_post_thumbnail_id( $post['id'] ), 'full' ); // replace 'full' with 'thumbnail' to get a thumbnail
        $imgURL = $imgArray[0];
        return $imgURL;
    } else {
        return false;
    }
}

function add_site_settings() {
	$title = esc_attr( get_bloginfo( 'name' ) );
	$description = esc_attr( get_bloginfo( 'description' ) );
	$headerImg = get_header_image();
	$logo = getCustomLogo();
	$theme = wp_get_theme();
	$version = $theme->get('Version');
	$frontPageID = (int)get_option( 'page_on_front' );
	$frontPage = get_post($frontPageID, ARRAY_A);
	$frontPageSlug = $frontPage['post_name'];
	$shopPageID = (int)get_option( 'woocommerce_shop_page_id' ); 
	$shopPage = get_post($shopPageID, ARRAY_A);
	$shopPageSlug = $shopPage['post_name'];
	$myAccountPageID = (int)get_option( 'woocommerce_myaccount_page_id' ); 
	$myAccountPage = get_post($myAccountPageID, ARRAY_A);
	$myAccountPageSlug = $myAccountPage['post_name'];
	$checkoutPageID = (int)get_option( 'woocommerce_checkout_page_id' ); 
	$checkoutPage = get_post($checkoutPageID, ARRAY_A);
	$checkoutPageSlug = $checkoutPage['post_name'];
	$termsPageID = (int)get_option( 'woocommerce_terms_page_id' ); 
	$termsPage = get_post($termsPageID, ARRAY_A);
	$termsPageSlug = $termsPage['post_name'];
	$email1 = '';
	$email2 = '';
	$fbLink = '';
	$igLink = '';
	$twLink = '';
	$ytLink = '';
	$mailchimpEndpoint = '';
	$mailchimpHiddenField = '';
	$paypalLiveAPI = '';
	$paypalProdClientId = '';
	$paypalSandboxClientId = '';
	if($social['email1']){
		$email1 = stripslashes($social['email1']);
	}
	if($social['email2']){
		$email2 = stripslashes($social['email2']);
	}
	if($social['facebook_link'] && $social['facebook_show'] == 1){
		$fbLink = stripslashes($social['facebook_link']);
	}
	if($social['instagram_link'] && $social['instagram_show'] == 1){
		$igLink = stripslashes($social['instagram_link']);
	}
	if($social['twitter_link'] && $social['twitter_show'] == 1){
		$twLink = stripslashes($social['twitter_link']);
	}
	if($social['youtube_link'] && $social['youtube_show'] == 1){
		$ytLink = stripslashes($social['youtube_link']);
	}
	if($social['mailchimp-endpoint']){
		$mailchimpEndpoint = stripslashes($social['mailchimp-endpoint']);
	}
	if($social['mailchimp-hidden-field']){
		$mailchimpHiddenField = stripslashes($social['mailchimp-hidden-field']);
	}
	if($social['paypal_live_api']){
		$paypalLiveAPI = $social['paypal_live_api'];
	}
	if($social['paypal-prod-clientid']){
		$paypalProdClientId = stripslashes($social['paypal-prod-clientid']);
	}
	if($social['paypal-sandbox-clientid']){
		$paypalSandboxClientId = stripslashes($social['paypal-sandbox-clientid']);
	}
	$settings = array(
		'title' => $title,
		'description' => $description,
		'headerImage' => $headerImg,
		'logo' => $logo,
		'version' => $version,
		'frontPageID' => $frontPageID,
		'frontPageSlug' => $frontPageSlug,
		'shopPageID' => $shopPageID,
		'shopPageSlug' => $shopPageSlug,
		'myAccountPageSlug' => $myAccountPageSlug,
		'myAccountPageID' => $myAccountPageID,
		'checkoutPageSlug' => $checkoutPageSlug,
		'checkoutPageID' => $checkoutPageID,
		'termsPageID' => $termsPageID,
		'termsPageSlug' => $termsPageSlug,
		'infoEmail' => $email1,
		'salesEmail' => $email2,
		'facebook' => $fbLink ? $fbLink : '',
		'instagram' => $igLink ? $igLink : '',
		'twitter' => $twLink ? $twLink : '',
		'youtube' => $ytLink ? $ytLink : '',
		'mailchimpEndpoint' => $mailchimpEndpoint ? $mailchimpEndpoint : '',
		'mailchimpHiddenField' => $mailchimpHiddenField ? $mailchimpHiddenField : '',
		'paypalLiveAPI' => $paypalLiveAPI,
		'paypalProdClientId' => $paypalProdClientId ? $paypalProdClientId : '',
		'paypalSandboxClientId' => $paypalSandboxClientId ? $paypalSandboxClientId : '',
		'baseCountry' => get_base_country()
	);
	return $settings;
}

function insert_post_thumbnail_url(){
	register_rest_field( 'post',
		'featured_image',  //key-name in json response
		array(
		'get_callback'    => 'get_thumbnail_url',
		'update_callback' => null,
		'schema'          => null,
		)
	);
}

function insert_page_thumbnail_url(){
	register_rest_field( 'page',
		'featured_image',  //key-name in json response
		array(
		'get_callback'    => 'get_thumbnail_url',
		'update_callback' => null,
		'schema'          => null,
		)
	);
}

function get_base_country() {
	global $woocommerce;
	$countries_obj = new WC_Countries();
	$countries   = $countries_obj->__get('countries');
	$def_country = $countries_obj->get_base_country();
	return $def_country;
}

// register actions for WP REST API
add_action( 'rest_api_init', 'insert_post_thumbnail_url' );
add_action( 'rest_api_init', 'insert_page_thumbnail_url' );
add_action( 'rest_api_init', function () {
	register_rest_route( 'wp/v2', '/site-settings', array(
		'methods' => 'GET',
		'callback' => 'add_site_settings',
	) );
} );

// End functions.php 
?>