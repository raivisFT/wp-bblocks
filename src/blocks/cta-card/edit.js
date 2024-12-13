const {__experimentalLinkControl: LinkControl, InspectorControls, MediaUpload, MediaUploadCheck, RichText, InnerBlocks} = wp.blockEditor;
const { PanelBody, Button, ResponsiveWrapper, SelectControl, ColorPalette, TextControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

const BlockEdit = (props) => {
	const { attributes, setAttributes } = props;
	const { titleColor, mediaUrl, columnAlign, url, linkTarget, altText, btnText, btnOnOff } = attributes;

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

	return (
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
							label="Align"
							value={ columnAlign }
							options={ [
								{ label: 'Left', value: 'text-left' },
								{ label: 'Centre', value: 'text-center' },
							] }
							onChange={ ( newAlign ) => setAttributes( {columnAlign: newAlign} ) }
						/>
						<TextControl
							label="Btn Text"
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
					</div>
				</PanelBody>
			</InspectorControls>
			<section>
				<div className="img-box"><img src={ mediaUrl } alt={ altText } className={ 'card-img' } /></div>
				<div className='desc'>
					<RichText
						tagName="strong" // The tag here is the element output and editable in the admin
						value={ attributes.cardTitle } // Any existing content, either from the database or an attribute default
						allowedFormats={ [ 'core/bold', 'core/italic' ] } // Allow the content to be made bold or italic, but do not allow other formatting options
						onChange={ ( cardTitle ) => props.setAttributes( { cardTitle: cardTitle } ) } // Store updated content as a block attribute
						placeholder={ __( 'Heading...' ) } // Display this text before any content has been added by the user
						style={titleStyle}
						className={'h3'}				
					/>
					<InnerBlocks allowedBlocks={ [ 'core/paragraph', 'core/list' ] } />
					<a href={ url } className={ btnOnOff }>{ btnText }</a>
				</div>
				<a href={ url } target={ linkTarget } className='faux-link__overlay-link' rel='noopener'></a>
			</section>
		</Fragment>
	);
};
export default BlockEdit;