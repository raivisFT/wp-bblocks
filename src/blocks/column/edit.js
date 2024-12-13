/**
 * External dependencies
 */
import classnames from 'classnames';
import './editor.scss';

/**
 * WordPress dependencies
 */
import { InspectorControls,	MediaUpload, MediaUploadCheck, InnerBlocks,	useBlockProps, useInnerBlocksProps as __stableUseInnerBlocksProps, __experimentalUseInnerBlocksProps, __experimentalBlockVariationPicker, store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { sprintf, __ } from '@wordpress/i18n';
import { __experimentalInputControl as InputControl, PanelBody,	SelectControl, ColorPalette, Button, RangeControl, ToggleControl } from '@wordpress/components';

function ColumnEdit( {
	attributes,
	setAttributes,
	clientId,
} ) {

	const { bgAttach, bgStyle, overColor, mediaUrl, contentAlign, verticalAlignment, width, allHidden, xlHidden, lgHidden, mdHidden, smHidden, colOffsetMain, colOffsetXL, colOffsetLG, colOffsetMD, colOffsetSM, colOrderMain, colOrderXL, colOrderLG, colOrderMD, colOrderSM, templateLock, verticalAlign, sizeSmallLaptop, sizeLargeTablet, sizeTablet, sizeMob, topPadding, rightPadding, bottomPadding, leftPadding, topPaddingXD, rightPaddingXD, bottomPaddingXD, leftPaddingXD, topPaddingLG, rightPaddingLG, bottomPaddingLG, leftPaddingLG, topPaddingMD, rightPaddingMD, bottomPaddingMD, leftPaddingMD, topPaddingSM, rightPaddingSM, bottomPaddingSM, leftPaddingSM, colBRadius = false } = attributes;
	
	const useInnerBlocksProps = __stableUseInnerBlocksProps ? __stableUseInnerBlocksProps : __experimentalUseInnerBlocksProps;

	const classes = classnames( 'block-core-columns', {
		[ `is-vertically-aligned-${ verticalAlignment }` ]: verticalAlignment,
		[ `${ verticalAlign }` ]: verticalAlign,
	} );

	const { columnsIds, hasChildBlocks, rootClientId } = useSelect(
		( select ) => {
			const { getBlockOrder, getBlockRootClientId } = select(
				blockEditorStore
			);

			const rootId = getBlockRootClientId( clientId );

			return {
				hasChildBlocks: getBlockOrder( clientId ).length > 0,
				rootClientId: rootId,
				columnsIds: getBlockOrder( rootId ),
			};
		},
		[ clientId ]
	);

	const { updateBlockAttributes } = useDispatch( blockEditorStore );

	const widthWithUnit = Number.isFinite( width ) ? width + '%' : width;
	const blockProps = useBlockProps( {
		attributes,
		className: classes,
		style: widthWithUnit ? { flexBasis: widthWithUnit } : undefined,
	} );

	const columnsCount = columnsIds.length;
	const currentColumnPosition = columnsIds.indexOf( clientId ) + 1;

	const innerBlocksProps = useInnerBlocksProps(
		{ ...blockProps },
		{
			templateLock,
			renderAppender: hasChildBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);

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
	
	const colors = [
		{ name: 'white', color: '#FFFFFF' },
		{ name: 'black', color: '#000000' },
		{ name: 'grey', color: '#999999' },
		{ name: 'blue', color: '#29478F' },		
		{ name: 'red', color: '#CC1818' },
		{ name: 'yellow', color: '#FFF300' },
	];

	return (
		<>
			<InspectorControls>
				<PanelBody title={'Background'} initialOpen={ false }>
					<ToggleControl
						label="Fixed Background"
						help={
							bgAttach
								? 'fixed'
								: 'Not fixed background'
						}
						checked={ bgAttach }
						onChange={ () => setAttributes( {  bgAttach: !bgAttach} ) }
					/>
				 	<h3>Background Color</h3>
					<ColorPalette
						label="Section Background Color"
						colors={ colors }
						value={ bgStyle }
						enableAlpha
						onChange={ ( color ) => setAttributes( { bgStyle: color } ) }
					/>
					<h3>Overlay Colour</h3>
					<ColorPalette
						label="Section Overlay Colour"
						colors={ colors }
						value={ overColor }
						enableAlpha
						onChange={ ( color ) => setAttributes( { overColor: color } ) }
					/>
				 	<div className="editor-post-featured-image">
					 	<h3>Section Background Image</h3>
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
										{blockProps.media != undefined &&
											<ResponsiveWrapper
												naturalWidth={ blockProps.media.media_details.width }
												naturalHeight={ blockProps.media.media_details.height }
											>
												<img src={blockProps.media.source_url} />
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
					</div>
				</PanelBody>
				<PanelBody title={'Alignment'} initialOpen={ false }>
					<SelectControl
						label="Horizontal Text Alignment"
						value={ contentAlign }
						options={ [
							{ label: 'left', value: 'text-left' },
							{ label: 'center', value: 'text-center' },
							{ label: 'right', value: 'text-right' }
						] }
						onChange={ ( newStyle ) => setAttributes( {contentAlign: newStyle} ) }
					/>
					<SelectControl
						label="Vertical Alignment"
						value={ verticalAlign }
						options={ [
							{ label: 'start', value: 'align-self-start' },
							{ label: 'middle', value: 'align-self-center' },
							{ label: 'end', value: 'align-self-end' }
						] }
						onChange={ ( newStyle ) => setAttributes( {verticalAlign: newStyle} ) }
					/>
					<SelectControl
						label="Float Content"
						value={ contentAlign }
						options={ [
							{ label: 'none', value: 'float-none' },
							{ label: 'left', value: 'float-left' },
							{ label: 'right', value: 'float-right' }
							
						] }
						onChange={ ( newStyle ) => setAttributes( {contentAlign: newStyle} ) }
					/>
				</PanelBody>
				<PanelBody title={'Columns (per row)'} initialOpen={ false }>
					<SelectControl
						label="Size Small Laptop up (col-xl-*)"
						value={ sizeSmallLaptop }
						options={ [
							{ label: 'none', value: '' },
							{ label: '1', value: 'col-xl-1' },
							{ label: '2', value: 'col-xl-2' },
							{ label: '3 - 25%', value: 'col-xl-3' },
							{ label: '4 - 33.33%', value: 'col-xl-4' },
							{ label: '5', value: 'col-xl-5' },
							{ label: '6 - 50%', value: 'col-xl-6' },
							{ label: '7', value: 'col-xl-7' },
							{ label: '8', value: 'col-xl-8' },
							{ label: '9', value: 'col-xl-9' },
							{ label: '10', value: 'col-xl-10' },
							{ label: '11', value: 'col-xl-11' },
							{ label: '12 - 100%', value: 'col-xl-12' }
						] }
						onChange={ ( newStyle ) => setAttributes( {sizeSmallLaptop: newStyle} ) }
					/>
					<SelectControl
						label="Size Large Tablet up (col-lg-*)"
						value={ sizeLargeTablet }
						options={ [
							{ label: 'none', value: '' },
							{ label: '1', value: 'col-lg-1' },
							{ label: '2', value: 'col-lg-2' },
							{ label: '3 - 25%', value: 'col-lg-3' },
							{ label: '4 - 33.33%', value: 'col-lg-4' },
							{ label: '5', value: 'col-lg-5' },
							{ label: '6 - 50%', value: 'col-lg-6' },
							{ label: '7', value: 'col-lg-7' },
							{ label: '8', value: 'col-lg-8' },
							{ label: '9', value: 'col-lg-9' },
							{ label: '10', value: 'col-lg-10' },
							{ label: '11', value: 'col-lg-11' },
							{ label: '12 - 100%', value: 'col-lg-12' }
						] }
						onChange={ ( newStyle ) => setAttributes( {sizeLargeTablet: newStyle} ) }
					/>
					<SelectControl
						label="Size Tablet up (col-md-*)"
						value={ sizeTablet }
						options={ [
							{ label: 'none', value: '' },
							{ label: '1', value: 'col-md-1' },
							{ label: '2', value: 'col-md-2' },
							{ label: '3 - 25%', value: 'col-md-3' },
							{ label: '4 - 33.33%', value: 'col-md-4' },
							{ label: '5', value: 'col-md-5' },
							{ label: '6 - 50%', value: 'col-md-6' },
							{ label: '7', value: 'col-md-7' },
							{ label: '8', value: 'col-md-8' },
							{ label: '9', value: 'col-md-9' },
							{ label: '10', value: 'col-md-10' },
							{ label: '11', value: 'col-md-11' },
							{ label: '12 - 100%', value: 'col-md-12' }
						] }
						onChange={ ( newStyle ) => setAttributes( {sizeTablet: newStyle} ) }
					/>
					<SelectControl
						label="Size Mobile up (col-sm-*)"
						value={ sizeMob }
						options={ [
							{ label: 'none', value: '' },
							{ label: '1', value: 'col-sm-1' },
							{ label: '2', value: 'col-sm-2' },
							{ label: '3  - 25%', value: 'col-sm-3' },
							{ label: '4  - 33.33%', value: 'col-sm-4' },
							{ label: '5', value: 'col-sm-5' },
							{ label: '6 - 50%', value: 'col-sm-6' },
							{ label: '7', value: 'col-sm-7' },
							{ label: '8', value: 'col-sm-8' },
							{ label: '9', value: 'col-sm-9' },
							{ label: '10', value: 'col-sm-10' },
							{ label: '11', value: 'col-sm-11' },
							{ label: '12 - 100%', value: 'col-sm-12' }
						] }
						onChange={ ( newStyle ) => setAttributes( {sizeMob: newStyle} ) }
					/>
				</PanelBody>
				<PanelBody title={'Display / Offset / Order'} initialOpen={ false }>
					<div style={{ "display":"inline-flex","margin-bottom":"-15px" }}>
						<div style={{ "width":"20%", "display":"flex", "padding-top":"25px" }}>ALL</div>
						<div style={{ "width":"35%", "display":"flex", "padding-top":"25px" }}>
							<ToggleControl
								label=""
								help={
									allHidden
										? 'Hidden'
										: 'Visible'
								}
								checked={ allHidden }
								onChange={ () => setAttributes( {  allHidden: !allHidden } ) }
							/>
						</div>
						<div style={{ "width":"70px","display":"flex","max-height": "58px","padding-right":"2%" }}>
							<SelectControl
								label="Offset"
								value={ colOffsetMain }
								options={ [
									{ label: '0', value: '' },
									{ label: '1', value: 'offset-1' },
									{ label: '2', value: 'offset-2' },
									{ label: '3', value: 'offset-3' },
									{ label: '4', value: 'offset-4' },
									{ label: '5', value: 'offset-5' },
									{ label: '6', value: 'offset-6' },
									{ label: '7', value: 'offset-7' },
									{ label: '8', value: 'offset-8' },
									{ label: '9', value: 'offset-9' },
									{ label: '10', value: 'offset-10' },
									{ label: '11', value: 'offset-11' },
									{ label: '12', value: 'offset-12' }
								] }
								onChange={ ( newStyle ) => setAttributes( {colOffsetMain: newStyle} ) }
							/>
						</div>
						<div style={{ "width":"70px","display":"flex","max-height": "58px" }}>
							<SelectControl
								label="Order"
								value={ colOrderMain }
								options={ [
									{ label: '0', value: '' },
									{ label: '1', value: 'order-1' },
									{ label: '2', value: 'order-2' },
									{ label: '3', value: 'order-3' },
									{ label: '4', value: 'order-4' },
									{ label: '5', value: 'order-5' },
									{ label: '6', value: 'order-6' },
									{ label: '7', value: 'order-7' },
									{ label: '8', value: 'order-8' },
									{ label: '9', value: 'order-9' },
									{ label: '10', value: 'order-10' },
									{ label: '11', value: 'order-11' },
									{ label: '12', value: 'order-12' }
								] }
								onChange={ ( newStyle ) => setAttributes( {colOrderMain: newStyle} ) }
							/>
						</div>
					</div>
					<div style={{ "display":"inline-flex","margin-bottom":"-15px" }}>
						<div style={{ "width":"20%", "display":"flex", "padding-top":"25px" }}>XL</div>
						<div style={{ "width":"35%", "display":"flex", "padding-top":"25px" }}>
							<ToggleControl
								label=""
								help={
									xlHidden
										? 'Hidden'
										: 'Visible'
								}
								checked={ xlHidden }
								onChange={ () => setAttributes( {  xlHidden: !xlHidden } ) }
							/>
						</div>
						<div style={{ "width":"70px", "display":"flex","max-height": "58px", "padding-right":"2%" }}>
							<SelectControl
								label="Offset"
								value={ colOffsetXL }
								options={ [
									{ label: '0', value: '' },
									{ label: '1', value: 'offset-xl-1' },
									{ label: '2', value: 'offset-xl-2' },
									{ label: '3', value: 'offset-xl-3' },
									{ label: '4', value: 'offset-xl-4' },
									{ label: '5', value: 'offset-xl-5' },
									{ label: '6', value: 'offset-xl-6' },
									{ label: '7', value: 'offset-xl-7' },
									{ label: '8', value: 'offset-xl-8' },
									{ label: '9', value: 'offset-xl-9' },
									{ label: '10', value: 'offset-xl-10' },
									{ label: '11', value: 'offset-xl-11' },
									{ label: '12', value: 'offset-xl-12' }
								] }
								onChange={ ( newStyle ) => setAttributes( {colOffsetXL: newStyle} ) }
							/>
						</div>
						<div style={{ "width":"70px", "display":"flex","max-height": "58px" }}>
							<SelectControl
								label="Order"
								value={ colOrderXL }
								options={ [
									{ label: '0', value: '' },
									{ label: '1', value: 'order-xl-1' },
									{ label: '2', value: 'order-xl-2' },
									{ label: '3', value: 'order-xl-3' },
									{ label: '4', value: 'order-xl-4' },
									{ label: '5', value: 'order-xl-5' },
									{ label: '6', value: 'order-xl-6' },
									{ label: '7', value: 'order-xl-7' },
									{ label: '8', value: 'order-xl-8' },
									{ label: '9', value: 'order-xl-9' },
									{ label: '10', value: 'order-xl-10' },
									{ label: '11', value: 'order-xl-11' },
									{ label: '12', value: 'order-xl-12' }
								] }
								onChange={ ( newStyle ) => setAttributes( {colOrderXL: newStyle} ) }
							/>
						</div>
					</div>				
					<div style={{ "display":"inline-flex","margin-bottom":"-15px" }}>
						<div style={{ "width":"20%", "display":"flex", "padding-top":"25px" }}>LG</div>
						<div style={{ "width":"35%", "display":"flex", "padding-top":"25px" }}>
							<ToggleControl
								label=""
								help={
									lgHidden
										? 'Hidden'
										: 'Visible'
								}
								checked={ lgHidden }
								onChange={ () => setAttributes( {  lgHidden: !lgHidden } ) }
							/>
						</div>
						<div style={{ "width":"70px", "display":"flex","max-height": "58px", "padding-right":"2%" }}>
							<SelectControl
								label="Offset"
								value={ colOffsetLG }
								options={ [
									{ label: '0', value: '' },
									{ label: '1', value: 'offset-lg-1' },
									{ label: '2', value: 'offset-lg-2' },
									{ label: '3', value: 'offset-lg-3' },
									{ label: '4', value: 'offset-lg-4' },
									{ label: '5', value: 'offset-lg-5' },
									{ label: '6', value: 'offset-lg-6' },
									{ label: '7', value: 'offset-lg-7' },
									{ label: '8', value: 'offset-lg-8' },
									{ label: '9', value: 'offset-lg-9' },
									{ label: '10', value: 'offset-lg-10' },
									{ label: '11', value: 'offset-lg-11' },
									{ label: '12', value: 'offset-lg-12' }
								] }
								onChange={ ( newStyle ) => setAttributes( {colOffsetLG: newStyle} ) }
							/>
						</div>
						<div style={{ "width":"70px", "display":"flex","max-height": "58px" }}>
							<SelectControl
								label="Order"
								value={ colOrderLG }
								options={ [
									{ label: '0', value: '' },
									{ label: '1', value: 'order-lg-1' },
									{ label: '2', value: 'order-lg-2' },
									{ label: '3', value: 'order-lg-3' },
									{ label: '4', value: 'order-lg-4' },
									{ label: '5', value: 'order-lg-5' },
									{ label: '6', value: 'order-lg-6' },
									{ label: '7', value: 'order-lg-7' },
									{ label: '8', value: 'order-lg-8' },
									{ label: '9', value: 'order-lg-9' },
									{ label: '10', value: 'order-lg-10' },
									{ label: '11', value: 'order-lg-11' },
									{ label: '12', value: 'order-lg-12' }
								] }
								onChange={ ( newStyle ) => setAttributes( {colOrderLG: newStyle} ) }
							/>
						</div>
					</div>
					<div style={{ "display":"inline-flex","margin-bottom":"-15px" }}>
					<div style={{ "width":"20%", "display":"flex", "padding-top":"25px" }}>MD</div>
						<div style={{ "width":"35%", "display":"flex", "padding-top":"25px" }}>
							<ToggleControl
								label=""
								help={
									mdHidden
										? 'Hidden'
										: 'Visible'
								}
								checked={ mdHidden }
								onChange={ () => setAttributes( {  mdHidden: !mdHidden } ) }
							/>
						</div>
						<div style={{ "width":"70px", "display":"flex","max-height": "58px", "padding-right":"2%" }}>
							<SelectControl
								label="Offset"
								value={ colOffsetMD }
								options={ [
									{ label: '0', value: '' },
									{ label: '1', value: 'offset-md-1' },
									{ label: '2', value: 'offset-md-2' },
									{ label: '3', value: 'offset-md-3' },
									{ label: '4', value: 'offset-md-4' },
									{ label: '5', value: 'offset-md-5' },
									{ label: '6', value: 'offset-md-6' },
									{ label: '7', value: 'offset-md-7' },+
									{ label: '8', value: 'offset-md-8' },
									{ label: '9', value: 'offset-md-9' },
									{ label: '10', value: 'offset-md-10' },
									{ label: '11', value: 'offset-md-11' },
									{ label: '12', value: 'offset-md-12' }
								] }
								onChange={ ( newStyle ) => setAttributes( {colOffsetMD: newStyle} ) }
							/>
						</div>
						<div style={{ "width":"70px", "display":"flex","max-height": "58px" }}>
							<SelectControl
								label="Order"
								value={ colOrderMD }
								options={ [
									{ label: '0', value: '' },
									{ label: '1', value: 'order-md-1' },
									{ label: '2', value: 'order-md-2' },
									{ label: '3', value: 'order-md-3' },
									{ label: '4', value: 'order-md-4' },
									{ label: '5', value: 'order-md-5' },
									{ label: '6', value: 'order-md-6' },
									{ label: '7', value: 'order-md-7' },
									{ label: '8', value: 'order-md-8' },
									{ label: '9', value: 'order-md-9' },
									{ label: '10', value: 'order-md-10' },
									{ label: '11', value: 'order-md-11' },
									{ label: '12', value: 'order-md-12' }
								] }
								onChange={ ( newStyle ) => setAttributes( {colOrderMD: newStyle} ) }
							/>
						</div>
					</div>
					<div style={{ "display":"inline-flex","margin-bottom":"-15px" }}>
					<div style={{ "width":"20%", "display":"flex", "padding-top":"25px" }}>SM</div>
						<div style={{ "width":"35%", "display":"flex", "padding-top":"25px" }}>
							<ToggleControl
								label=""
								help={
									smHidden
										? 'Hidden'
										: 'Visible'
								}
								checked={ smHidden }
								onChange={ () => setAttributes( {  smHidden: !smHidden } ) }
							/>
						</div>
						<div style={{ "width":"70px", "display":"flex","max-height": "58px", "padding-right":"2%" }}>
							<SelectControl
								label="Offset"
								value={ colOffsetSM }
								options={ [
									{ label: '0', value: '' },
									{ label: '1', value: 'offset-sm-1' },
									{ label: '2', value: 'offset-sm-2' },
									{ label: '3', value: 'offset-sm-3' },
									{ label: '4', value: 'offset-sm-4' },
									{ label: '5', value: 'offset-sm-5' },
									{ label: '6', value: 'offset-sm-6' },
									{ label: '7', value: 'offset-sm-7' },
									{ label: '8', value: 'offset-sm-8' },
									{ label: '9', value: 'offset-sm-9' },
									{ label: '10', value: 'offset-sm-10' },
									{ label: '11', value: 'offset-sm-11' },
									{ label: '12', value: 'offset-sm-12' }
								] }
								onChange={ ( newStyle ) => setAttributes( {colOffsetSM: newStyle} ) }
							/>
						</div>
						<div style={{ "width":"70px", "display":"flex","max-height": "58px" }}>
							<SelectControl
								label="Order"
								value={ colOrderSM }
								options={ [
									{ label: '0', value: '' },
									{ label: '1', value: 'order-sm-1' },
									{ label: '2', value: 'order-sm-2' },
									{ label: '3', value: 'order-sm-3' },
									{ label: '4', value: 'order-sm-4' },
									{ label: '5', value: 'order-sm-5' },
									{ label: '6', value: 'order-sm-6' },
									{ label: '7', value: 'order-sm-7' },
									{ label: '8', value: 'order-sm-8' },
									{ label: '9', value: 'order-sm-9' },
									{ label: '10', value: 'order-sm-10' },
									{ label: '11', value: 'order-sm-11' },
									{ label: '12', value: 'order-sm-12' }
								] }
								onChange={ ( newStyle ) => setAttributes( {colOrderSM: newStyle} ) }
							/>
						</div>
					</div>
				</PanelBody>
				<PanelBody title={'Paddings (col)'} initialOpen={ false }>
					<div style={{ "display":"inline-flex","margin-bottom":"15px" }}>
						<div style={{ "width":"20%", "display":"flex", "padding-top":"25px" }}>ALL</div>
						<div style={{ "width":"20%","display":"flex","max-height": "58px","padding-right":"2%" }}>
							<InputControl
								label="&uArr; px"
								labelPosition="top"
								labelAlign="center"
								style={{ "color":"grey","text-align":"center" }}
								value={ topPadding }
								type="number"
								min={ 0 }
								max={ 250 }
								isPressEnterToChange
								onChange={ ( newStyle ) => setAttributes( {topPadding: newStyle} ) }
							/>
						</div>
						<div style={{ "width":"20%","display":"flex","max-height": "58px","padding-right":"2%" }}>
							<InputControl
								label="&rArr; px"
								labelPosition="top"
								labelAlign="center"
								style={{ "color":"grey","text-align":"center" }}
								value={ rightPadding }
								type="number"
								min={ 0 }
								max={ 250 }
								isPressEnterToChange
								onChange={ ( newStyle ) => setAttributes( {rightPadding: newStyle} ) }
							/>
						</div>
						<div style={{ "width":"20%","display":"flex","max-height": "58px","padding-right":"2%" }}>
							<InputControl
								label="&dArr; px"
								labelPosition="top"
								labelAlign="center"
								style={{ "color":"grey","text-align":"center" }}
								value={ bottomPadding }
								type="number"
								min={ 0 }
								max={ 250 }
								isPressEnterToChange
								onChange={ ( newStyle ) => setAttributes( {bottomPadding: newStyle} ) }
							/>
						</div>
						<div style={{ "width":"20%","display":"flex","max-height": "58px" }}>
							<InputControl
								label="&lArr; px"
								labelPosition="top"
								labelAlign="center"
								style={{ "color":"grey","text-align":"center" }}
								value={ leftPadding }
								type="number"
								min={ 0 }
								max={ 250 }
								isPressEnterToChange
								onChange={ ( newStyle ) => setAttributes( {leftPadding: newStyle} ) }
							/>
						</div>
					</div>
					<div style={{ "display":"inline-flex","margin-bottom":"15px" }}>
						<div style={{ "width":"20%", "display":"flex", "padding-top":"25px" }}>XL</div>
						<div style={{ "width":"20%","display":"flex","max-height": "58px","padding-right":"2%" }}>
							<InputControl
								label="&uArr; px"
								labelPosition="top"
								labelAlign="center"
								style={{ "color":"grey","text-align":"center" }}
								value={ topPaddingXD }
								type="number"
								min={ 0 }
								max={ 250 }
								isPressEnterToChange
								onChange={ ( newStyle ) => setAttributes( {topPaddingXL: newStyle} ) }
							/>
						</div>
						<div style={{ "width":"20%","display":"flex","max-height": "58px","padding-right":"2%" }}>
							<InputControl
								label="&rArr; px"
								labelPosition="top"
								labelAlign="center"
								style={{ "color":"grey","text-align":"center" }}
								value={ rightPaddingXD }
								type="number"
								min={ 0 }
								max={ 250 }
								isPressEnterToChange
								onChange={ ( newStyle ) => setAttributes( {rightPaddingXL: newStyle} ) }
							/>
						</div>
						<div style={{ "width":"20%","display":"flex","max-height": "58px","padding-right":"2%" }}>
							<InputControl
								label="&dArr; px"
								labelPosition="top"
								labelAlign="center"
								style={{ "color":"grey","text-align":"center" }}
								value={ bottomPaddingXD }
								type="number"
								min={ 0 }
								max={ 250 }
								isPressEnterToChange
								onChange={ ( newStyle ) => setAttributes( {bottomPaddingXL: newStyle} ) }
							/>
						</div>
						<div style={{ "width":"20%","display":"flex","max-height": "58px" }}>
							<InputControl
								label="&lArr; px"
								labelPosition="top"
								labelAlign="center"
								style={{ "color":"grey","text-align":"center" }}
								value={ leftPaddingXD }
								type="number"
								min={ 0 }
								max={ 250 }
								isPressEnterToChange
								onChange={ ( newStyle ) => setAttributes( {leftPaddingXL: newStyle} ) }
							/>
						</div>
					</div>
					<div style={{ "display":"inline-flex","margin-bottom":"15px" }}>
						<div style={{ "width":"20%", "display":"flex", "padding-top":"25px" }}>LG</div>
						<div style={{ "width":"20%","display":"flex","max-height": "58px","padding-right":"2%" }}>
							<InputControl
								label="&uArr; px"
								labelPosition="top"
								labelAlign="center"
								style={{ "color":"grey","text-align":"center" }}
								value={ topPaddingLG }
								type="number"
								min={ 0 }
								max={ 250 }
								isPressEnterToChange
								onChange={ ( newStyle ) => setAttributes( {topPaddingLG: newStyle} ) }
							/>
						</div>
						<div style={{ "width":"20%","display":"flex","max-height": "58px","padding-right":"2%" }}>
							<InputControl
								label="&rArr; px"
								labelPosition="top"
								labelAlign="center"
								style={{ "color":"grey","text-align":"center" }}
								value={ rightPaddingLG }
								type="number"
								min={ 0 }
								max={ 250 }
								isPressEnterToChange
								onChange={ ( newStyle ) => setAttributes( {rightPaddingLG: newStyle} ) }
							/>
						</div>
						<div style={{ "width":"20%","display":"flex","max-height": "58px","padding-right":"2%" }}>
							<InputControl
								label="&dArr; px"
								labelPosition="top"
								labelAlign="center"
								style={{ "color":"grey","text-align":"center" }}
								value={ bottomPaddingLG }
								type="number"
								min={ 0 }
								max={ 250 }
								isPressEnterToChange
								onChange={ ( newStyle ) => setAttributes( {bottomPaddingLG: newStyle} ) }
							/>
						</div>
						<div style={{ "width":"20%","display":"flex","max-height": "58px" }}>
							<InputControl
								label="&lArr; px"
								labelPosition="top"
								labelAlign="center"
								style={{ "color":"grey","text-align":"center" }}
								value={ leftPaddingLG }
								type="number"
								min={ 0 }
								max={ 250 }
								isPressEnterToChange
								onChange={ ( newStyle ) => setAttributes( {leftPaddingLG: newStyle} ) }
							/>
						</div>
					</div>
					<div style={{ "display":"inline-flex","margin-bottom":"15px" }}>
						<div style={{ "width":"20%", "display":"flex", "padding-top":"25px" }}>MD</div>
						<div style={{ "width":"20%","display":"flex","max-height": "58px","padding-right":"2%" }}>
							<InputControl
								label="&uArr; px"
								labelPosition="top"
								labelAlign="center"
								style={{ "color":"grey","text-align":"center" }}
								value={ topPaddingMD }
								type="number"
								min={ 0 }
								max={ 250 }
								isPressEnterToChange
								onChange={ ( newStyle ) => setAttributes( {topPaddingMD: newStyle} ) }
							/>
						</div>
						<div style={{ "width":"20%","display":"flex","max-height": "58px","padding-right":"2%" }}>
							<InputControl
								label="&rArr; px"
								labelPosition="top"
								labelAlign="center"
								style={{ "color":"grey","text-align":"center" }}
								value={ rightPaddingMD }
								type="number"
								min={ 0 }
								max={ 250 }
								isPressEnterToChange
								onChange={ ( newStyle ) => setAttributes( {rightPaddingMD: newStyle} ) }
							/>
						</div>
						<div style={{ "width":"20%","display":"flex","max-height": "58px","padding-right":"2%" }}>
							<InputControl
								label="&dArr; px"
								labelPosition="top"
								labelAlign="center"
								style={{ "color":"grey","text-align":"center" }}
								value={ bottomPaddingMD }
								type="number"
								min={ 0 }
								max={ 250 }
								isPressEnterToChange
								onChange={ ( newStyle ) => setAttributes( {bottomPaddingMD: newStyle} ) }
							/>
						</div>
						<div style={{ "width":"20%","display":"flex","max-height": "58px" }}>
							<InputControl
								label="&lArr; px"
								labelPosition="top"
								labelAlign="center"
								style={{ "color":"grey","text-align":"center" }}
								value={ leftPaddingMD }
								type="number"
								min={ 0 }
								max={ 250 }
								isPressEnterToChange
								onChange={ ( newStyle ) => setAttributes( {leftPaddingMD: newStyle} ) }
							/>
						</div>
					</div>
					<div style={{ "display":"inline-flex","margin-bottom":"15px" }}>
						<div style={{ "width":"20%", "display":"flex", "padding-top":"25px" }}>SM</div>
						<div style={{ "width":"20%","display":"flex","max-height": "58px","padding-right":"2%" }}>
							<InputControl
								label="&uArr; px"
								labelPosition="top"
								labelAlign="center"
								style={{ "color":"grey","text-align":"center" }}
								value={ topPaddingSM }
								type="number"
								min={ 0 }
								max={ 250 }
								isPressEnterToChange
								onChange={ ( newStyle ) => setAttributes( {topPaddingSM: newStyle} ) }
							/>
						</div>
						<div style={{ "width":"20%","display":"flex","max-height": "58px","padding-right":"2%" }}>
							<InputControl
								label="&rArr; px"
								labelPosition="top"
								labelAlign="center"
								style={{ "color":"grey","text-align":"center" }}
								value={ rightPaddingSM }
								type="number"
								min={ 0 }
								max={ 250 }
								isPressEnterToChange
								onChange={ ( newStyle ) => setAttributes( {rightPaddingSM: newStyle} ) }
							/>
						</div>
						<div style={{ "width":"20%","display":"flex","max-height": "58px","padding-right":"2%" }}>
							<InputControl
								label="&dArr; px"
								labelPosition="top"
								labelAlign="center"
								style={{ "color":"grey","text-align":"center" }}
								value={ bottomPaddingSM }
								type="number"
								min={ 0 }
								max={ 250 }
								isPressEnterToChange
								onChange={ ( newStyle ) => setAttributes( {bottomPaddingSM: newStyle} ) }
							/>
						</div>
						<div style={{ "width":"20%","display":"flex","max-height": "58px" }}>
							<InputControl
								label="&lArr; px"
								labelPosition="top"
								labelAlign="center"
								style={{ "color":"grey","text-align":"center" }}
								value={ leftPaddingSM }
								type="number"
								min={ 0 }
								max={ 250 }
								isPressEnterToChange
								onChange={ ( newStyle ) => setAttributes( {leftPaddingSM: newStyle} ) }
							/>
						</div>
					</div>
				</PanelBody>
				<PanelBody title={'Border Radius'} initialOpen={ false }>
					<SelectControl
						label="Column Border Radius (Top|Right|Bottom|Left)"
						value={ colBRadius }
						options={ [
							{ label: 'None', value: '' },
							{ label: 'Left', value: 'border-radius-left' },
							{ label: 'Left | Right', value: 'border-radius-left-right' },
							{ label: 'Right', value: 'border-radius-right' },
							{ label: 'Right | Left', value: 'border-radius-right-left' },
							{ label: 'Right | Bottom', value: 'border-radius-right-bottom' },
							{ label: 'Bottom', value: 'border-radius-bottom' },
							{ label: 'Top', value: 'border-radius-top' },
							{ label: 'Top | Left', value: 'border-radius-top-left' },
							{ label: 'Top | Right', value: 'border-radius-top-right' },
							{ label: 'Top | Bottom', value: 'border-radius-top-bottom' },
							{ label: 'Top | Left | Right', value: 'border-radius-top-left-right' },	
							{ label: 'Right | Left | Top', value: 'border-radius-right-left-top' }			
						] }
						onChange={ ( newStyle ) => setAttributes( {colBRadius: newStyle} ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div className="col-wrap">
				<i className="scap scap__top"> Col </i>
				<div { ...innerBlocksProps } />
				<i className="scap scap__bottom"> //Col </i>
			</div>
		</>
	);
}
export default ColumnEdit;