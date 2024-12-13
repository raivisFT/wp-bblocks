import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';

export default function save( { attributes } ) {
	const wrapperClasses = classnames( 'count-up__wrap' );
	const { srcNumber, numColor, srcCaption, capColor, txtCenter } = attributes;
	return (
		<div className="count-up" { ...useBlockProps.save( { className: wrapperClasses } ) } style={{txtCenter}}>
			<strong className="h1 count-num" style={{color:numColor}}>{ srcNumber }</strong>
			<p style={{color:capColor}}>{ srcCaption }</p>
		</div>
	);
}