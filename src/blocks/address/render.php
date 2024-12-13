<?php 
	$blockClass = 'wp-block-' . str_replace('/', '-', $block->parsed_block['blockName']); 
	$fields = get_fields('option');
	$place_url = $fields['map_url_place'] ?? '';
	$loc = $fields['map_address'] ?? '';
?>
<div class="<?= $blockClass ?> address-block__content">
	<!-- wp:paragraph -->
	<p class="loc-address"><a href="<?=$place_url?>" target="_blank" rel="noreferrer noopener"><?=$loc?></a></p>
	<!-- wp:paragraph -->
</div>