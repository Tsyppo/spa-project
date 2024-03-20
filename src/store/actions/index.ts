/* eslint-disable import/no-anonymous-default-export */
import * as PhotoActions from './photoActions'
import * as SettingsAction from './settingsActions'

export default {
	...PhotoActions,
	...SettingsAction,
}
