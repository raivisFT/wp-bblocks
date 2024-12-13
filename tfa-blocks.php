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

define('WPBLOCKS_ROOT_PATH', plugin_dir_path(__FILE__));
define('WPBLOCKS_ROOT_URL', plugin_dir_url(__FILE__));

/**
 * Register and enqueue Gutenberg Blocks
 */
function register_tfa_blocks() {
    $blocksPath = WPBLOCKS_ROOT_PATH . 'build/blocks/';
    $iterator = new DirectoryIterator($blocksPath);
    foreach ($iterator as $file) {
        if ($file->isDot()) continue;
        if ($file->isDir()) {
            register_block_type($file->getPathname());
        }
    }
}
add_action('init', 'register_tfa_blocks');

/**
 * Register and enqueue Script & Style WP Front Side
 */
function wpdocs_enqueue_custom_public_style() {
	$name       = 'public';
	$filepath   = 'build/public/' . $name;
	$asset_path = WPBLOCKS_ROOT_PATH . $filepath . '.asset.php';
	$asset_file = file_exists( $asset_path ) ? include $asset_path : array( 'dependencies' => array(), 'version' => '1.0', );
	$script_url = WPBLOCKS_ROOT_URL . 'build/style/public.js';
	$style_url = WPBLOCKS_ROOT_URL . 'build/style/public.scss.css';
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
	$asset_path = WPBLOCKS_ROOT_PATH . $filepath . '.asset.php';
	$asset_file = file_exists( $asset_path ) ? include $asset_path : array( 'dependencies' => array(), 'version' => '1.0', );
	$script_url = WPBLOCKS_ROOT_URL . 'build/style/admin.js';
	$style_url = WPBLOCKS_ROOT_URL . 'build/style/admin.scss.css';
	$v = $asset_file['version'];
	wp_enqueue_script( 'admin-wpbootblocks-style', $script_url, array(), $v, 'all' );
	wp_enqueue_style( 'admin-wpbootblocks-style', $style_url, array(), $v, 'all' );
}
add_action('admin_enqueue_scripts','wpdocs_enqueue_custom_admin_style');

/**
 * Disabled Gutenberg blocks
 */
 function tfa_blacklist_blocks() {
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
add_filter( 'allowed_block_types_all', 'tfa_blacklist_blocks' );

add_theme_support( 'editor-styles' );
add_theme_support( 'dark-editor-style' );
add_theme_support( 'align-wide' );
add_theme_support( 'wp-block-styles' );
add_theme_support( 'block-templates' );
add_theme_support( 'block-template-parts' );
add_theme_support( 'custom-units', 'rem', 'vw', 'vh', '%' );