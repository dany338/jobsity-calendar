/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-shadow */
/* eslint-disable guard-for-in */
/* eslint-disable no-undef */
/* eslint-disable prefer-spread */
export default function bindActions(actions, dispatch) {
	const bindAction = (action, dispatch) => {
		return function() {
			return dispatch(action.apply(null, arguments));
		};
	}
	// if it's a single action
	if (typeof actions === 'function') {
		return bindAction(actions, dispatch);
	}
	if (typeof actions !== 'object' || actions === null) {
		throw new Error(
			`bindActions expected an object or a function, instead received ${
				actions === null ? 'null' : typeof actions
			}. `
		)
  }

  const boundActions = {};

	for (const key in actions) {
    const action = actions[key];
    if (typeof action === 'function') {
      boundActions[key] = bindAction(action, dispatch);
    }
  }

	return boundActions;
};
