<?php 
	$blockClass = 'wp-block-' . str_replace('/', '-', $block->parsed_block['blockName']); 
	$fields = get_fields('option');		
	$url = $fields['map_url'] ?? '';
	$zoom = $fields['map_zoom'] ?? '';
	$height = $fields['map_height'] ?? '';
?>
<div class="<?= $blockClass ?> google-map-block__content">
	<!-- wp:paragraph -->
	<p><iframe src="<?=$url?>&amp;t=m&amp;z=<?=$zoom?>&amp;output=embed&amp;iwloc=near" width="100%" height="<?=$height?>" style="border:0;margin-bottom:-15px" allowfullscreen="" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></p>
	<!-- /wp:paragraph -->
</div>