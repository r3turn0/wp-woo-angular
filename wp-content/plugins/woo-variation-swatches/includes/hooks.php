<?php
	defined( 'ABSPATH' ) or die( 'Keep Quit' );
	
	add_action( 'wp_ajax_gwp_live_feed_close', function () {
		$id = absint( $_POST[ 'id' ] );
		set_transient( "gwp_live_feed_seen_{$id}", TRUE, 1 * WEEK_IN_SECONDS );
	} );
	
	add_action( 'wp_ajax_nopriv_wvs_get_available_variations', 'wvs_get_available_product_variations' );
	
	add_action( 'wp_ajax_wvs_get_available_variations', 'wvs_get_available_product_variations' );
	
	add_filter( 'product_attributes_type_selector', 'wvs_product_attributes_types' );
	
	add_action( 'init', 'wvs_settings', 2 );
	
	add_action( 'admin_init', 'wvs_add_product_taxonomy_meta' );
	
	add_action( 'woocommerce_product_option_terms', 'wvs_product_option_terms', 10, 2 );
	
	add_filter( 'woocommerce_ajax_variation_threshold', 'wvs_ajax_variation_threshold', 8 );
	
	add_filter( 'woocommerce_dropdown_variation_attribute_options_html', 'wvs_variation_attribute_options_html', 200, 2 );
	
	if ( ! class_exists( 'Woo_Variation_Swatches_Pro' ) ) {
		add_filter( 'woocommerce_product_data_tabs', 'add_wvs_pro_preview_tab' );
		
		add_filter( 'woocommerce_product_data_panels', 'add_wvs_pro_preview_tab_panel' );
	}
	
