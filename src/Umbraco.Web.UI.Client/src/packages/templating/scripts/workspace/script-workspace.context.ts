import type { UmbScriptDetailModel } from '../types.js';
import { UMB_SCRIPT_ENTITY_TYPE } from '../entity.js';
import { UMB_SCRIPT_DETAIL_REPOSITORY_ALIAS, type UmbScriptDetailRepository } from '../repository/index.js';
import { UMB_SCRIPT_WORKSPACE_ALIAS } from './manifests.js';
import { UmbScriptWorkspaceEditorElement } from './script-workspace-editor.element.js';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import {
	UmbEntityDetailWorkspaceContextBase,
	type UmbRoutableWorkspaceContext,
	type UmbSubmittableWorkspaceContext,
	UmbWorkspaceIsNewRedirectController,
} from '@umbraco-cms/backoffice/workspace';
import type { IRoutingInfo, PageComponent } from '@umbraco-cms/backoffice/router';

export class UmbScriptWorkspaceContext
	extends UmbEntityDetailWorkspaceContextBase<UmbScriptDetailModel, UmbScriptDetailRepository>
	implements UmbSubmittableWorkspaceContext, UmbRoutableWorkspaceContext
{
	public readonly name = this._data.createObservablePartOfCurrent((data) => data?.name);
	public readonly content = this._data.createObservablePartOfCurrent((data) => data?.content);

	constructor(host: UmbControllerHost) {
		super(host, {
			workspaceAlias: UMB_SCRIPT_WORKSPACE_ALIAS,
			entityType: UMB_SCRIPT_ENTITY_TYPE,
			detailRepositoryAlias: UMB_SCRIPT_DETAIL_REPOSITORY_ALIAS,
		});

		this.routes.setRoutes([
			{
				path: 'create/parent/:entityType/:parentUnique',
				component: UmbScriptWorkspaceEditorElement,
				setup: async (component: PageComponent, info: IRoutingInfo) => {
					const parentEntityType = info.match.params.entityType;
					const parentUnique = info.match.params.parentUnique === 'null' ? null : info.match.params.parentUnique;
					await this.createScaffold({ parent: { entityType: parentEntityType, unique: parentUnique } });

					new UmbWorkspaceIsNewRedirectController(
						this,
						this,
						this.getHostElement().shadowRoot!.querySelector('umb-router-slot')!,
					);
				},
			},
			{
				path: 'edit/:unique',
				component: UmbScriptWorkspaceEditorElement,
				setup: (component: PageComponent, info: IRoutingInfo) => {
					const unique = info.match.params.unique;
					this.load(unique);
				},
			},
		]);
	}

	/**
	 * @description Set the name of the script
	 * @param {string} value
	 * @memberof UmbScriptWorkspaceContext
	 */
	public setName(value: string) {
		this._data.updateCurrent({ name: value });
	}

	/**
	 * @description Set the content of the script
	 * @param {string} value
	 * @memberof UmbScriptWorkspaceContext
	 */
	public setContent(value: string) {
		this._data.updateCurrent({ content: value });
	}

	/**
	 * @description load the script
	 * @param unique The unique identifier of the script
	 * @returns {Promise<void>}
	 * @memberof UmbScriptWorkspaceContext
	 */
	public override async load(unique: string) {
		const response = await super.load(unique);
		this.observe(response.asObservable?.(), (data) => this.#onDetailStoreChanges(data), 'umbDetailStoreObserver');
		return response;
	}

	#onDetailStoreChanges(data: UmbScriptDetailModel | undefined) {
		// Data is removed from the store
		// TODO: revisit. We need to handle what should happen when the data is removed from the store
		if (data === undefined) {
			this._data.clear();
		}
	}
}

export { UmbScriptWorkspaceContext as api };
