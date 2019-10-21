import { getSubscriptions } from '../../redux/selectors/content.selector';
import { store, persistor } from '../../redux/store/index';

const IWW_BASE_URL = 'www.iww.de';

export const checkAndPrependToUrl = (url, articleTag) => {
	url = url.toLowerCase();
	articleTag = articleTag.toLowerCase();

	if (!/^https?:\/\//i.test(url)) {
		console.log('Url needs to prepend: ', url);
		if (url.substr(0, 2) === '//') {
			return `https:${url}`;
		} else if (url.substr(0, 1) === '/' && url.substr(1, 2) !== '/') {
			if (
				url.indexOf('fk') !== -1 ||
				url.indexOf('astw') !== -1 ||
				url.indexOf('bbp') !== -1 ||
				url.indexOf('cb') !== -1 ||
				url.indexOf('fao') !== -1
			) {
				console.info('Already has category in url');
				return `https://${IWW_BASE_URL}${url}`;
			}

			return `https://${IWW_BASE_URL}/${articleTag}${url}`;
		}
	}

	return url;
};

export const matchSubscriptionIdToShortcut = async subId => {
	const subscriptions = await getSubscriptions(await store.getState());
	for (const abo of subscriptions) {
		if (abo.id === subId) {
			return abo.shortcut;
		}
	}
	return false;
};

export const cleanUrls = (html, articleTag) => {
	const hrefs = html.match(/href="([^"]*)"/gi);
	if (hrefs) {
		for (const href of hrefs) {
			// console.log(`Replacing ${href} with test`);
			// console.log('href, ', href.match(`href="(.*)"`));
			html = html.replace(
				href.match(`href="(.*)"`)[1],
				checkAndPrependToUrl(href.match(`href="(.*)"`)[1], articleTag)
			);
		}
	}

	const srcs = html.match(/src="([^"]*)"/gi);
	if (srcs) {
		for (const src of srcs) {
			// console.log(
			// 	`Replacing ${src} with ${checkAndPrependToUrl(src.match(`src="(.*)"`)[1])}`,
			// 	articleTag
			// );
			html = html.replace(
				src.match(`src="(.*)"`)[1],
				checkAndPrependToUrl(src.match(`src="(.*)"`)[1], articleTag)
			);
		}
	}

	return html;
};

export const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
	console.log(layoutMeasurement.height + contentOffset.y, contentSize.height - 700);
	return layoutMeasurement.height + contentOffset.y >= contentSize.height - 700;
};
