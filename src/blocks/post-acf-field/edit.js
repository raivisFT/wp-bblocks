/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	InspectorControls,
	useBlockProps,
	MediaUpload,
	MediaUploadCheck
} from '@wordpress/block-editor';
import {
	TextControl,
	PanelBody,
	RadioControl,
} from '@wordpress/components';

function PostACFEdit( {
	isSelected,
	context: { postType, postId, queryId },
	attributes,
	setAttributes,
} ) {
	const isDescendentOfQueryLoop = Number.isFinite( queryId );
	const { fieldName, option } = attributes;
	const blockProps = useBlockProps( {
		className: classnames( {
		} ),
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ 'Settings' }>
					<TextControl
						label="ACF field name"
						value={ fieldName }
						onChange={ ( newFieldName ) => setAttributes( {fieldName: newFieldName} ) }
					/>
					<RadioControl
						label="Page or Option"
						help="Whether to try to load the field from the page or the options areas"
						selected={ option }
						options={ [
							{ label: 'Page', value: 'page' },
							{ label: 'Options', value: 'option' },
						] }
						onChange={ ( value ) => setAttributes({option: value}) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<hr />
				ACF Field - <b>[ {fieldName} ]</b>
				<hr />
			</div>
		</>
	);
}

export default PostACFEdit;
