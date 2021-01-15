import { useAuth } from "../hooks/auth";
import { useRouter } from 'next/router';
import React, { useEffect } from "react";

export function requireAuth(Component: React.FC) {
    console.log('Requiring Auth')
    return () => {
        const { authenticated, resolved } = useAuth()
        const router = useRouter()

        useEffect(() => {
            if (resolved && !authenticated) {
                router.push('/login');
            }
        }, [resolved, authenticated])

        if (resolved && authenticated) {
            return <Component />
        } else {
            return ''
        }
    }
}
