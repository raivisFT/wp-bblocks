import {useBlockEditContext} from "@wordpress/block-editor";

const {__experimentalLinkControl: LinkControl, InspectorControls, MediaUpload, MediaUploadCheck, RichText, InnerBlocks} = wp.blockEditor;
const { PanelBody, Button, ResponsiveWrapper, SelectControl, ColorPalette, TextControl, ToggleControl } = wp.components;
const { Fragment } = wp.element;
const { useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

const BlockEdit = (props) => {
	const { attributes, setAttributes } = props;
	const { titleColor, mediaUrl, columnAlign, url, linkTarget, altText, btnText, btnOnOff, tagH, tagHclass, imgOrgProp, contentOrgProp, titleOrgProp, priceOrgProp, isSchema } = attributes;

	const colors = [
		{ name: 'white', color: '#ffffff' },
		{ name: 'black', color: '#000000' },
	];

	const titleStyle = {
		color: titleColor
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

	const schemaProp = "https://schema.org/Product";

	const blockProps = useBlockProps({
		className: columnAlign ? `align-${ columnAlign }` : undefined,
	});

	const { isPreview } = useBlockEditContext();

	// If rendering preview in block inserter
	if (isPreview) {
		return (
			<div { ...blockProps } style={{ border: '1px solid black', padding: '1rem', maxWidth: '220px' }}>
				{ attributes.mediaUrl && (
					<img
						src={ attributes.mediaUrl }
						alt={ attributes.altText || 'Preview Image' }
						style={{ width: '200px', display: 'block', marginBottom: '1rem' }}
					/>
				)}
				{ attributes.cardTitle && (
					<RichText.Content
						tagName={ attributes.tagH || 'strong' }
						className={ attributes.tagHclass || 'h3' }
						value={ attributes.cardTitle }
						style={{ color: attributes.titleColor || 'black', marginBottom: '0.5rem' }}
					/>
				)}
				{ attributes.content && (
					<RichText.Content
						tagName="p"
						value={ attributes.content }
						style={{ marginBottom: '0.5rem' }}
					/>
				)}
				{ attributes.btnOnOff === 'btnon' && attributes.btnText && (
					<a href={ attributes.url || '#' } target={ attributes.linkTarget } rel="noopener noreferrer" className="btn btn-primary">
						{ attributes.btnText }
					</a>
				)}
			</div>
		);
	}


	return (
		<div { ...blockProps }>
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Block Options', 'WP')} initialOpen={ true } >
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
					<h3>Card Link URL</h3>
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
					<SelectControl
						label="Open in New Tab"
						value={ linkTarget }
						options={ [
							{ label: 'No', value: '_self' },
							{ label: 'Yes', value: '_blank' },
						] }
						onChange={ ( newTarget ) => setAttributes( { linkTarget: newTarget } ) }
					/>
					<hr />
					<div>
						<h3>H3 Title Color</h3>
						<ColorPalette
							label="Title Colour"
							colors={ colors }
							value={ titleColor }
							enableAlpha
							onChange={ ( colors ) => setAttributes( { titleColor: colors } ) }
						/>
						<SelectControl
							label="Text Align"
							value={ columnAlign }
							options={ [
								{ label: 'Left', value: 'text-left' },
								{ label: 'Centre', value: 'text-center' },
								{ label: 'Right', value: 'text-right' },
							] }
							onChange={ ( newAlign ) => setAttributes( {columnAlign: newAlign} ) }
						/>
						<TextControl
							label="Button Text"
							value={ btnText }
							onChange={ ( btnText ) => setAttributes( { btnText } ) }
						/>
						<SelectControl
							label="Read more button"
							value={ btnOnOff }
							options={ [
								{ label: 'Yes', value: 'btnon btn btn-more' },
								{ label: 'No', value: 'btnoff' },
							] }
							onChange={ ( newBtnMore ) => setAttributes( {btnOnOff: newBtnMore} ) }
						/>
						<SelectControl
							label="Select Heading size/tag"
							value={ tagH }
							options={ [
								{ label: 'strong', value: 'strong' },
								{ label: 'span', value: 'span' },
								{ label: 'p', value: 'p' },
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
				</PanelBody>

				<PanelBody
					title={__('Developer Settings', 'WP')}
					initialOpen={false}
					className="block-editor-block-advanced-panel"
				>
					<div>
						<SelectControl
							label="Override Heading Style"
							value={ tagHclass }
							options={ [
								{ label: 'h3', value: 'h3' },
								{ label: 'h2', value: 'h2' },
								{ label: 'h1', value: 'h1' },
								{ label: 'h1ex', value: 'h1ex' },
								{ label: 'h4', value: 'h4' },
								{ label: 'h5', value: 'h5' },
								{ label: 'h6', value: 'h6' },
							] }
							onChange={ ( newTagHclass ) => setAttributes( {tagHclass: newTagHclass} ) }
						/>
						<ToggleControl
							label="Schema section"
							help={
								isSchema
									? 'Is Schema'
									: 'Not Schema'
							}
							checked={ isSchema }
							onChange={ () => setAttributes( {  isSchema: ! isSchema } ) }
						/>
						{ isSchema && <TextControl label="Schema.org IMG Prop" value={ imgOrgProp } onChange={ ( imgOrgProp ) => setAttributes( { imgOrgProp } ) } /> }
						{ isSchema && <TextControl label="Schema.org Content Prop" value={ contentOrgProp } onChange={ ( contentOrgProp ) => setAttributes( { contentOrgProp } ) } /> }
						{ isSchema && <TextControl label="Schema.org Title Prop" value={ titleOrgProp } onChange={ ( titleOrgProp ) => setAttributes( { titleOrgProp } ) } /> }
					</div>
				</PanelBody>
			</InspectorControls>
			<section itemscope={isSchema && '' } itemtype={isSchema && schemaProp }>
				<div className="img-box"><img src={ mediaUrl } alt={ altText } className={ 'card-img' } itemprop={ isSchema && imgOrgProp } /></div>
				<div className='desc' itemprop={ contentOrgProp }>
					<RichText
						tagName={ tagH } // The tag here is the element output and editable in the admin
						value={ attributes.cardTitle } // Any existing content, either from the database or an attribute default
						allowedFormats={ [ 'core/bold', 'core/italic' ] } // Allow the content to be made bold or italic, but do not allow other formatting options
						onChange={ ( cardTitle ) => props.setAttributes( { cardTitle: cardTitle } ) } // Store updated content as a block attribute
						placeholder={ __( 'Heading...' ) } // Display this text before any content has been added by the user
						itemprop = { isSchema && titleOrgProp }
						style={titleStyle}
						className={ tagHclass }
					/>
					<InnerBlocks allowedBlocks={ [ 'core/heading', 'core/paragraph', 'core/list' ] } />
					<a href={ url } className={ btnOnOff }>{ btnText }</a>
				</div>
				<a href={ url } target={ linkTarget } className='faux-link__overlay-link' rel='noopener'></a>
			</section>
		</Fragment>
		</div>
	);
};
export default BlockEdit;