<?php
/**
 * Author x (child) block.
 * This block is only available as a child
 * block within the parent Author Info block.
 */

// Grab our ACF field.
$x_handle = get_field( 'x_com' );
?>

<?php if ( $is_preview && empty( $x_handle ) ) : ?>
	<p>Please enter a x handle.</p>
<?php else : ?>
	<p>
		<svg height="0.95rem" width="0.95rem" viewBox="0 0 24 24" aria-hidden="true" class="icon icon-x"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="black"></path></g></svg>
		<a href="https://x.com/<?php echo esc_html( $x_handle ); ?>">
			@<?php echo esc_html( $x_handle ); ?>
		</a>
	</p>
<?php endif; ?>
