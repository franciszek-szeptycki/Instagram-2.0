export const LOG_IN = "LOG_IN"
export const LOG_OUT = "LOG_OUT"

export interface action {
	type: string
}

export const handleLogin = (): action => {
    return {type: LOG_IN}
}

export const handleLogout = (): action => {
    return {type: LOG_OUT}
}