/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useCallback, useState, useRef } from '@wordpress/element';
import { __experimentalInputControl as InputControl, KeyboardShortcuts, ToolbarButton, Popover, SelectControl, PanelBody, ColorPalette } from '@wordpress/components';
import { BlockControls, RichText, useBlockProps, InspectorControls, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { rawShortcut, displayShortcut } from '@wordpress/keycodes';
import { link, linkOff } from '@wordpress/icons';
import './editor.scss';

const NEW_TAB_REL = 'noreferrer noopener';
 
function URLPicker({ isSelected, url, setAttributes, opensInNewTab, onToggleOpenInNewTab, anchorRef }) {
	const [ isURLPickerOpen, setIsURLPickerOpen ] = useState( false );
	const urlIsSet = !! url;
	const urlIsSetandSelected = urlIsSet && isSelected;
	const openLinkControl = () => {
		setIsURLPickerOpen( true );
		return false; // prevents default behaviour for event
	};
	const unlinkButton = () => {
		setAttributes( {
			url: undefined,
			linkTarget: undefined,
			rel: undefined,
		} );
		setIsURLPickerOpen( false );
	};
	const linkControl = ( isURLPickerOpen || urlIsSetandSelected ) && (
		<Popover position="bottom center" onClose={ () => setIsURLPickerOpen( false ) } anchorRef={ anchorRef?.current }>
			<LinkControl
				className="wp-block-navigation-link__inline-link-input"
				value={ { url, opensInNewTab } }
				onChange={ ( {
					url: newURL = '',
					opensInNewTab: newOpensInNewTab,
				} ) => {
					setAttributes( { url: newURL } );

					if ( opensInNewTab !== newOpensInNewTab ) {
						onToggleOpenInNewTab( newOpensInNewTab );
					}
				} }
			/>
		</Popover>
	);
	return (
		<>
			<BlockControls group="block">
				{ ! urlIsSet && (
					<ToolbarButton
						name="link"
						icon={ link }
						title={ __( 'Link' ) }
						shortcut={ displayShortcut.primary( 'k' ) }
						onClick={ openLinkControl }
					/>
				) }
				{ urlIsSetandSelected && (
					<ToolbarButton
						name="link"
						icon={ linkOff }
						title={ __( 'Unlink' ) }
						shortcut={ displayShortcut.primaryShift( 'k' ) }
						onClick={ unlinkButton }
						isActive={ true }
					/>
				) }
			</BlockControls>
			{ isSelected && (
				<KeyboardShortcuts
					bindGlobal
					shortcuts={ {
						[ rawShortcut.primary( 'k' ) ]: openLinkControl,
						[ rawShortcut.primaryShift( 'k' ) ]: unlinkButton,
					} }
				/>
			) }
			{ linkControl }
		</>
	);
}

function edit( props ) {
	const { attributes, setAttributes, isSelected } = props;
	const {	linkTarget,	placeholder, rel, url, buttonText, bootClass, bootOutlineClass, bootSizesClass, bootPopClass, bootAlign, bgColor, txtColor, borderColor, bRadius, bSize } = attributes;
	const onToggleOpenInNewTab = useCallback(
		( value ) => {
			const newLinkTarget = value ? '_blank' : undefined;

			let updatedRel = rel;
			if ( newLinkTarget && ! rel ) {
				updatedRel = NEW_TAB_REL;
			} else if ( ! newLinkTarget && rel === NEW_TAB_REL ) {
				updatedRel = undefined;
			}

			setAttributes( {
				linkTarget: newLinkTarget,
				rel: updatedRel,
			} );
		},
		[ rel, setAttributes ]
	);
	const setButtonText = ( newText ) => {
		// Remove anchor tags from button text content.
		setAttributes( { buttonText: newText.val.replace( /<\/?a[^>]*>/g, '' ) } );
	};
	const ref = useRef();
	const blockProps = useBlockProps({ ref });
	const colors = [
		{ name: 'black', color: 'black' },
		{ name: 'white', color: 'white' },		
	];

	return (
		<>
			<InspectorControls key="setting">
				<PanelBody title={__('Button Style', 'WP')} initialOpen={true}	>
					<h3>Background Colour</h3>
					<ColorPalette
						label="Background Colour"
						colors={ colors }
						value={ bgColor }
						enableAlpha
						onChange={ ( colors ) => setAttributes( { bgColor: colors } ) }
					/>
					<h3>Text Colour</h3>
					<ColorPalette
						label="Background Colour"
						colors={ colors }
						value={ txtColor }
						enableAlpha
						onChange={ ( colors ) => setAttributes( { txtColor: colors } ) }
					/>
					<h3>Border Colour</h3>
					<ColorPalette
						label="Background Colour"
						colors={ colors }
						value={ borderColor }
						enableAlpha
						onChange={ ( colors ) => setAttributes( { borderColor: colors } ) }
					/>
					<InputControl
						label="Border Radius px"
						value={ bRadius }
						type="number"
						min={ 0 }
						isPressEnterToChange
						onChange={ ( newbR ) => setAttributes({ bRadius: newbR }) }
					/>
					<InputControl
						label="Border Size px"
						value={ bSize }
						type="number"
						min={ 0 }
						isPressEnterToChange
						onChange={ ( newSize ) => setAttributes({ bSize: newSize }) }
					/>
					<SelectControl
						label="Filled Style"
						value={ bootClass }
						options={ [
							{ label: 'None', value: '' },
							{ label: 'Primary', value: 'btn-primary' },
							{ label: 'Secondary', value: 'btn-secondary' },
							{ label: 'Ligt', value: 'btn-light' },
							{ label: 'Dark', value: 'btn-dark' },
							{ label: 'Link', value: 'btn-link' }
						] }
						onChange={ ( newStyle ) => setAttributes( { bootClass: newStyle } ) }
					/>
					<SelectControl
						label="Align Horizontally"
						value={ bootAlign }
						options={ [
							{ label: 'Left', value: '' },
							{ label: 'Center', value: 'btn-center' },
							{ label: 'Right', value: 'btn-right' }
						] }
						onChange={ ( newStyle ) => setAttributes( { bootAlign: newStyle } ) }
					/>
					<SelectControl
						label="Outline Style"
						value={ bootOutlineClass }
						options={ [
							{ label: 'None', value: '' },
							{ label: 'Primary Outline', value: 'btn-outline-primary' },
							{ label: 'Secondary Outline', value: 'btn-outline-secondary' },
							{ label: 'Ligt Outline', value: 'btn-outline-light' },
							{ label: 'Dark Outline', value: 'btn-outline-dark' }
						] }
						onChange={ ( newStyle ) => setAttributes( { bootOutlineClass: newStyle } ) }
					/>
					<SelectControl
						label="Sizes"
						value={ bootSizesClass }
						options={ [
							{ label: 'None', value: '' },
							{ label: 'Large', value: 'btn-lg' },
							{ label: 'Small', value: 'btn-sm' }
						] }
						onChange={ ( newStyle ) => setAttributes( { bootSizesClass: newStyle } ) }
					/>
					<SelectControl
						label="PopUp / Modal Box"
						value={ bootPopClass }
						options={ [
							{ label: 'No', value: '' },
							{ label: 'Yes', value: 'open-popup-link' }
						] }
						onChange={ ( newStyle ) => setAttributes( { bootPopClass: newStyle } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<URLPicker url={ url } setAttributes={ setAttributes } isSelected={ isSelected } opensInNewTab={ linkTarget === '_blank' } onToggleOpenInNewTab={ onToggleOpenInNewTab } anchorRef={ ref } />
			<div {...blockProps}>
				<RichText
					aria-label={ __( 'Button text' ) }
					placeholder={ placeholder || __( 'Add text…' ) }
					style={{backgroundColor: bgColor, color: txtColor, borderRadius: bRadius + 'px', border: borderColor + ' solid ' + bSize + 'px'}}
					value={ buttonText }
					onChange={ ( val ) => setButtonText( { val } ) }
					withoutInteractiveFormatting={true}
					allowedFormats={ [ ] }
					identifier="buttonText"
				/>
			</div>
		</>
	)
}
export default edit;