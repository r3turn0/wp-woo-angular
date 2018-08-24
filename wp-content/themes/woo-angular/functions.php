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
	add_theme_support( 'post-thumbnails' );
	set_post_thumbnail_size( 840, 0 );
	add_image_size( 'landscape', 560, 420, true );
	add_image_size( 'portrait', 480, 640, true );
	add_image_size( 'square', 480, 480, true );
	/*global $content_width;
	if ( ! isset( $content_width ) ) $content_width = 640;
		register_nav_menus(
		array( 'main_menu' => __( 'Main Menu', 'SITENAME navigation' ) )
	);*/
}

/*add_action( 'widgets_init', 'SITENAME_widgets_init' );
function SITENAME_widgets_init() {
	register_sidebar( array (
		'name' => __( 'Sidebar Widget', 'SITENAME' ),
		'id' => 'sidebar-widget',
		'before_widget' => '<div class="widget-container">',
		'after_widget' => '</div>',
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
	) );
}*/

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
	$settings = array(
		'title' => $title,
		'description' => $description,
		'headerImage' => $headerImg,
		'logo' => $logo,
		'versions' => $theme->get('Version')
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