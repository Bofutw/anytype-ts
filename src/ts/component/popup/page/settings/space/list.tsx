import * as React from 'react';
import $ from 'jquery';
import { observer } from 'mobx-react';
import { Title, IconObject, ObjectName, Icon } from 'Component';
import { I, UtilObject, translate } from 'Lib';
import { authStore, dbStore, detailStore, menuStore } from 'Store';
import Constant from 'json/constant.json';

const PopupSettingsPageSpacesList = observer(class PopupSettingsPageSpacesList extends React.Component<{}, {}> {

	constructor (props) {
		super(props);

		this.isOwner = this.isOwner.bind(this);
	};

	render () {
		const spaces = dbStore.getSpaces();

		const Row = (space) => {
			const creator = detailStore.get(Constant.subId.space, space.creator);
			const isOwner = creator.permissions == I.ParticipantPermissions.Owner;

			return (
				<tr>
					<td className="columnSpace">
						<div className="spaceNameWrapper">
							<IconObject object={space} size={40} />
							<div className="spaceName">
								<ObjectName object={space} />

								{!isOwner ? (
									<div className="creatorNameWrapper">
										<IconObject object={creator} size={16} />
										<ObjectName object={creator} />
									</div>
								) : ''}
							</div>
						</div>
					</td>
					<td>{translate(`popupSettingsSpacesAccess${creator.permissions}`)}</td>
					<td>{translate(`popupSettingsSpacesNetwork${space.spaceType}`)}</td>
					<td>{translate(`popupSettingsSpacesDevice${space.spaceLocalStatus}`)}</td>

					<td className="columnMore">
						<div id={`icon-more-${space.id}`} onClick={e => this.onSpaceMore(e, space)} className="iconWrap">
							<Icon className="more" />
						</div>
					</td>
				</tr>
			);
		};

		return (
			<React.Fragment>
				<Title text={translate('popupSettingsSpacesListTitle')} />

				<div className="items">
					<table>
						<thead>
							<tr>
								<th className="columnSpace">{translate('popupSettingsSpacesListSpace')}</th>
								<th>{translate('popupSettingsSpacesListAccess')}</th>
								<th>{translate('popupSettingsSpacesListNetwork')}</th>
								<th>{translate('popupSettingsSpacesListDevice')}</th>
								<th className="columnMore"> </th>
							</tr>
						</thead>
						<tbody>
							{spaces.map((item: any, i: number) => (
								<Row key={i} {...item} />
							))}
						</tbody>
					</table>
				</div>
			</React.Fragment>
		);
	};

	onSpaceMore (e: React.MouseEvent, space) {
		const { spaceType } = space;
		const element = $(e.currentTarget);
		const options: any[] = [
			{ id: 'offload', name: translate('popupSettingsSpacesMenuMoreOffload') },
		];

		if (UtilObject.isSpaceOwner(space.creator)) {
			if (spaceType == I.SpaceType.Shared) {
				options.push({ id: 'deleteFromNetwork', color: 'red', name: translate('popupSettingsSpacesMenuMoreDeleteFromNetwork') });
			};
		} else {
			options.push({ id: 'leave', color: 'red', name: translate('popupSettingsSpacesMenuMoreDeleteFromNetwork') });
		};

		menuStore.open('select', {
			element,
			vertical: I.MenuDirection.Bottom,
			horizontal: I.MenuDirection.Right,
			offsetY: 4,
			onOpen: () => element.addClass('active'),
			onClose: () => element.removeClass('active'),
			data: {
				options,
				onSelect: (e: any, item: any) => {
					switch (item.id) {
						case 'offload':
							console.log('OFFLOAD')
							break;

						case 'leave':
							console.log('LEAVE')
							break;

						case 'deleteFromNetwork':
							console.log('DELETE')
							break;
					};
				}
			}
		});
	};

	isOwner (space: any) {
		const { account } = authStore;
		const { info } = account;
		const { profileObjectId } = info;
		const creator = detailStore.get(Constant.subId.space, space.creator);
		const { identityProfileLink } = creator;

		return identityProfileLink == profileObjectId;
	};

});

export default PopupSettingsPageSpacesList;
