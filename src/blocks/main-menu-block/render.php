<?php 
	$blockClass = 'wp-block-' . str_replace('/', '-', $block->parsed_block['blockName']);
	$tfa_header_menu = array(
		'theme_location' 	=> 'WP-header-menu',
		'depth'             => 4,
		'container'         => false,
		'menu_class'        => '',
		'before' 			=> '<input class="item-sub" type="checkbox" name="menu-item"><em></em>',
		'fallback_cb'       => '__return_false',
		'items_wrap' 		=> '<ul id="%1$s" class="menu-item__sub-wrap navbar-nav me-auto mb-2 mb-md-0 %2$s">%3$s</ul>',
		'walker'            => new bootstrap_5_wp_nav_menu_walker(),
	) ?? '';

	// Get ACF Images for sub menus
	function wp_nav_menu_objects( $items, $args ) {

		// Menu images
		foreach( $items as $item ) :
			$menu_img = wp_get_attachment_image_src( get_field('menu_image', $item) );
			if( $menu_img ) :
				$item->ID.= ' mega-img';
				$item->title.= '<img class="mega-img" src="'.$menu_img[0].'" alt="mega-img" />';
			endif;
		endforeach;

		// Check Sticky Header Class
		$menu = wp_get_nav_menu_object($args->menu);
		$stickyheader = get_field('truefalse_stickyheader', $menu);
		if ( $stickyheader == 'true' ):
			$html_stickyheader = '<script>document.addEventListener("DOMContentLoaded", function() {const nav_mega = document.querySelector("header.site-header");nav_mega.className +=" sticky-header";});</script>';
			echo $html_stickyheader;
		endif;
		
		// Check Megamenu Class
		$menu = wp_get_nav_menu_object($args->menu);
		$megamenu = get_field('truefalse_megamenu', $menu);
		if ( $megamenu == 'true' ):
			$html_megamenu = '<script>document.addEventListener("DOMContentLoaded", function() {const nav_mega = document.querySelector(".header-nav");nav_mega.className +=" megamenu";});</script>';
			echo $html_megamenu;
		endif;

		// Check last item Button
		$lastnavbtn = get_field('truefalse_lastnavbtn', $menu);
		if ( $lastnavbtn == 'true' ):
			$html_lastnavbtn = '<script>document.addEventListener("DOMContentLoaded", function() {const nav_mega = document.querySelector(".header-nav");nav_mega.className +=" lastnavbtn";});</script>';
			echo $html_lastnavbtn;
		endif;

		// Search - need to be added

		// MyAccount - need to be added
		$menu = wp_get_nav_menu_object($args->menu);
		$account = get_field('truefalse_user', $menu);
		if ( $account == 'true' ):
			$html_account = '<script>document.addEventListener("DOMContentLoaded", function() {const nav_mega = document.querySelector("body");nav_mega.className +=" woo-account";});</script>';
			echo $html_account;
		endif;

		// Cart - need to be added
		$menu = wp_get_nav_menu_object($args->menu);
		$cart = get_field('truefalse_cart', $menu);
		if ( $cart == 'true' ):
			$html_cart = '<script>document.addEventListener("DOMContentLoaded", function() {const nav_mega = document.querySelector("body");nav_mega.className +=" woo-cart";});</script>';
			echo $html_cart;
		endif;

		// Light/Dark Theme Body Class
		$menu = wp_get_nav_menu_object($args->menu);
		$light_dark = get_field('truefalse_light_dark', $menu);
		if ( $light_dark == 'true' ):
			$html_light_dark = '<script>document.addEventListener("DOMContentLoaded", function() {const nav_mega = document.querySelector("body");nav_mega.className +=" light-dark";});</script>';
			echo $html_light_dark;
		endif;

		// Languages Switch - need to be added
		$menu = wp_get_nav_menu_object($args->menu);
		$language = get_field('truefalse_lang', $menu);
		if ( $language == 'true' ):
			$html_language = '<script>document.addEventListener("DOMContentLoaded", function() {const nav_mega = document.querySelector("body");nav_mega.className +=" menu-flags";});</script>';
			echo $html_language;
		endif;

		return $items;
	}
	add_filter('wp_nav_menu_objects', 'wp_nav_menu_objects', 10, 2);
?>
<nav class="navbar navbar-expand-md navbar-light bg-light header-nav <?= $blockClass ?>" role="navigation">
	<span class="navbar-toggler-btn" data-target="#WP-header-menu" style="display:none"><em></em><em></em><em></em></span>
	<div class="container-boxed">
		<div class="collapse navbar-collapse WP-header-menu-container" id="WP-header-menu">
			<?php wp_nav_menu( $tfa_header_menu ); ?>
			<div class="switcher-darkmode">
				<input type="checkbox" class="checkbox" id="toggleBtn" />
				<label class="switch" for="toggleBtn">
					<i class="fas fa-moon"></i>
					<i class="fas fa-sun"></i>
					<div class="ball"></div>
				</label>
			</div>
		</div>
	</div>
</nav>
<div class="header-nav-overlay" style="display:none"></div>