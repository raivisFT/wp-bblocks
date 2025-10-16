<?php $blockClass = 'wp-block-' . str_replace('/', '-', $block->parsed_block['blockName']); ?>
<div class="<?= $blockClass ?> contact-details-block__content">
	<!-- PHP variables -->
	<?php
		$fields = get_fields('option');
		$loc = $fields['map_address'] ?? '';
		$email = $fields['email'] ?? '';
		$tel = $fields['tel'] ?? '';
		$tel_txt = $fields['tel_txt'] ?? '';
	?>
	<!-- // PHP variables -->
	<!-- wp:list -->
	<ul class="contact-details">
		<!-- wp:list-item --><li class="contact-details_email"><a href="mailto:<?php echo antispambot( $email ); ?>"><?php echo antispambot( $email ); ?></a></li><!-- /wp:list-item -->
		<!-- wp:list-item --><li class="contact-details_tel"><a href="tel:<?=$tel?>" target="_blank" rel="noreferrer noopener"><?=$tel_txt?></a></li><!-- /wp:list-item -->
	</ul>
	<!-- /wp:list -->
</div>