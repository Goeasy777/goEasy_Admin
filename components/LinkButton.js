'use client'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import React from 'react'

const LinkButton = ({ url, value }) => {
    return (
        <Button color="primary" variant="shadow" className='bg-linkButtonBG outline-none text-textWhite py-2 px-6 text-sm rounded-sm'>
            <Link href={url}>{value}</Link>
        </Button>
    )
}

export default LinkButton