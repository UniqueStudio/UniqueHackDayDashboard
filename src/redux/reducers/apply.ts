import { AnyAction } from 'redux';

export interface ApplyProcessData {
    currentStep: number;
    maxStep: number;
}

export default function applyProcess(
    state: ApplyProcessData = {
        currentStep: 0,
        maxStep: 0,
    },
    action: AnyAction,
) {
    const regexp = /^APPLY_PROCESS_IS_([A-Z])$/;
    const [, DTC]: [any, 'D' | 'T' | 'C'] = action.type.match(regexp) || new Array(5);
    if (DTC) {
        return {
            ...state,
            currentStep: 'DTC'.indexOf(DTC) + 1,
        };
    }

    if (action.type === 'APPLY_PROCESS_SET_MAX_STEP') {
        return {
            ...state,
            maxStep: action.payload,
        };
    }

    if (action.type === 'APPLY_PROCESS_SET_CURRENT') {
        if (action.payload > state.maxStep) {
            return {
                ...state,
                currentStep: state.maxStep,
            };
        }
        return {
            ...state,
            currentStep: action.payload,
        };
    }
    return state;
}
