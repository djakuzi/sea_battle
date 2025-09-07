export interface JwtPayload {
    uuid: string,
    login: string
}

export interface FullJwtTokens {
    accessToken: string,
    refreshToken: string,
}