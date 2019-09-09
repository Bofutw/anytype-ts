import * as React from 'react';
import * as ReactDOM from 'react-dom';

const $ = require('jquery');

interface Props {
	id?: string;
	icon?: string;
	className?: string;
	arrow?: boolean;
	onClick?(e: any): void;
	onMouseDown?(e: any): void;
	onMouseEnter?(e: any): void;
	onMouseLeave?(e: any): void;
};

class Icon extends React.Component<Props, {}> {
	
	render () {
		let { id, icon, arrow, className, onClick, onMouseDown, onMouseEnter, onMouseLeave } = this.props;
		let cn = [ 'icon' ];
		let style: any = {};
		
		if (className) {
			cn.push(className);
		};
		
		if (icon) {
			style.backgroundImage = 'url("' + icon + '")';
		};
		
		return (
			<div id={id} onMouseDown={this.onMouseDown} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onClick={onClick} className={cn.join(' ')} style={style}>
				{arrow ? <div className="arrow" /> : ''}
			</div>
		);
	};
	
	onMouseEnter (e: any) {
		let { onMouseEnter } = this.props;
		
		if (onMouseEnter) {
			onMouseEnter(e);
		};
	};
	
	onMouseLeave (e: any) {
		let { onMouseLeave } = this.props;
		
		if (onMouseLeave) {
			onMouseLeave(e);
		};
	};
	
	onMouseDown (e: any) {
		let { onMouseDown } = this.props;
		
		if (onMouseDown) {
			onMouseDown(e);
		};
	};
	
};

export default Icon;