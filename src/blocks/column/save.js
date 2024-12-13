import classnames from 'classnames';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { bgAttach, bgStyle, overColor, mediaUrl, contentAlign, verticalAlignment, width, colOffsetMain, colOffsetXL, colOffsetLG, colOffsetMD, colOffsetSM, colOrderMain, colOrderXL, colOrderLG, colOrderMD, colOrderSM, verticalAlign, sizeSmallLaptop, sizeLargeTablet, sizeTablet, sizeMob, allHidden, xlHidden, lgHidden, mdHidden, smHidden, topPadding, rightPadding, bottomPadding, leftPadding, topPaddingXL, rightPaddingXL, bottomPaddingXL, leftPaddingXL, topPaddingLG, rightPaddingLG, bottomPaddingLG, leftPaddingLG, topPaddingMD, rightPaddingMD, bottomPaddingMD, leftPaddingMD, topPaddingSM, rightPaddingSM, bottomPaddingSM, leftPaddingSM, colBRadius } = attributes;

	let sizeClasses;

	switch (width) {
		case 'twelve': // 12 columns
			sizeClasses = ['col col-12', 'row-c12'];
			break;
		case 'eleven': // 11 columns
			sizeClasses = ['col col-12', 'row-c11'];
			break;
		case 'ten': // 10 columns
			sizeClasses = ['col col-12', 'row-c10'];
			break;
		case 'nine': // 9 columns
			sizeClasses = ['col col-12', 'row-c9'];
			break;
		case 'eight': // 8 columns
			sizeClasses = ['col col-12', 'row-c8'];
			break;
		case 'seven': // 7 columns
			sizeClasses = ['col col-12', 'row-c7'];
			break;
		case 'six': // 6 columns
			sizeClasses = ['col col-12', 'row-c6'];
			break;
		case 'five': // 5 columns
			sizeClasses = ['col col-12', 'row-c5'];
			break;
		case 'quarter': // 4 columns
			sizeClasses = ['col col-12', 'row-c4'];
			break;
		case 'three': // 3 columns
			sizeClasses = ['col col-12','row-c3'];
			break;
		case 'half': // 2 columns
			sizeClasses = ['col col-12','row-c2'];
			break;
		default:
			sizeClasses = ['col col-12','row-c1'];
	}

	const classNameCol = classnames(
		colOffsetMain && (colOffsetMain),
		colOffsetXL && (colOffsetXL),
		colOffsetLG && (colOffsetLG),
		colOffsetMD && (colOffsetMD),
		colOffsetSM && (colOffsetSM),
		colOrderMain && (colOrderMain),
		colOrderXL && (colOrderXL),
		colOrderLG && (colOrderLG),
		colOrderMD && (colOrderMD),
		colOrderSM && (colOrderSM),
		//topPadding && ('pt-' + topPadding),
		topPaddingXL && ('pt-xl-' + topPaddingXL), 
		topPaddingLG && ('pt-lg-' + topPaddingLG), 
		topPaddingMD && ('pt-md-' + topPaddingMD), 
		topPaddingSM && ('pt-sm-' + topPaddingSM),
		//rightPadding && ('pr-' + rightPadding),
		rightPaddingXL && ('pr-xl-' + rightPaddingXL),
		rightPaddingLG && ('pr-lg-' + rightPaddingLG),
		rightPaddingMD && ('pr-md-' + rightPaddingMD), 
		rightPaddingSM && ('pr-sm-' + rightPaddingSM),
		//bottomPadding && ('pb-' + bottomPadding),
		bottomPaddingXL && ('pb-xl-' + bottomPaddingXL),
		bottomPaddingLG && ('pb-lg-' + bottomPaddingLG),
		bottomPaddingMD && ('pb-md-' + bottomPaddingMD),
		bottomPaddingSM && ('pb-sm-' + bottomPaddingSM),
		//leftPadding && ('pl-' + leftPadding),
		leftPaddingXL && ('pl-xl-' + leftPaddingXL),
		leftPaddingLG && ('pl-lg-' + leftPaddingLG), 
		leftPaddingMD && ('pl-md-' + leftPaddingMD), 
		leftPaddingSM && ('pl-sm-' + leftPaddingSM),
		allHidden && ('d-none'),
		xlHidden && ('d-xl-none'),
		lgHidden && ('d-lg-none'),
		mdHidden && ('d-md-none'),
		smHidden && ('d-sm-none'),
		{
			[ `is-vertically-aligned-${ verticalAlignment }` ]: verticalAlignment,
			[ `${ verticalAlign }` ]: verticalAlign,
			[ `${ sizeSmallLaptop }` ]: sizeSmallLaptop,
			[ `${ sizeLargeTablet }` ]: sizeLargeTablet,
			[ `${ sizeTablet }` ]: sizeTablet,
			[ `${ sizeMob }` ]: sizeMob,
			[ `${ colBRadius }` ]: colBRadius,
			[ `${ contentAlign }` ]: contentAlign
	} );

	const overlayStyle = {
		backgroundColor: overColor
	};

	return (
		<div { ...useBlockProps.save( { className: classNameCol, style: (topPadding && ('padding-top:' + topPadding + 'px;')) + (rightPadding && ('padding-right:' + rightPadding + 'px;')) + (bottomPadding && ('padding-bottom:' + bottomPadding + 'px;')) + (leftPadding && ('padding-left:' + leftPadding + 'px;')) + ((bgStyle) && ('background-color:' + bgStyle + ';')) + ((mediaUrl) && ( 'background-attachment:' + ( bgAttach && ( `fixed` ) || `inherit` ) + '; background-image: url(' + mediaUrl + ');')) }) } >
			{ overColor && ( <div className="row-bg-overlay" style={ overlayStyle }></div> ) }
			<InnerBlocks.Content />
		</div>
	);
}