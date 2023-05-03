import type { TagResponseModel } from '@umbraco-cms/backoffice/backend-api';
import { UmbContextToken } from '@umbraco-cms/backoffice/context-api';
import { UmbArrayState } from '@umbraco-cms/backoffice/observable-api';
import { UmbStoreBase } from '@umbraco-cms/backoffice/store';
import { UmbControllerHostElement } from '@umbraco-cms/backoffice/controller';

export const UMB_TAG_STORE_CONTEXT_TOKEN = new UmbContextToken<UmbTagStore>('UmbTagStore');
/**
 * @export
 * @class UmbTagStore
 * @extends {UmbStoreBase}
 * @description - Data Store for Template Details
 */
export class UmbTagStore extends UmbStoreBase {
	/**
	 * Creates an instance of UmbTagStore.
	 * @param {UmbControllerHostElement} host
	 * @memberof UmbTagStore
	 */
	constructor(host: UmbControllerHostElement) {
		super(host, UMB_TAG_STORE_CONTEXT_TOKEN.toString(), new UmbArrayState<TagResponseModel>([], (x) => x.id));
	}

	/**
	 * Append a tag to the store
	 * @param {TagResponseModel} TAG
	 * @memberof UmbTagStore
	 */
	append(tag: TagResponseModel) {
		this._data.append([tag]);
	}

	/**
	 * Append a tag to the store
	 * @param {id} TagResponseModel id.
	 * @memberof UmbTagStore
	 */
	byId(id: TagResponseModel['id']) {
		return this._data.getObservablePart((x) => x.find((y) => y.id === id));
	}

	// TODO
	byGroup(group: TagResponseModel['group']) {
		return this._data.getObservablePart((x) => x.filter((y) => y.group === group));
	}

	// TODO
	byText(text: string) {
		return this._data.getObservablePart((items) =>
			items.filter((item) => item.text?.toLocaleLowerCase().includes(text.toLocaleLowerCase()))
		);
	}

	/**
	 * Removes tag in the store with the given uniques
	 * @param {string[]} uniques
	 * @memberof UmbTagStore
	 */
	remove(uniques: Array<TagResponseModel['id']>) {
		this._data.remove(uniques);
	}
}
