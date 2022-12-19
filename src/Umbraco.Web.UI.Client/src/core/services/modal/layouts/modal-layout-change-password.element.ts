import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { css, CSSResultGroup, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { UmbModalHandler } from '@umbraco-cms/services';
import { UmbObserverMixin } from '@umbraco-cms/observable-api';
import { UmbContextConsumerMixin } from '@umbraco-cms/context-api';

export interface UmbModalChangePasswordData {
	requireOldPassword: boolean;
}

@customElement('umb-modal-layout-change-password')
export class UmbModalLayoutChangePasswordElement extends UmbContextConsumerMixin(UmbObserverMixin(LitElement)) {
	static styles: CSSResultGroup = [
		UUITextStyles,
		css`
			:host {
				display: block;
				width: 400px;
			}
			uui-input-password {
				width: 100%;
			}
			#actions {
				display: flex;
				justify-content: flex-end;
				margin-top: var(--uui-size-layout-2);
			}
		`,
	];

	@property({ attribute: false })
	modalHandler?: UmbModalHandler;

	@property()
	data?: UmbModalChangePasswordData;

	private _close() {
		this.modalHandler?.close();
	}

	private _handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		if (!form) return;

		const isValid = form.checkValidity();
		if (!isValid) return;

		const formData = new FormData(form);

		const oldPassword = formData.get('oldPassword') as string;
		const newPassword = formData.get('newPassword') as string;
		const confirmPassword = formData.get('confirmPassword') as string;
		console.log('IMPLEMENT SUBMIT', { oldPassword, newPassword, confirmPassword });
		this._close();
	}

	private _renderOldPasswordInput() {
		return html`
			<uui-form-layout-item style="margin-bottom: var(--uui-size-layout-2)">
				<uui-label id="oldPasswordLabel" for="oldPassword" slot="label" required>Old password</uui-label>
				<uui-input-password
					id="oldPassword"
					name="oldPassword"
					required
					required-message="Old password is required"></uui-input-password>
			</uui-form-layout-item>
		`;
	}

	render() {
		return html`
			<uui-dialog-layout class="uui-text" headline="Change password">
				<uui-form>
					<form id="LoginForm" name="login" @submit="${this._handleSubmit}">
						${this.data?.requireOldPassword ? this._renderOldPasswordInput() : nothing}
						<uui-form-layout-item>
							<uui-label id="newPasswordLabel" for="newPassword" slot="label" required>New password</uui-label>
							<uui-input-password
								id="newPassword"
								name="newPassword"
								required
								required-message="New password is required"></uui-input-password>
						</uui-form-layout-item>
						<uui-form-layout-item>
							<uui-label id="confirmPasswordLabel" for="confirmPassword" slot="label" required
								>Confirm password</uui-label
							>
							<uui-input-password
								id="confirmPassword"
								name="confirmPassword"
								required
								required-message="Confirm password is required"></uui-input-password>
						</uui-form-layout-item>

						<div id="actions">
							<uui-button @click=${this._close} label="Cancel"></uui-button>
							<uui-button type="submit" label="Confirm" look="primary" color="positive"></uui-button>
						</div>
					</form>
				</uui-form>
			</uui-dialog-layout>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'umb-modal-layout-change-password': UmbModalLayoutChangePasswordElement;
	}
}
