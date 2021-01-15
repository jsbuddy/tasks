import { useAuth } from "../hooks/auth";
import { useRouter } from 'next/router';
import React, { useEffect } from "react";

export function requireNoAuth(Component: React.FC) {
    return () => {
        const { authenticated, resolved } = useAuth()
        const router = useRouter()

        useEffect(() => {
            if (resolved && authenticated) {
                router.push('/');
            }
        }, [resolved, authenticated])

        if (resolved && !authenticated) {
            return <Component />
        } else {
            return ''
        }
    }
}
