import { registerBlockType } from '@wordpress/blocks';
import { button as icon } from '@wordpress/icons';
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name, category, attributes } = metadata;

registerBlockType( metadata.name, {
    attributes,
    category,
    name,
    icon,
    edit,
    save
});