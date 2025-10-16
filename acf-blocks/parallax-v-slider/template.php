<?php
	/**
	 * Author Info block (parent).
	 */
	// Support custom id values.
	$block_id = '';
	if ( ! empty( $block['anchor'] ) ) {
		$block_id = esc_attr( $block['anchor'] );
	}
	// Create class attribute allowing for custom "className".
	$class_name = 'parallax-v-slider-block-acf';
	if ( ! empty( $block['className'] ) ) {
		$class_name .= ' ' . $block['className'];
	}
	$inner_blocks_template = 
	array(
		array(
			'core/paragraph',
			array(
				'style'    => array(
					'spacing' => array(
						'margin' => array(
							'bottom' => '0',
							'top'    => '0',
						),
					),
				),
				'fontSize' => 'small',
				'content'  => 'About Parallax Items ...',
				'lock'     => array(
				'remove' => false,
				),
			),
			array(),
		)
	);
	// Grab our ACF field.
	$parallax = get_field('parallax'); // Need PHP template
	print_r($parallax);
?>
<InnerBlocks class="x-author-block-acf__innerblocks" template="<?php echo esc_attr( wp_json_encode( $inner_blocks_template ) ); ?>"	templateLock="all" />
<?php if ( ! $is_preview ) { ?>
	<div <?=wp_kses_data( get_block_wrapper_attributes( array( 'id' => $block_id,'class' => esc_attr( $class_name ), ) ) )?> >
<?php } else { ?>
	<p><b>| EDIT ( Parallax Items ) |</b> <?php echo esc_html( $parallax ); ?></p>
</div>
<?php } ?>