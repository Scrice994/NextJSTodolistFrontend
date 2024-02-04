import React from 'react'

interface CustomIconProps{
    iconContainerStyle?: string
    iconStyle?: string
    icon: React.ReactNode
    iconFunction?: () => void
}

export default function CustomIcon({ iconContainerStyle, iconStyle, icon, iconFunction}: CustomIconProps) {
    return (
        <div 
            className={iconContainerStyle}
            onClick={iconFunction ? () => iconFunction() : undefined}
        >
            <div className={iconStyle}>
                {icon}
            </div>
        </div>
    )
}
