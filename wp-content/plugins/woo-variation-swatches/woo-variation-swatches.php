<?php
	/**
	 * Plugin Name: WooCommerce Variation Swatches
	 * Plugin URI: https://wordpress.org/plugins/woo-variation-swatches/
	 * Description: Beautiful colors, images and buttons variation swatches for woocommerce product attributes. Requires WooCommerce 3.2+
	 * Author: Emran Ahmed
	 * Version: 1.0.28
	 * Domain Path: /languages
	 * Requires at least: 4.8
	 * Tested up to: 4.9
	 * WC requires at least: 3.2
	 * WC tested up to: 3.4
	 * Text Domain: woo-variation-swatches
	 * Author URI: https://getwooplugins.com/
	 */
	
	defined( 'ABSPATH' ) or die( 'Keep Silent' );
	
	if ( ! class_exists( 'Woo_Variation_Swatches' ) ):
		
		final class Woo_Variation_Swatches {
			
			protected $_version = '1.0.28';
			
			protected static $_instance = NULL;
			private          $_settings_api;
			
			public static function instance() {
				if ( is_null( self::$_instance ) ) {
					self::$_instance = new self();
				}
				
				return self::$_instance;
			}
			
			public function __construct() {
				$this->constants();
				$this->includes();
				$this->hooks();
				do_action( 'woo_variation_swatches_loaded', $this );
			}
			
			public function constants() {
				$this->define( 'WVS_PLUGIN_URI', plugin_dir_url( __FILE__ ) );
				$this->define( 'WVS_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
				
				$this->define( 'WVS_VERSION', $this->version() );
				
				$this->define( 'WVS_PLUGIN_INCLUDE_PATH', trailingslashit( plugin_dir_path( __FILE__ ) . 'includes' ) );
				$this->define( 'WVS_PLUGIN_TEMPLATES_PATH', trailingslashit( plugin_dir_path( __FILE__ ) . 'templates' ) );
				$this->define( 'WVS_PLUGIN_TEMPLATES_URI', trailingslashit( plugin_dir_url( __FILE__ ) . 'templates' ) );
				
				$this->define( 'WVS_PLUGIN_DIRNAME', dirname( plugin_basename( __FILE__ ) ) );
				$this->define( 'WVS_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );
				$this->define( 'WVS_PLUGIN_FILE', __FILE__ );
				$this->define( 'WVS_IMAGES_URI', trailingslashit( plugin_dir_url( __FILE__ ) . 'images' ) );
				$this->define( 'WVS_ASSETS_URI', trailingslashit( plugin_dir_url( __FILE__ ) . 'assets' ) );
			}
			
			public function includes() {
				if ( $this->is_required_php_version() ) {
					require_once $this->include_path( 'class-wvs-customizer.php' );
					require_once $this->include_path( 'class-wvs-settings-api.php' );
					require_once $this->include_path( 'class-wvs-term-meta.php' );
					require_once $this->include_path( 'functions.php' );
					require_once $this->include_path( 'hooks.php' );
				}
			}
			
			public function define( $name, $value, $case_insensitive = FALSE ) {
				if ( ! defined( $name ) ) {
					define( $name, $value, $case_insensitive );
				}
			}
			
			public function include_path( $file ) {
				$file = ltrim( $file, '/' );
				
				return WVS_PLUGIN_INCLUDE_PATH . $file;
			}
			
			public function hooks() {
				add_action( 'init', array( $this, 'language' ) );
				add_action( 'admin_notices', array( $this, 'php_requirement_notice' ) );
				add_action( 'admin_notices', array( $this, 'wc_requirement_notice' ) );
				add_action( 'admin_notices', array( $this, 'wc_version_requirement_notice' ) );
				add_filter( 'plugin_row_meta', array( $this, 'plugin_row_meta' ), 10, 2 );
				
				if ( $this->is_required_php_version() ) {
					add_action( 'admin_notices', array( $this, 'feed' ) );
					add_action( 'init', array( $this, 'settings_api' ), 5 );
					add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue_scripts' ) );
					add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
					add_filter( 'body_class', array( $this, 'body_class' ) );
					
					add_filter( 'plugin_action_links_' . $this->basename(), array( $this, 'plugin_action_links' ) );
					add_action( 'after_wvs_product_option_terms_button', array( $this, 'add_product_attribute_dialog' ), 10, 2 );
				}
			}
			
			// dialog_title
			public function add_product_attribute_dialog( $tax, $taxonomy ) {
				
				// from /wp-admin/edit-tags.php
				?>
                <div class="wvs-attribute-dialog hidden wvs-attribute-dialog-for-<?php echo esc_attr( $taxonomy ) ?>" style="max-width:500px">
                    <div class="form-field form-required term-name-wrap">
                        <label for="tag-name-for-<?php echo esc_attr( $taxonomy ) ?>"><?php _ex( 'Name', 'term name' ); ?></label>
                        <input name="tag_name" id="tag-name-for-<?php echo esc_attr( $taxonomy ) ?>" type="text" value="" size="40" aria-required="true"/>
                        <p><?php _e( 'The name is how it appears on your site.' ); ?></p>
                    </div>
					<?php
						$fields = wvs_taxonomy_meta_fields( $tax->attribute_type );
						WVS_Term_Meta::generate_form_fields( $fields, FALSE );
					?>
                </div>
				<?php
			}
			
			// Use it under hook. Don't use it on top level file like: hooks.php
			public function is_pro_active() {
				return class_exists( 'Woo_Variation_Swatches_Pro' );
			}
			
			public function feed() {
				
				$api_url = 'https://getwooplugins.com/wp-json/getwooplugins/v1/fetch-feed';
				
				if ( apply_filters( 'stop_gwp_live_feed', FALSE ) ) {
					return;
				}
				
				if ( isset( $_GET[ 'raw_gwp_live_feed' ] ) ) {
					delete_transient( "gwp_live_feed" );
				}
				
				if ( FALSE === ( $body = get_transient( 'gwp_live_feed' ) ) ) {
					$response = wp_remote_get( $api_url, $args = array(
						'sslverify' => FALSE,
						'timeout'   => 60,
						'body'      => array(
							'item' => 'woo-variation-swatches',
						)
					) );
					
					if ( ! is_wp_error( $response ) && wp_remote_retrieve_response_code( $response ) == 200 ) {
						$body = json_decode( wp_remote_retrieve_body( $response ), TRUE );
						set_transient( "gwp_live_feed", $body, 6 * HOUR_IN_SECONDS );
						
						if ( isset( $_GET[ 'raw_gwp_live_feed' ] ) && isset( $body[ 'id' ] ) ) {
							delete_transient( "gwp_live_feed_seen_{$body[ 'id' ]}" );
						}
					}
				}
				
				if ( isset( $body[ 'id' ] ) && FALSE !== get_transient( "gwp_live_feed_seen_{$body[ 'id' ]}" ) ) {
					return;
				}
				
				if ( isset( $body[ 'version' ] ) && ! empty( $body[ 'version' ] ) && $body[ 'version' ] != $this->version() ) {
					return;
				}
				
				if ( isset( $body[ 'skip_pro' ] ) && ! empty( $body[ 'skip_pro' ] ) && $this->is_pro_active() ) {
					return;
				}
				
				if ( isset( $body[ 'only_pro' ] ) && ! empty( $body[ 'only_pro' ] ) && ! $this->is_pro_active() ) {
					return;
				}
				
				if ( isset( $body[ 'theme' ] ) && ! empty( $body[ 'theme' ] ) && $body[ 'theme' ] != $this->get_parent_theme_dir() ) {
					return;
				}
				
				if ( isset( $body[ 'message' ] ) && ! empty( $body[ 'message' ] ) ) {
					$user    = wp_get_current_user();
					$search  = array( '{pro_link}', '{user_login}', '{user_email}', '{user_firstname}', '{user_lastname}', '{display_name}', '{nickname}' );
					$replace = array(
						esc_url( woo_variation_swatches()->get_pro_link( 'product-feed' ) ),
						$user->user_login ? $user->user_login : 'there',
						$user->user_email,
						$user->user_firstname ? $user->user_firstname : 'there',
						$user->user_lastname ? $user->user_lastname : 'there',
						$user->display_name ? $user->display_name : 'there',
						$user->nickname ? $user->nickname : 'there',
					);
					
					$message = str_ireplace( $search, $replace, $body[ 'message' ] );
					
					echo $message;
				}
			}
			
			public function feed_css_uri() {
				
				$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';
				
				$api_url = "https://api.github.com/repos/EmranAhmed/gwp-admin-notice/commits/master";
				
				if ( isset( $_GET[ 'raw_gwp_feed_css' ] ) ) {
					delete_transient( "gwp_feed_css" );
				}
				
				if ( FALSE === ( $sha = get_transient( 'gwp_feed_css' ) ) ) {
					$response = wp_remote_get( $api_url, $args = array(
						'sslverify' => FALSE,
						'timeout'   => 60
					) );
					
					if ( ! is_wp_error( $response ) && wp_remote_retrieve_response_code( $response ) == 200 ) {
						$body = json_decode( wp_remote_retrieve_body( $response ) );
						$sha  = $body->sha;
						set_transient( "gwp_feed_css", $sha, 3 * HOUR_IN_SECONDS );
					}
				}
				
				return sprintf( 'https://cdn.rawgit.com/EmranAhmed/gwp-admin-notice/%s/gwp-admin-notice%s.css', substr( $sha, 0, 8 ), $suffix );
			}
			
			public function body_class( $classes ) {
				array_push( $classes, 'woo-variation-swatches' );
				if ( wp_is_mobile() ) {
					array_push( $classes, 'woo-variation-swatches-on-mobile' );
				}
				array_push( $classes, sprintf( 'woo-variation-swatches-theme-%s', $this->get_parent_theme_dir() ) );
				array_push( $classes, sprintf( 'woo-variation-swatches-theme-child-%s', $this->get_theme_dir() ) );
				array_push( $classes, sprintf( 'woo-variation-swatches-style-%s', $this->get_option( 'style' ) ) );
				array_push( $classes, sprintf( 'woo-variation-swatches-attribute-behavior-%s', $this->get_option( 'attribute-behavior' ) ) );
				array_push( $classes, sprintf( 'woo-variation-swatches-tooltip-%s', $this->get_option( 'tooltip' ) ? 'enabled' : 'disabled' ) );
				array_push( $classes, sprintf( 'woo-variation-swatches-stylesheet-%s', $this->get_option( 'stylesheet' ) ? 'enabled' : 'disabled' ) );
				
				if ( $this->is_pro_active() ) {
					array_push( $classes, 'woo-variation-swatches-pro' );
				}
				
				return $classes;
			}
			
			public function enqueue_scripts() {
				
				$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';
				wp_enqueue_script( 'woo-variation-swatches', $this->assets_uri( "/js/frontend{$suffix}.js" ), array( 'jquery' ), $this->version(), TRUE );
				
				if ( $this->get_option( 'stylesheet' ) ) {
					wp_enqueue_style( 'woo-variation-swatches', $this->assets_uri( "/css/frontend{$suffix}.css" ), array(), $this->version() );
					wp_enqueue_style( 'woo-variation-swatches-theme-override', $this->assets_uri( "/css/wvs-theme-override{$suffix}.css" ), array( 'woo-variation-swatches' ), $this->version() );
				}
				
				if ( $this->get_option( 'tooltip' ) ) {
					wp_enqueue_style( 'woo-variation-swatches-tooltip', $this->assets_uri( "/css/frontend-tooltip{$suffix}.css" ), array(), $this->version() );
				}
				
				$this->add_inline_style();
			}
			
			public function add_inline_style() {
				$width    = $this->get_option( 'width' );
				$height   = $this->get_option( 'height' );
				$fontsize = $this->get_option( 'single-font-size' );
				$css      = sprintf( '
			      .variable-item:not(.radio-variable-item){
			      width: %1$dpx;
			      height: %2$dpx;
			      }
			      .woo-variation-swatches-style-squared .button-variable-item{
			      min-width: %1$dpx;
			      }
			      .button-variable-item span{
			      font-size: %3$dpx;
			      }
				', absint( $width ), absint( $height ), absint( $fontsize ) );
				
				$css = apply_filters( 'wvs_inline_style', $css );
				wp_add_inline_style( 'woo-variation-swatches', $css );
			}
			
			public function admin_enqueue_scripts() {
				$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';
				
				wp_enqueue_script( 'jquery-ui-dialog' );
				
				wp_enqueue_style( 'wp-color-picker' );
				wp_enqueue_script( 'wp-color-picker-alpha', $this->assets_uri( "/js/wp-color-picker-alpha{$suffix}.js" ), array( 'wp-color-picker' ), '2.1.3', TRUE );
				
				wp_enqueue_script( 'form-field-dependency', $this->assets_uri( "/js/form-field-dependency{$suffix}.js" ), array( 'jquery' ), $this->version(), TRUE );
				wp_enqueue_script( 'woo-variation-swatches-admin', $this->assets_uri( "/js/admin{$suffix}.js" ), array( 'jquery' ), $this->version(), TRUE );
				wp_enqueue_style( 'gwp-feed', esc_url( $this->feed_css_uri() ) );
				wp_enqueue_style( 'woo-variation-swatches-admin', $this->assets_uri( "/css/admin{$suffix}.css" ), array(), $this->version() );
				
				
				// wp_enqueue_script( 'selectWoo' );
				// wp_enqueue_style( 'select2' );
				
				wp_localize_script( 'woo-variation-swatches-admin', 'WVSPluginObject', array(
					'media_title'   => esc_html__( 'Choose an Image', 'woo-variation-swatches' ),
					'dialog_title'  => esc_html__( 'Add Attribute', 'woo-variation-swatches' ),
					'dialog_save'   => esc_html__( 'Add', 'woo-variation-swatches' ),
					'dialog_cancel' => esc_html__( 'Cancel', 'woo-variation-swatches' ),
					'button_title'  => esc_html__( 'Use Image', 'woo-variation-swatches' ),
					'add_media'     => esc_html__( 'Add Media', 'woo-variation-swatches' ),
					'ajaxurl'       => esc_url( admin_url( 'admin-ajax.php', 'relative' ) ),
					'nonce'         => wp_create_nonce( 'wvs_plugin_nonce' ),
				) );
			}
			
			public function settings_api() {
				$this->_settings_api = new WVS_Settings_API( $this );
				
				return $this->_settings_api;
			}
			
			public function add_setting( $tab_id, $tab_title, $tab_sections, $active = FALSE ) {
				// Example:
				
				// fn(tab_id, tab_title, [
				//    [
				//     'id'=>'',
				//     'title'=>'',
				//     'desc'=>'',
				//     'fields'=>[
				//        [
				//         'id'=>'',
				//         'type'=>'',
				//         'title'=>'',
				//         'desc'=>'',
				//         'value'=>''
				//      ]
				//    ] // fields end
				//  ]
				//], active ? true | false)
				
				add_filter( 'wvs_settings', function ( $fields ) use ( $tab_id, $tab_title, $tab_sections, $active ) {
					array_push( $fields, array(
						'id'       => $tab_id,
						'title'    => esc_html( $tab_title ),
						'active'   => $active,
						'sections' => $tab_sections
					) );
					
					return $fields;
				} );
			}
			
			public function get_option( $id ) {
				return $this->_settings_api->get_option( $id );
			}
			
			public function add_term_meta( $taxonomy, $post_type, $fields ) {
				return new WVS_Term_Meta( $taxonomy, $post_type, $fields );
			}
			
			public function plugin_row_meta( $links, $file ) {
				if ( $file == $this->basename() ) {
					
					$report_url = esc_url( add_query_arg( array(
						                                      'utm_source'   => 'wp-admin-plugins',
						                                      'utm_medium'   => 'row-meta-link',
						                                      'utm_campaign' => 'woo-variation-swatches',
						                                      'utm_term'     => sanitize_title( $this->get_parent_theme_name() )
					                                      ), 'https://getwooplugins.com/tickets/' ) );
					
					$documentation_url = esc_url( add_query_arg( array(
						                                             'utm_source'   => 'wp-admin-plugins',
						                                             'utm_medium'   => 'row-meta-link',
						                                             'utm_campaign' => 'woo-variation-swatches',
						                                             'utm_term'     => sanitize_title( $this->get_parent_theme_name() )
					                                             ), 'https://getwooplugins.com/documentation/woocommerce-variation-swatches/' ) );
					
					
					$row_meta[ 'documentation' ] = '<a target="_blank" href="' . esc_url( $documentation_url ) . '" title="' . esc_attr( esc_html__( 'Read Documentation', 'woo-variation-swatches' ) ) . '">' . esc_html__( 'Read Documentation', 'woo-variation-swatches' ) . '</a>';
					// $row_meta[ 'rating' ]        = sprintf( '<a target="_blank" href="%1$s">%3$s</a> <span class="gwp-rate-stars"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><a xlink:href="%1$s" title="%2$s" target="_blank"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></a></svg><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><a xlink:href="%1$s" title="%2$s" target="_blank"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></a></svg><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><a xlink:href="%1$s" title="%2$s" target="_blank"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></a></svg><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><a xlink:href="%1$s" title="%2$s" target="_blank"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></a></svg><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><a xlink:href="%1$s" title="%2$s" target="_blank"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></a></svg></span>', esc_url( $review_url ), esc_html__( 'Review', 'woo-variation-swatches' ), esc_html__( 'Please Rate Us', 'woo-variation-swatches' ) );
					$row_meta[ 'issues' ] = sprintf( '%2$s <a target="_blank" href="%1$s">%3$s</a>', esc_url( $report_url ), esc_html__( 'Facing issue?', 'woo-variation-swatches' ), '<span style="color: red">' . esc_html__( 'Please open a ticket.', 'woo-variation-swatches' ) . '</span>' );
					
					return array_merge( $links, $row_meta );
				}
				
				return (array) $links;
			}
			
			public function plugin_action_links( $links ) {
				
				$new_links = array();
				
				$pro_link = $this->get_pro_link();
				
				if ( ! $this->is_pro_active() ):
					$new_links[ 'go-pro' ] = sprintf( '<a target="_blank" style="color: #45b450; font-weight: bold;" href="%1$s" title="%2$s">%2$s</a>', esc_url( $pro_link ), esc_attr__( 'Go Pro', 'woo-variation-swatches' ) );
				endif;
				
				return array_merge( $links, $new_links );
			}
			
			public function get_pro_link( $medium = 'go-pro' ) {
				
				$affiliate_id = apply_filters( 'gwp_affiliate_id', 0 );
				
				$link_args = array();
				
				if ( ! empty( $affiliate_id ) ) {
					$link_args[ 'ref' ] = esc_html( $affiliate_id );
				}
				
				$link_args[ 'utm_source' ]   = 'wp-admin-plugins';
				$link_args[ 'utm_medium' ]   = esc_attr( $medium );
				$link_args[ 'utm_campaign' ] = 'woo-variation-swatches';
				$link_args[ 'utm_term' ]     = sanitize_title( $this->get_parent_theme_name() );
				
				$link_args = apply_filters( 'wvs_get_pro_link_args', $link_args );
				
				return add_query_arg( $link_args, 'https://getwooplugins.com/plugins/woocommerce-variation-swatches/' );
			}
			
			public function get_theme_name() {
				return wp_get_theme()->get( 'Name' );
			}
			
			public function get_theme_dir() {
				return strtolower( basename( get_template_directory() ) );
			}
			
			public function get_parent_theme_name() {
				return wp_get_theme( get_template() )->get( 'Name' );
			}
			
			public function get_parent_theme_dir() {
				return strtolower( basename( get_stylesheet_directory() ) );
			}
			
			public function get_theme_version() {
				return wp_get_theme()->get( 'Version' );
			}
			
			public function is_required_php_version() {
				return version_compare( PHP_VERSION, '5.6.0', '>=' );
			}
			
			public function php_requirement_notice() {
				if ( ! $this->is_required_php_version() ) {
					$class   = 'notice notice-error';
					$text    = esc_html__( 'Please check PHP version requirement.', 'woo-variation-swatches' );
					$link    = esc_url( 'https://docs.woocommerce.com/document/server-requirements/' );
					$message = wp_kses( __( "It's required to use latest version of PHP to use <strong>WooCommerce Variation Swatches</strong>.", 'woo-variation-swatches' ), array( 'strong' => array() ) );
					
					printf( '<div class="%1$s"><p>%2$s <a target="_blank" href="%3$s">%4$s</a></p></div>', $class, $message, $link, $text );
				}
			}
			
			public function wc_requirement_notice() {
				
				if ( ! $this->is_wc_active() ) {
					
					$class = 'notice notice-error';
					
					$text    = esc_html__( 'WooCommerce', 'woo-variation-swatches' );
					$link    = esc_url( add_query_arg( array(
						                                   'tab'       => 'plugin-information',
						                                   'plugin'    => 'woocommerce',
						                                   'TB_iframe' => 'true',
						                                   'width'     => '640',
						                                   'height'    => '500',
					                                   ), admin_url( 'plugin-install.php' ) ) );
					$message = wp_kses( __( "<strong>WooCommerce Variation Swatches</strong> is an add-on of ", 'woo-variation-swatches' ), array( 'strong' => array() ) );
					
					printf( '<div class="%1$s"><p>%2$s <a class="thickbox open-plugin-details-modal" href="%3$s"><strong>%4$s</strong></a></p></div>', $class, $message, $link, $text );
				}
			}
			
			public function is_required_wc_version() {
				return version_compare( WC_VERSION, '3.2', '>' );
			}
			
			public function wc_version_requirement_notice() {
				if ( $this->is_wc_active() && ! $this->is_required_wc_version() ) {
					$class   = 'notice notice-error';
					$message = sprintf( esc_html__( "Currently, you are using older version of WooCommerce. It's recommended to use latest version of WooCommerce to work with %s.", 'woo-variation-swatches' ), esc_html__( 'WooCommerce Variation Swatches', 'woo-variation-swatches' ) );
					printf( '<div class="%1$s"><p><strong>%2$s</strong></p></div>', $class, $message );
				}
			}
			
			public function language() {
				load_plugin_textdomain( 'woo-variation-swatches', FALSE, trailingslashit( WVS_PLUGIN_DIRNAME ) . 'languages' );
			}
			
			public function is_wc_active() {
				
				if ( ! function_exists( 'is_plugin_active' ) ) {
					include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
				}
				
				return is_plugin_active( 'woocommerce/woocommerce.php' );
			}
			
			public function basename() {
				return WVS_PLUGIN_BASENAME;
			}
			
			public function dirname() {
				return WVS_PLUGIN_DIRNAME;
			}
			
			public function version() {
				return esc_attr( $this->_version );
			}
			
			public function plugin_path() {
				return untrailingslashit( plugin_dir_path( __FILE__ ) );
			}
			
			public function plugin_uri() {
				return untrailingslashit( plugins_url( '/', __FILE__ ) );
			}
			
			public function images_uri( $file ) {
				$file = ltrim( $file, '/' );
				
				return WVS_IMAGES_URI . $file;
			}
			
			public function assets_uri( $file ) {
				$file = ltrim( $file, '/' );
				
				return WVS_ASSETS_URI . $file;
			}
			
			public function template_override_dir() {
				return apply_filters( 'wvs_override_dir', 'woo-variation-swatches' );
			}
			
			public function template_path() {
				return apply_filters( 'wvs_template_path', untrailingslashit( $this->plugin_path() ) . '/templates' );
			}
			
			public function template_uri() {
				return apply_filters( 'wvs_template_uri', untrailingslashit( $this->plugin_uri() ) . '/templates' );
			}
			
			public function locate_template( $template_name, $third_party_path = FALSE ) {
				
				$template_name = ltrim( $template_name, '/' );
				$template_path = $this->template_override_dir();
				$default_path  = $this->template_path();
				
				if ( $third_party_path && is_string( $third_party_path ) ) {
					$default_path = untrailingslashit( $third_party_path );
				}
				
				// Look within passed path within the theme - this is priority.
				$template = locate_template( array(
					                             trailingslashit( $template_path ) . trim( $template_name ),
					                             'wvs-template-' . trim( $template_name )
				                             ) );
				
				// Get default template/
				if ( empty( $template ) ) {
					$template = trailingslashit( $default_path ) . trim( $template_name );
				}
				
				// Return what we found.
				return apply_filters( 'wvs_locate_template', $template, $template_name, $template_path );
			}
			
			public function get_template( $template_name, $template_args = array(), $third_party_path = FALSE ) {
				
				$template_name = ltrim( $template_name, '/' );
				
				$located = apply_filters( 'wvs_get_template', $this->locate_template( $template_name, $third_party_path ) );
				
				do_action( 'wvs_before_get_template', $template_name, $template_args );
				
				extract( $template_args );
				
				if ( file_exists( $located ) ) {
					include $located;
				} else {
					trigger_error( sprintf( esc_html__( 'WooCommerce Variation Swatches Plugin try to load "%s" but template "%s" was not found.', 'woo-variation-swatches' ), $located, $template_name ), E_USER_WARNING );
				}
				
				do_action( 'wvs_after_get_template', $template_name, $template_args );
			}
			
			public function get_theme_file_path( $file, $third_party_path = FALSE ) {
				
				$file         = ltrim( $file, '/' );
				$template_dir = $this->template_override_dir();
				$default_path = $this->template_path();
				
				if ( $third_party_path && is_string( $third_party_path ) ) {
					$default_path = untrailingslashit( $third_party_path );
				}
				
				// @TODO: Use get_theme_file_path
				if ( file_exists( get_stylesheet_directory() . '/' . $template_dir . '/' . $file ) ) {
					$path = get_stylesheet_directory() . '/' . $template_dir . '/' . $file;
				} elseif ( file_exists( get_template_directory() . '/' . $template_dir . '/' . $file ) ) {
					$path = get_template_directory() . '/' . $template_dir . '/' . $file;
				} else {
					$path = trailingslashit( $default_path ) . $file;
				}
				
				return apply_filters( 'wvs_get_theme_file_path', $path, $file );
			}
			
			public function get_theme_file_uri( $file, $third_party_uri = FALSE ) {
				
				$file         = ltrim( $file, '/' );
				$template_dir = $this->template_override_dir();
				$default_uri  = $this->template_uri();
				
				if ( $third_party_uri && is_string( $third_party_uri ) ) {
					$default_uri = untrailingslashit( $third_party_uri );
				}
				
				// @TODO: Use get_theme_file_uri
				if ( file_exists( get_stylesheet_directory() . '/' . $template_dir . '/' . $file ) ) {
					$uri = get_stylesheet_directory_uri() . '/' . $template_dir . '/' . $file;
				} elseif ( file_exists( get_template_directory() . '/' . $template_dir . '/' . $file ) ) {
					$uri = get_template_directory_uri() . '/' . $template_dir . '/' . $file;
				} else {
					$uri = trailingslashit( $default_uri ) . $file;
				}
				
				return apply_filters( 'wvs_get_theme_file_uri', $uri, $file );
			}
		}
		
		function woo_variation_swatches() {
			return Woo_Variation_Swatches::instance();
		}
		
		add_action( 'plugins_loaded', 'woo_variation_swatches' );
	endif;