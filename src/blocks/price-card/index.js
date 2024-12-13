import { registerBlockType } from '@wordpress/blocks';
import { video as icon } from '@wordpress/icons';

import './style.scss';

import edit from './edit';
import save from './save';
import metadata from './block.json';

const { attributes } = metadata;

registerBlockType( metadata.name, {
    attributes,
    icon,
    edit,
    save
} );