/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {

	const { cardTitle, titleColor, mediaUrl, columnAlign, url, linkTarget, altText, btnText, btnOnOff } = attributes;
	const wrapperClasses = classnames( 'faux-link__element', columnAlign );

	return (
		<section 
			{ ...useBlockProps.save( {
				className: wrapperClasses,
			} ) } 
		>
			{ mediaUrl && ( <div className="img-box"><img src={ mediaUrl } alt={ altText } className={ 'card-img' } /></div> ) }
			<div className="desc">
				<RichText.Content tagName="strong" value={ cardTitle } className={'h3'} style={ { color: titleColor } } />
				<InnerBlocks.Content />
				{ url && <a href={ url } className={ btnOnOff }>{ btnText }</a> }
			</div>
			{ url && <a href={ url } target={ linkTarget } className='faux-link__overlay-link' rel='noopener'></a> }
		</section>
	);
}
