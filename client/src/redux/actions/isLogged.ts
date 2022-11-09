export const LOG_IN = "LOG_IN"
export const LOG_OUT = "LOG_OUT"
import { action } from "../reducers/index"

export const LOG_IN_FUNCTION = (): action => {
    return {type: LOG_IN}
}

export const LOG_OUT_FUNCTION = (): action => {
    return {type: LOG_OUT}
}