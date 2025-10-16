/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {

	const { cardTitle, titleColor, mediaUrl, columnAlign, url, linkTarget, altText, btnText, btnOnOff, tagH, tagHclass, imgOrgProp, contentOrgProp, titleOrgProp, priceOrgProp, isSchema } = attributes;
	const wrapperClasses = classnames( 'faux-link__element', columnAlign );
	const schemaProp = "https://schema.org/Product";

	return (
		<section 
			{ ...useBlockProps.save( {
				className: wrapperClasses,
			} ) } itemscope={isSchema && '' } itemtype={isSchema && schemaProp }
			>			
			{ isSchema && <div itemscope="" itemtype="https://schema.org/Product"></div> }
			{ mediaUrl && ( <div className="img-box"><img src={ mediaUrl } alt={ altText } className={ 'card-img' } itemprop={ isSchema && imgOrgProp } /></div> ) }
			<div className="desc" itemprop={ contentOrgProp }>
				<RichText.Content tagName={ tagH } value={ cardTitle } className={ tagHclass } style={ { color: titleColor } } itemprop={ isSchema && titleOrgProp } />
				<InnerBlocks.Content />
				{ url && <a href={ url } className={ btnOnOff }>{ btnText }</a> }
			</div>
			{ url && <a href={ url } target={ linkTarget } className='faux-link__overlay-link' rel='noopener'></a> }
		</section>
	);
}
