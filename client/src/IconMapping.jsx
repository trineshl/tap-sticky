import React, { Component } from 'react';
import _ from 'lodash';

const FImageObj = {
	1: {
		color: '',//Plus
		className: 'fa-solid fa-plus'
	},
	2: {
		color: '', //Close Icon
		className: 'fa-solid fa-xmark CROSS_ICON'
	},
	3: {
		className: 'fa-solid fa-bars'
	},
	4: {
		className: 'fa-solid fa-thumbtack'
	},
	5: {
		className: 'fa-solid fa-thumbtack',
		color: '#0066CC'
	},
	6: {
		className: 'fa-regular fa-rectangle-list',
		color: ''
	},
	7: {
		className: 'fas fa-edit',//Edit
	},
	8: {
		className: 'fas fa-trash'//Trash
	},
	9: {
		className: 'fa-solid fa-window-restore'//reset last settings
	}
};

class IconMapping extends Component {

	pvtGetIconForImageIndex() {

		const LMe = this,
			LImageIndex = LMe.props.imageIndex,
			LHint = LMe.props.hint;

		if (_.isEmpty(LImageIndex) && !_.isNumber(LImageIndex)) {
			return;
		}

		const LImgRec = FImageObj[LImageIndex],
			LStyle = { color: LImgRec.color },
			LSize = LMe.props.size;

		if (!_.isEmpty(LSize) && !_.isNumber(LImageIndex)) {
			LStyle.fontSize = LSize;
		}

		return <i title={LHint}
			style={LStyle} className={LImgRec.className + ' ' + (LMe.props.additionalCls || '')}></i>;
	}

	render() {
		const LMe = this;

		return (
			<>
				{LMe.pvtGetIconForImageIndex()}
			</>
		)
	}
}

export default IconMapping;