import { __experimentalInputControl as InputControl, PanelBody, ColorPalette, TextControl, SelectControl }  from '@wordpress/components';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import classnames from 'classnames';
const { __ } = wp.i18n;
import './editor.scss';

export default function edit( { attributes, setAttributes } ) {
	const { srcCaption, srcNumber, numColor, capColor, txtCenter } = attributes;
	const colors = [
		{ name: 'black', color: '#000' },
		{ name: 'white', color: '#fff' },		
	];
	const wrapperClasses = classnames( 'count-up__wrap' );
	const blockProps = useBlockProps( {
		className: classnames( {
		} ),
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ 'Settings' }>
					<ColorPalette
						label="Number Colour"
						colors={ colors }
						value={ numColor }
						enableAlpha
						onChange={ ( colors ) => setAttributes( { numColor: colors } ) }
					/>
					<InputControl
						label="Count Number"
						value={ srcNumber }
						type="number"
						min={ 0 }
						isPressEnterToChange
						onChange={ ( newNum ) => setAttributes({ srcNumber: newNum }) }
					/>
					<ColorPalette
						label="Caption Colour"
						colors={ colors }
						value={ capColor }
						enableAlpha
						onChange={ ( colors ) => setAttributes( { capColor: colors } ) }
					/>
					<TextControl
						label="Caption"
						value={ srcCaption }
						onChange={ ( newCaption ) => setAttributes({ srcCaption: newCaption }) }
					/>
					<SelectControl
						label="Text Align Center"
						value={ txtCenter }
						options={ [
							{ label: 'Yes', value: 'text-align:center' },
							{ label: 'No', value: 'text-align:left' },
						] }
						onChange={ ( newAlign ) => setAttributes( {txtCenter: newAlign} ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div className="count-up" { ...blockProps } style={{txtCenter}}>
				<div className={ wrapperClasses }>
					<strong className="h1 count-num" style={{color:numColor}}>{ srcNumber }</strong>
					<p style={{color:capColor}}>{ srcCaption }</p>
				</div>
			</div>
		</>
	)
}