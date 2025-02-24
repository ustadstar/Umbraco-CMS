import { UMB_USER_ENTITY_TYPE } from '../../entity.js';
import { UMB_USER_WORKSPACE_ALIAS } from './constants.js';
import { UMB_WORKSPACE_CONDITION_ALIAS, UmbSubmitWorkspaceAction } from '@umbraco-cms/backoffice/workspace';

export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'workspace',
		kind: 'routable',
		alias: UMB_USER_WORKSPACE_ALIAS,
		name: 'User Workspace',
		api: () => import('./user-workspace.context.js'),
		meta: {
			entityType: UMB_USER_ENTITY_TYPE,
		},
	},
	{
		type: 'workspaceAction',
		kind: 'default',
		alias: 'Umb.WorkspaceAction.User.Save',
		name: 'Save User Workspace Action',
		api: UmbSubmitWorkspaceAction,
		meta: {
			label: '#buttons_save',
			look: 'primary',
			color: 'positive',
		},
		conditions: [
			{
				alias: UMB_WORKSPACE_CONDITION_ALIAS,
				match: UMB_USER_WORKSPACE_ALIAS,
			},
		],
	},
];
