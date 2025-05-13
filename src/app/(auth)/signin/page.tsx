"use client"; 
import React, { useEffect } from 'react'
import SignInModal from '@/components/auth/SignInModal';

export default function Page() {
    const [open, setOpen] = React.useState(true)

    useEffect(() => {
        setOpen(true)
    }, [])

    const handleCloseAll = () => {
        setOpen(false);
    };

    return (
        <SignInModal open={open} onClose={handleCloseAll} />
    )
}
