import { Dispatch } from "react"

export enum AlertType {
	SUCCESS,
	ERROR,
	DEBUG,
}

interface Alert {
	message: string
	type: AlertType
}

export interface ContextState {
	alerts: Alert[]
}

export enum ContextActionKind {
	SPAWNALERT,
	CLOSEALERT,
}

interface ContextAction {
	type: ContextActionKind
	payload: any
}

export const initialContextValue: ContextState = {
	alerts: [],
}

export interface Context {
	state: ContextState
	dispatch: Dispatch<ContextAction>
}

export const reducer = (
	state: ContextState,
	action: ContextAction
): ContextState => {
	const { type, payload } = action

	if (type == ContextActionKind.SPAWNALERT) {
		const newAlert: Alert = { message: payload.message, type: payload.type }
		return { ...state, alerts: [...state.alerts, newAlert] }
	} else if (type == ContextActionKind.CLOSEALERT) {
		const newArr: Alert[] = state.alerts.filter(
			(_, idx) => idx != payload.idx
		)
		return { ...state, alerts: newArr }
	}

	return state
}
