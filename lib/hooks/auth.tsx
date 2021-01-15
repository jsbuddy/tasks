import http from "lib/http";
import { IUser } from "lib/types";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";

interface IAuthenticateData {
    token?: string,
    user: IUser
}

interface IAuthData {
    user: IUser,
    authenticate: (data: IAuthenticateData) => void,
    authenticated: Boolean,
    resolved: Boolean,
    logout: () => void,
    reloadUser: () => void,
}

const authContext = createContext({} as IAuthData);

export function AuthProvider({ children }: { children: ReactNode }) {
    const auth: IAuthData = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
}

const getUserMutation = async () => {
    const { data } = await http.get('/api/user')
    return data;
}

export function useProvideAuth(): IAuthData {
    const [user, setUser] = useState<any>()
    const [authenticated, setAuthenticated] = useState<Boolean>(false)
    const [resolved, setResolved] = useState<Boolean>(false)
    const [getUser] = useMutation(getUserMutation)

    const authenticate = (_data: IAuthenticateData) => {
        if (_data.token) localStorage.setItem('token', _data.token)
        setUser(_data.user)
        !authenticated && setAuthenticated(true)
        !resolved && setResolved(true)
    }

    const reloadUser = async () => {
        const { data } = await getUser();
        if (data) authenticate({ user: data.getUser })
    }

    const logout = () => {
        localStorage.clear()
        setResolved(true)
        setAuthenticated(false)
        setUser(null)
    }

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('token')
            if (!authenticated && token) {
                const { data } = await getUser()
                if (data) authenticate({ user: data })
                else logout()
            } else logout()
        })()
    }, [])

    return {
        user,
        authenticate,
        resolved,
        reloadUser,
        authenticated,
        logout
    }
}
