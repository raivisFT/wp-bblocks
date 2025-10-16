import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	
	const { mediaUrl, url, ctaBrdRd, srcBrdRd, swapCol, contDiv, bgColor, altText, btnText, btnOnOff } = attributes;
	const wrapperClasses = classnames( 'wp-cta' );


	
	return (
		<section 
			{ ...useBlockProps.save( {
				className: wrapperClasses,
			} ) } 
		>
			<div className={ contDiv } style={{ backgroundColor: bgColor, borderRadius: + ctaBrdRd + 'px' }}>
					<div className="row">

						<div className={"col-xl-6 col-md-6 col-12 " + swapCol}>
							<div className="desc">
								<InnerBlocks.Content />
								{ url && <a href={ url }  className={ btnOnOff } >{ btnText }</a> }
							</div>
						</div>

						<div className="col-xl-6 col-md-6 col-12">
							{ mediaUrl && ( <img src={ mediaUrl } alt={ altText } className={ 'card-img' } style={{ 'border-radius': + srcBrdRd + 'px' }} /> ) }
						</div>

				</div>
			</div>
		</section>
	);
}