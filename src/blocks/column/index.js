import { registerBlockType } from '@wordpress/blocks';
import { columns as icon } from '@wordpress/icons';
import deprecated from './deprecated';
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { attributes, parent } = metadata;

registerBlockType( metadata.name, {
	deprecated,
	attributes,
	parent,
	icon,
	edit,
	save
} );