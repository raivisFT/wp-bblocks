/**
 * WordPress dependencies
 */
import { link as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';

const { name, category, attributes, title, parent } = metadata;

const settings = {
	title,
	parent,
	icon,
	edit,
	attributes,
	keywords: [
        'WP',
        'acf',
		'custom',
		'field'
    ],
};


export { name, category, metadata, settings };