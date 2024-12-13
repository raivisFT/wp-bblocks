/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	InnerBlocks,
	InspectorControls,
	RichText,
	MediaUpload,
	MediaUploadCheck,
    __experimentalLinkControl as LinkControl

} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
    TextControl,
	ColorPalette,
	ResponsiveWrapper,
	Button,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function ColumnEdit (props) {
	const { attributes, setAttributes } = props;

	const { title, tagH, txtBold, txtUpp, titleColor, price, currency, currencyColor, currencyBold, tagC, altText, mediaId, mediaUrl, url, btnStyle, btnText } = attributes;
	const contentClasses = classnames('content');

	const colors = [
		{ name: 'white', color: '#ffffff' },
		{ name: 'black', color: '#000000' },
	];

	const titleStyle = {
		color: titleColor
	};

	const currencyStyle = {
		color: currencyColor
	};


    const removeMedia = () => {
		setAttributes({
			mediaId: 0,
			mediaUrl: ''
		});
	}

 	const onSelectMedia = (media) => {
		setAttributes({
			mediaId: media.id,
			mediaUrl: media.url
		});
	}

	return (
		<div>
			<InspectorControls>
				<PanelBody title={ __( 'Card settings' ) }
							initialOpen={ true }
				>

                    <hr />
					<h3>Image Block</h3>
					<hr />
                    <div className="editor-post-featured-image">
						<img src={ mediaUrl }  />
						<MediaUploadCheck>
							<MediaUpload
								onSelect={onSelectMedia}
								value={attributes.mediaId}
								allowedTypes={ ['image'] }
								render={({open}) => (
									<Button
										className={attributes.mediaId == 0 ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}
										onClick={open}
									>
										{attributes.mediaId == 0 && __('Choose an image', 'WP')}
										{props.media != undefined &&
											<ResponsiveWrapper
												naturalWidth={ props.media.media_details.width }
												naturalHeight={ props.media.media_details.height }
											>
												<img src={props.media.source_url} />
											</ResponsiveWrapper>
											}
									</Button>
								)}
							/>
						</MediaUploadCheck>
						{attributes.mediaId != 0 &&
							<MediaUploadCheck>
								<MediaUpload
									title={__('Replace image', 'WP')}
									value={attributes.mediaId}
									onSelect={onSelectMedia}
									allowedTypes={['image']}
									render={({open}) => (
										<Button onClick={open} isSecondary>{__('Replace image', 'WP')}</Button>
									)}
								/>
							</MediaUploadCheck>
						}
						{attributes.mediaId != 0 &&
							<MediaUploadCheck>
								<Button onClick={removeMedia} isLink isDestructive>{__('Remove image', 'WP')}</Button>
							</MediaUploadCheck>
						}
						<hr />
						<TextControl
							label="Image alt Text"
							value={ altText }
							onChange={ ( altText ) => setAttributes( { altText } ) }
						/>
					</div>
					<hr />
					<h3>Heading Block</h3>
					<div>
					<hr />
					<ColorPalette
						label="Header Colour"
						colors={ colors }
						value={ titleColor }
						onChange={ ( colors ) => setAttributes( { titleColor: colors } ) }
					/>
					<hr />
					<SelectControl
						label="Add Heading weight"
						value={ txtBold }
						options={ [
							{ label: 'Bold', value: 'fw-bold' },
							{ label: 'Normal', value: 'fw-normal' },
						] }
						onChange={ ( newTxtBold ) => setAttributes( {txtBold: newTxtBold} ) }
					/>
					<hr />
					<SelectControl
						label="Add Upper/Lower/Capitalize"
						value={ txtUpp }
						options={ [
							{ label: 'Uppercase', value: 'text-uppercase' },
							{ label: 'Lowercase', value: 'text-lowercase' },
							{ label: 'Capitalize', value: 'text-capitalize' },
						] }
						onChange={ ( newTxtUpp ) => setAttributes( {txtUpp: newTxtUpp} ) }
					/>
					<hr />
					<SelectControl
						label="Select Heading tag"
						value={ tagH }
						options={ [
							{ label: 'h1', value: 'h1' },
							{ label: 'h2', value: 'h2' },
							{ label: 'h3', value: 'h3' },
							{ label: 'h4', value: 'h4' },
							{ label: 'h5', value: 'h5' },
							{ label: 'h6', value: 'h6' },
						] }
						onChange={ ( newTagH ) => setAttributes( {tagH: newTagH} ) }
					/>
					</div>
					<hr />
					<h3>Currency Block</h3>
					<div>
                    <hr />
					<SelectControl
						label="Currency"
						value={ currency }
						options={ [
							{ label: 'British Pound', value: '&pound;' },
							{ label: 'US Dollar', value: '&dollar;' },
							{ label: 'Euro', value: '&euro;' },
						] }
						onChange={ ( newCurrency ) => setAttributes( {currency: newCurrency} ) }
					/>
					<hr />
					<ColorPalette
						label="Currency Colour"
						colors={ colors }
						value={ currencyColor }
						onChange={ ( colors ) => setAttributes( { currencyColor: colors } ) }
					/>
					<hr />
					<SelectControl
						label="Add Currency weight"
						value={ currencyBold }
						options={ [
							{ label: 'Bold', value: 'fw-bold' },
							{ label: 'Normal', value: 'fw-normal' },
						] }
						onChange={ ( newCurrencyBold ) => setAttributes( {currencyBold: newCurrencyBold} ) }
					/>
					<hr />
					<SelectControl
						label="Select Currency Tag"
						value={ tagC }
						options={ [
							{ label: 'h1', value: 'h1' },
							{ label: 'h2', value: 'h2' },
							{ label: 'h3', value: 'h3' },
							{ label: 'h4', value: 'h4' },
							{ label: 'h5', value: 'h5' },
							{ label: 'h6', value: 'h6' },
						] }
						onChange={ ( newTagC ) => setAttributes( {tagC: newTagC} ) }
					/>
					</div>
					<hr />
					<h3>Button link URL</h3>
					<div>
					<hr />
					<LinkControl
						value={{ url }}
						settings={[]}
						onChange={ ( {
							url: newURL = '',					
						} ) => {
							setAttributes({ url: newURL });
						} 
						}
					/>
					<hr />
					
					<TextControl
						label="Btn Text"
						value={ btnText }
						onChange={ ( btnText ) => setAttributes( { btnText } ) }
					/>
					<hr />
					<SelectControl
						label="Button Style"
						value={ btnStyle }
						options={ [
							{ label: 'Primary', value: 'btn btn-primary' },
							{ label: 'Secundary', value: 'btn btn-secundary' },
						] }
						onChange={ ( newBtnStyle ) => setAttributes( {btnStyle: newBtnStyle} ) }
					/>
					</div>
				</PanelBody>
			</InspectorControls>
			<div className={ contentClasses }>
				{ mediaId != 0 &&
				<img src={ mediaUrl } alt={ altText } />
				}
				<RichText
					tagName="span" // The tag here is the element output and editable in the admin
					value={ title } // Any existing content, either from the database or an attribute default
					allowedFormats={ [ 'core/bold', 'core/italic' ] } // Allow the content to be made bold or italic, but do not allow other formatting options
					onChange={ ( title ) => setAttributes( { title: title } ) } // Store updated content as a block attribute
					placeholder={ __( 'Heading...' ) } // Display this text before any content has been added by the user
					style={ titleStyle }
				/>

				<div>
				<span>{ currency }</span>
				<RichText
					tagName="p" // The tag here is the element output and editable in the admin
					value={ price } // Any existing content, either from the database or an attribute default
					allowedFormats={ [] } // Allow the content to be made bold or italic, but do not allow other formatting options
					onChange={ ( price ) => setAttributes( { price: price } ) } // Store updated content as a block attribute
					placeholder={ __( 'Price...' ) } // Display this text before any content has been added by the user
					style={ currencyStyle }
				/>
				</div>
				
                
                <InnerBlocks allowedBlocks={ [ 'core/paragraph', 'core/heading', 'core/list' ] } />
                { url && <a href={ url } className={ btnStyle } role="button">{ btnText }</a> }
			</div>
		</div>
	);
}

export default ColumnEdit;