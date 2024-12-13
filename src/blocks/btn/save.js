import { RichText, useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';

export default function save({ attributes }) {
	const { url, buttonText, linkTarget, rel, bootClass, bootOutlineClass, bootSizesClass, bootPopClass, bootAlign, bgColor, txtColor, borderColor, bRadius, bSize } = attributes;
	const classNames = classnames( bootClass, bootAlign, bootOutlineClass, bootSizesClass, bootPopClass );
	return (
		<div {...useBlockProps.save()}>
			<RichText.Content tagName="a" className={ 'btn ' + classNames }	value={ buttonText } target={ linkTarget } href={ url } rel={ rel } style={{backgroundColor: bgColor, color: txtColor, borderRadius: bRadius + 'px', border: borderColor + ' solid ' + bSize + 'px'}}/>
		</div>
	);
};