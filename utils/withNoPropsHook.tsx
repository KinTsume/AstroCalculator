import React, { Component } from 'react'

export const withNoPropsHook = 
(
    hook: any,
    Component: any
) => {
    return (props: any) => {
        return <Component {...{...props, ...hook()}}/>
    }
}