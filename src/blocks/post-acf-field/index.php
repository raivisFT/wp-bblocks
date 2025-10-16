<?php
/**
 * Server-side rendering of the `wp/post-acf-field` block.
 *
 * @package WordPress
 */

/**
 * Renders the `wp/post-acf-field` block on the server.
 *
 * @param  array    $attributes Block attributes.
 * @param  string   $content    Block default content.
 * @param  WP_Block $block      Block instance.
 * @return string Returns the rendered author block.
 */
function render_block_wp_post_acf_field( $attributes, $content, $block ) {	
	if ( ! isset( $attributes['fieldName'] ) ) {
		return '';
	}
	
	if ( ! isset( $attributes['option'] ) && $attributes['option'] === 'page' && ! isset( $block->context['postId'] ) ) {
		return '';
	}
	
	$fieldLocation = $attributes['option'] === 'page' ? $block->context['postId'] : 'option';

	$fieldValue = get_field($attributes['fieldName'], $fieldLocation, true);

	if ( empty( $fieldValue ) ) {
		return '';
	}

	$return = sprintf('<div class="wp-acffield">%s</div>', $fieldValue);

	return $return;
}

/**
 * Registers the `wp/post-acf-field` block on the server.
 */
function register_block_wp_post_acf_field() {
	register_block_type_from_metadata(
		WP_ROOT_PATH . 'src/blocks/post-acf-field',
		array(
			'render_callback' => 'render_block_wp_post_acf_field',
		)
	);
}
add_action( 'init', 'register_block_wp_post_acf_field' );
