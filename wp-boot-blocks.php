<?php

/**
 * Plugin Name: WP Boot Blocks
 * Description: This plugin registers custom blocks for the block editor and extra styling for common Gutenberg blocks
 * Version: 1.0.0
 * Author: Raivis Kalnins
 *
 * @package wpbootblocks
 */

defined( 'ABSPATH' ) || exit;

define('WPBOOTBLOCKS_ROOT_PATH', plugin_dir_path(__FILE__));
define('WPBOOTBLOCKS_ROOT_URL', plugin_dir_url(__FILE__));

/**
 * Register and enqueue Gutenberg Blocks
 */
function register_wp_blocks() {
    $blocksPath = WPBOOTBLOCKS_ROOT_PATH . 'build/blocks/';
    $iterator = new DirectoryIterator($blocksPath);
    foreach ($iterator as $file) {
        if ($file->isDot()) continue;
        if ($file->isDir()) {
            register_block_type($file->getPathname());
        }
    }
}
add_action('init', 'register_wp_blocks');

/**
 * Register and enqueue Script & Style WP Front Side
 */
function wpdocs_enqueue_custom_public_style() {
	$name       = 'public';
	$filepath   = 'build/public/' . $name;
	$asset_path = WPBOOTBLOCKS_ROOT_PATH . $filepath . '.asset.php';
	$asset_file = file_exists( $asset_path ) ? include $asset_path : array( 'dependencies' => array(), 'version' => '1.0', );
	$script_url = WPBOOTBLOCKS_ROOT_URL . 'build/style/public.js';
	$style_url = WPBOOTBLOCKS_ROOT_URL . 'build/style/public.scss.css';
	$v = $asset_file['version'];
	wp_enqueue_style( 'public-wpbootblocks-style', $style_url, array(), $v, 'all' );
	//wp_enqueue_script( 'js_bootstrap', '//cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.0/js/bootstrap.min.js', ['jquery'], '', 'all' );
	wp_enqueue_script( 'public-wpbootblocks-style', $script_url, array(), $v, 'all' );
}
add_action( 'wp_enqueue_scripts', 'wpdocs_enqueue_custom_public_style' );

/**
 * Register and enqueue Script & Style WP Admin Side
 */
function wpdocs_enqueue_custom_admin_style() {
	$name       = 'admin';
	$filepath   = 'build/' . $name;
	$asset_path = WPBOOTBLOCKS_ROOT_PATH . $filepath . '.asset.php';
	$asset_file = file_exists( $asset_path ) ? include $asset_path : array( 'dependencies' => array(), 'version' => '1.0', );
	$script_url = WPBOOTBLOCKS_ROOT_URL . 'build/style/admin.js';
	$style_url = WPBOOTBLOCKS_ROOT_URL . 'build/style/admin.scss.css';
	$v = $asset_file['version'];
	wp_enqueue_script( 'admin-wpbootblocks-style', $script_url, array(), $v, 'all' );
	wp_enqueue_style( 'admin-wpbootblocks-style', $style_url, array(), $v, 'all' );
}
add_action('admin_enqueue_scripts','wpdocs_enqueue_custom_admin_style');

/**
 * Disabled Gutenberg blocks
 */
 function wp_blacklist_blocks() {
	// get all the registered blocks
	$blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();
	// then disable some of them
	unset( $blocks[ 'mailchimp-for-wp/form' ] );
	unset( $blocks[ 'core/buttons' ] );
	unset( $blocks[ 'core/columns' ] );
	unset( $blocks[ 'core/group' ] );
	unset( $blocks[ 'core/stack' ] );
	unset( $blocks[ 'core/embed' ] );
	unset( $blocks[ 'core/verse' ] );
	// return the new list of allowed blocks
	return array_keys( $blocks );
}
add_filter( 'allowed_block_types_all', 'wp_blacklist_blocks' );

add_theme_support( 'editor-styles' );
add_theme_support( 'dark-editor-style' );
add_theme_support( 'align-wide' );
add_theme_support( 'wp-block-styles' );
add_theme_support( 'block-templates' );
add_theme_support( 'block-template-parts' );
add_theme_support( 'custom-units', 'rem', 'vw', 'vh', '%' );

