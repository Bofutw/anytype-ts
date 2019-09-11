import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Icon } from 'ts/component';

const $ = require('jquery');

interface Props {
	history: any;
};

interface State {
	coverSelector: boolean;
	cover: number;
};

class PageMainIndex extends React.Component<Props, State> {
	
	state = {
		coverSelector: false,
		cover: 1,
	};

	constructor (props: any) {
		super(props);

		this.onCover = this.onCover.bind(this);
		this.onProfile = this.onProfile.bind(this);
	};
	
	render () {
		const { coverSelector, cover } = this.state;
		
		let profile = { name: 'Razor' };
		let covers = [ {}, {}, {} ];
		let Cover = () => (<div/>);
		
        return (
			<div>
				{coverSelector ? <div className="selectorDimmer" onMouseDown={this.onCover} /> : ''}
				
				<div id="cover" className={'cover c' + cover} />
				<div className="logo" />
				<div className="topMenu">
					<div className="item" onMouseDown={this.onCover}>Change cover</div>
					<div className="item" onMouseDown={this.onProfile}>Settings</div>
				</div>
				
				{coverSelector ? (
					<div className="coverSelector">
						{covers.map((item, i) => {
							return <Cover key={i} {...item} />;
						})}
						
						<div className="item add dn">
							<Icon />
						</div>
					</div>
				) : ''}
				
				<div id="body" className="wrapper">
					<div className="title">
						{profile ? 'Hi, ' + profile.name : ''}
					</div>
					{coverSelector}
				</div>
			</div>
		);
	};

	onCover (e: any) {
		this.setState({ coverSelector: !this.state.coverSelector });
	};

	onProfile (e: any) {
		e.preventDefault();
	};
	
	resize () {
		let win = $(window);
		let node = $(ReactDOM.findDOMNode(this));
		let cover = node.find('#cover');
		let body = node.find('#body');
		let items = node.find('#items');
		let wh = win.height();
		let ww = win.width();
		let cnt = Math.floor((ww - 80) / 160);
		let width = cnt * 160 - 16;
		
		cover.css({ height: wh });
		items.css({ width: width, top: wh - 224, marginLeft: -width / 2 });
		body.css({ width: width, minHeight: wh - 92 });
		
		let n = 1;
		items.find('.indexItem').each((i: number, item: any) => {
			$(item).css({ marginRight: (n % cnt === 0) ? 0 : 16 });
			n++;
		});
	};

};

export default PageMainIndex;