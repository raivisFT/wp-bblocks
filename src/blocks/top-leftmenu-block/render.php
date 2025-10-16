<?php $blockClass = 'wp-block-' . str_replace('/', '-', $block->parsed_block['blockName']); ?>
<div class="<?= $blockClass ?> top-leftmenu-block__content">
	<!-- PHP variables -->
	<?php
		$wp_topleftmenu_menu = array(
			'theme_location' => 'wp-topleftmenu-menu',
			'container' => 'nav',
			'container_class' => 'wp-topleftmenu-menu-container--list',						
			'container_id' => 'wp-topleftmenu-menu',
			'menu_class' => 'wp-topleftmenu-menu-container',
			'fallback_cb' => '__return_false',
			'items_wrap' => '<ul id="%1$s" class="navbar-nav me-auto mb-2 mb-md-0 %2$s">%3$s</ul>',
			'depth' => 1, // 1 = no dropdowns, 2+ dropdowns
			'before' => '<input class="item-sub" type="checkbox" name="nav">',
			'after' => '',
			'link_before' => '',
			'link_after' => '',
			'walker' => new bootstrap_5_wp_nav_menu_walker()
		) ?? '';
		wp_nav_menu( $wp_topleftmenu_menu );
	?>
	<!-- // PHP variables -->
</div>