import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
export default function save( { attributes } ) {
	const { icoMarginRight, icoHeight, icoColor, icoColorHover, fbHidden, xtwHidden, lnHidden, wappHidden, telegHidden, emailHidden, linklHidden } = attributes;
	return (
		<div id="WP-soc-share-wrap" { ...useBlockProps.save() }>
			<div className="WP-soc-share">
				{!fbHidden && (<div className='WP-soc-share_item WP-soc-share_item--fb'><a href='' rel="noopener"></a></div>)}
				{!xtwHidden && (<div className="WP-soc-share_item WP-soc-share_item--xtw"><a href='' rel="noopener"></a></div>)}
				{!lnHidden && (<div className="WP-soc-share_item WP-soc-share_item--ln"><a href='' rel="noopener"></a></div>)}
				{!wappHidden && (<div className="WP-soc-share_item WP-soc-share_item--wapp"><a href='' rel='noopener'></a></div>)}
				{!telegHidden && (<div className="WP-soc-share_item WP-soc-share_item--teleg"><a href='' rel="noopener"></a></div>)}
				{!emailHidden && (<div className="WP-soc-share_item WP-soc-share_item--email"><a href=''></a></div>)}
				{!linklHidden && (<div className="WP-soc-share_item WP-soc-share_item--link"><span><input type='text' value='' id='copyInput'/></span></div>)}
				<style>{("#WP-soc-share-wrap .WP-soc-share_item{margin-right:"+icoMarginRight+"px}#WP-soc-share-wrap .WP-soc-share_item a,#WP-soc-share-wrap .WP-soc-share_item span{height:"+ icoHeight +"px !important}#WP-soc-share-wrap .WP-soc-share_item svg path{fill:"+icoColor+" !important} #WP-soc-share-wrap .WP-soc-share_item a:hover svg path,#WP-soc-share-wrap .WP-soc-share_item span:hover svg path{fill:"+icoColorHover+" !important}")}</style>
			</div>
		</div>
	);
}