add_action('init', function () {
    // Register block categories early
    add_filter( 'block_categories_all', function( $categories, $post ) {
        $custom_categories = [
            ['slug' => 'WP-content', 'title' => '1. WP Stylised Content Blocks'],
            ['slug' => 'WP-layout', 'title' => '2. WP Stylised Layout Blocks'],

        ];

        // Put your categories at the top
        return array_merge( $custom_categories, $categories );
    }, 1, 2 );
}, 0);

add_action('enqueue_block_editor_assets', function () {
    wp_enqueue_script(
        'move-core-blocks',
        plugins_url('block-categories.js', __FILE__), // adjust path if needed
        ['wp-blocks', 'wp-dom-ready', 'wp-edit-post'],
        null,
        true
    );
});

function add_acf_fields() {

	acf_add_local_field_group(

		array(
			'key'      => 'group_64e3e09959e8f',
			'title'    => 'Author X',
			'fields'   => array(
				array(
					'key'          => 'field_64e3e09a7a544',
					'label'        => 'X',
					'name'         => 'x_com',
					'type'         => 'text',
					'instructions' => 'https://x.com/[username]',
					'prepend'      => 'https://x.com/',
				),
			),
			'location' => array(
				array(
					array(
						'param'    => 'block',
						'operator' => '==',
						'value'    => 'acf/xcom',
					),
				),
			),
		),
		array(
			'key' => 'group_6895fd1ab2561',
			'title' => 'Parallax',
			'fields' => array(
				array(
					'key' => 'field_6895fd1b57f2e',
					'label' => 'Parallax item',
					'name' => 'parallax_item',
					'aria-label' => '',
					'type' => 'repeater',
					'instructions' => 'Add Parallax Items',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array(
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'layout' => 'table',
					'pagination' => 0,
					'min' => 0,
					'max' => 0,
					'collapsed' => '',
					'button_label' => 'Add Row',
					'rows_per_page' => 20,
					'sub_fields' => array(
						array(
							'key' => 'field_6895fd5557f2f',
							'label' => 'Image',
							'name' => 'image',
							'aria-label' => '',
							'type' => 'image',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array(
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'return_format' => 'url',
							'library' => 'all',
							'min_width' => '',
							'min_height' => '',
							'min_size' => '',
							'max_width' => '',
							'max_height' => '',
							'max_size' => '',
							'mime_types' => '',
							'allow_in_bindings' => 0,
							'preview_size' => 'medium',
							'parent_repeater' => 'field_6895fd1b57f2e',
						),
						array(
							'key' => 'field_6895fd6757f30',
							'label' => 'Caption',
							'name' => 'caption',
							'aria-label' => '',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array(
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'maxlength' => '',
							'allow_in_bindings' => 0,
							'placeholder' => '',
							'prepend' => '',
							'append' => '',
							'parent_repeater' => 'field_6895fd1b57f2e',
						),
						array(
							'key' => 'field_6895fd9457f32',
							'label' => 'Gallery',
							'name' => 'gallery',
							'aria-label' => '',
							'type' => 'gallery',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array(
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'return_format' => 'url',
							'library' => 'all',
							'min' => '',
							'max' => '',
							'min_width' => '',
							'min_height' => '',
							'min_size' => '',
							'max_width' => '',
							'max_height' => '',
							'max_size' => '',
							'mime_types' => '',
							'insert' => 'append',
							'preview_size' => 'medium',
							'parent_repeater' => 'field_6895fd1b57f2e',
						),
						array(
							'key' => 'field_6895fd8157f31',
							'label' => 'Description',
							'name' => 'description',
							'aria-label' => '',
							'type' => 'wysiwyg',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array(
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'allow_in_bindings' => 0,
							'tabs' => 'all',
							'toolbar' => 'full',
							'media_upload' => 1,
							'delay' => 0,
							'parent_repeater' => 'field_6895fd1b57f2e',
						),
					),
				),
			),
			'location' => array(
				array(
					array(
						'param'    => 'block',
						'operator' => '==',
						'value'    => 'acf/parallax',
					),
				),
			),
		)
	);

	if ( ! function_exists( 'acf_add_local_field_group' ) ) {
		return;
	}
}
add_action( 'acf/include_fields', 'add_acf_fields' );

/**
 * ACF Blocks
 */
function x_acf_block_register() {
	register_block_type(  __DIR__ . '/acf-blocks/author-x-com' );
	register_block_type(  __DIR__ . '/acf-blocks/author-info' );
	register_block_type(  __DIR__ . '/acf-blocks/parallax-v-slider' );
}
add_action( 'init', 'x_acf_block_register', 5 );
