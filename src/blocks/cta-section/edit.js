const {__experimentalLinkControl: LinkControl, InspectorControls, MediaUpload, MediaUploadCheck, InnerBlocks} = wp.blockEditor;
const { PanelBody, Button, ResponsiveWrapper, SelectControl, TextControl, ColorPalette } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;


const BlockEdit = (props) => {
	const { attributes, setAttributes } = props;
	const { mediaUrl, url, ctaBrdRd, srcBrdRd, swapCol, contDiv, bgColor, altText, btnText, btnOnOff } = attributes;

	const colors = [
		{ name: 'white', color: '#ffffff' },
		{ name: 'black', color: '#000000' },
	];

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
						<hr />
						<TextControl
							label="Img border-radius px"
							value={ srcBrdRd }
							type="string"
							min={ 0 }
							// isPressEnterToChange
							onChange={ ( newSrcBrdRd ) => setAttributes({ srcBrdRd: newSrcBrdRd }) }
						/>
					</div>
					<hr />
					<SelectControl
						label="Add/Remove Container"
						value={ contDiv }
						options={ [
							{ label: 'Add container', value: 'container' },
							{ label: 'Remove container', value: '' },
						] }
						onChange={ ( newContainerDiv ) => setAttributes( { contDiv: newContainerDiv } ) }
					/>
					<hr />
					<TextControl
						label="CTA border-radius px"
						value={ ctaBrdRd }
						type="string"
						min={ 0 }
						// isPressEnterToChange
						onChange={ ( newCtaBrdRd ) => setAttributes({ ctaBrdRd: newCtaBrdRd }) }
					/>
					<hr />
					<SelectControl
						label="Swap Columns Left/Right"
						value={ swapCol }
						options={ [
							{ label: 'Left', value: 'order-0' },
							{ label: 'Right', value: 'order-1' },
						] }
						onChange={ ( newSwapCol ) => setAttributes( { swapCol: newSwapCol } ) }
					/>
					<hr />
					<h3>CTA Background Color</h3>
					<ColorPalette
							label="Background Colour"
							colors={ colors }
							value={ bgColor }
							enableAlpha
							onChange={ ( colors ) => setAttributes( { bgColor: colors } ) }
						/>
					<hr />
					<h3>CTA Link URL</h3>
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
					<div>
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
				<div className={ contDiv } style={{ backgroundColor: bgColor, borderRadius: + ctaBrdRd + 'px' }}>
					<div className="row">
						<div className={"col-xl-6 col-md-6 col-12" + swapCol }>

							<div className='desc'>
								<InnerBlocks allowedBlocks={ [ 'core/paragraph', 'core/heading', 'core/list' ] } />
								<a href={ url } className={ btnOnOff }>{ btnText }</a>
							</div>

						</div>
						<div className="col-xl-6 col-md-6 col-12">
							
							<div className="img-box">
								<img src={ mediaUrl } alt={ altText } className={ 'card-img' } style={{ 'border-radius': + srcBrdRd + 'px' }} />
							</div>

						</div>
					</div>
				</div>
			</section>
		</Fragment>
	)
}
export default BlockEdit;