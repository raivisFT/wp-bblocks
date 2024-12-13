/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { title, tagH, txtBold, txtUpp, titleColor, price, currency, currencyColor, currencyBold, tagC, mediaUrl, mediaAlt, url, btnStyle, btnText } = attributes;
	const wrapperClasses = classnames('card');

	const classNameHeader = classnames(
        tagH,
		txtBold,
		txtUpp
		);

	const classNameCurrency = classnames( 
		currencyBold, 
		tagC
		);

	return (
		<div {...useBlockProps.save({
			className: wrapperClasses,
		})}>
			<div className="card-heading matchheight">
				<img className='card-img-top' src={mediaUrl} alt={mediaAlt} />
			</div>
			<div className="card-body matchheight">
				<div class="card-title"><RichText.Content
					tagName="span"
					className={ classNameHeader }
					value={ title }
					style={ { color: titleColor } }
				/></div>
				<div className='card-text currrency'>
					<span className={ classNameCurrency } style={ { color: currencyColor } }>{ currency }{ price }</span>
				</div>

				<div className='card-text'><InnerBlocks.Content /></div>

				{ url && <a href={ url } className={ btnStyle } role="button">{ btnText }</a> }
			</div>
		</div>
	);
}