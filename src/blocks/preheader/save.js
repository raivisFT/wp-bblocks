/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {

	const { cardTitle, titleColor, txtUpp, tagH, txtBold } = attributes;

	const classNamePreHeader = classnames(
        tagH,
		txtUpp,
		txtBold
		);

	return (
		<div 
			{ ...useBlockProps.save() } 
		>
				<RichText.Content tagName="span" value={ cardTitle } className={classNamePreHeader} style={ { color: titleColor } } />
				<InnerBlocks.Content />
		</div>
	);
}
