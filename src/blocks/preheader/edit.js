const {__experimentalLinkControl: LinkControl, InspectorControls, RichText, InnerBlocks} = wp.blockEditor;
const { PanelBody, ColorPalette, SelectControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

const BlockEdit = (props) => {
	const { attributes, setAttributes } = props;
	const { titleColor, txtUpp, tagH, txtBold } = attributes;

	const colors = [
		{ name: 'white', color: '#ffffff' },
		{ name: 'black', color: '#000000' },
	];

	const titleStyle = {
		color: titleColor
	};

	

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Block Options', 'WP')} initialOpen={ true } >
					<h3>Pre Header Color</h3>
					<ColorPalette
						label="Pre Header Colour"
						colors={ colors }
						value={ titleColor }
						enableAlpha
						onChange={ ( colors ) => setAttributes( { titleColor: colors } ) }
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
						label="Add Bold weight"
						value={ txtBold }
						options={ [
							{ label: 'Bold', value: 'fw-bold' },
							{ label: 'Normal', value: 'fw-normal' },
						] }
						onChange={ ( newTxtBold ) => setAttributes( {txtBold: newTxtBold} ) }
					/>
					<hr />
					<SelectControl
						label="Select H tag"
						value={ tagH }
						options={ [
							{ label: 'h1', value: 'h1' },
							{ label: 'h2', value: 'h2' },
							{ label: 'h3', value: 'h3' },
							{ label: 'h4', value: 'h4' },
							{ label: 'h5', value: 'h5' },
						] }
						onChange={ ( newTagH ) => setAttributes( {tagH: newTagH} ) }
					/>
				</PanelBody>
			</InspectorControls>

				<div>
					<RichText
						tagName="span" // The tag here is the element output and editable in the admin
						value={ attributes.cardTitle } // Any existing content, either from the database or an attribute default
						// allowedFormats={ [ 'core/bold', 'core/italic' ] } // Allow the content to be made bold or italic, but do not allow other formatting options
						onChange={ ( cardTitle ) => props.setAttributes( { cardTitle: cardTitle } ) } // Store updated content as a block attribute
						placeholder={ __( 'Pre Heading...' ) } // Display this text before any content has been added by the user
						style={ titleStyle }			
					/>
					<InnerBlocks allowedBlocks={ [ 'core/heading', 'core/paragraph', 'core/list' ] } />
				</div>

		</Fragment>
	);
};
export default BlockEdit;