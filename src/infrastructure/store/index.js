/* eslint-disable import/no-cycle */
import React, { createContext, useReducer, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
// import { useImmerReducer } from "use-immer";
import { asyncer } from './middlewares';
import mainReducer, { initialState } from './reducers';

const GlobalStore = createContext({});

const useGlobalStore = () => useContext(GlobalStore);

const Provider = ({ children }) => {
	const [ state, dispatchBase ] = useReducer(mainReducer, initialState); // useImmerReducer(mainReducer, initialState); // useReducer(mainReducer, initialState);
	const dispatch = useCallback(asyncer(dispatchBase, state), []);

	return (
		<GlobalStore.Provider value={{ state, dispatch }}>
			{children}
		</GlobalStore.Provider>
	);
};

Provider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object]),
};

Provider.defaultProps = {
  children: {},
};

export { Provider as default, useGlobalStore };
