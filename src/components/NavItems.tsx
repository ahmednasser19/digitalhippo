"use client"

import { PRODUCT_CATEGORIES } from "@/config"
import { useEffect, useRef, useState } from "react"
import NavItem from "./NavItem"
import { useOnClickOutside } from "@/hooks/use-on-click-outside"

const NavItems = () => {
    const [activeIndex, setActiveIndex] = useState<null | number>(null)

    const navRef = useRef<HTMLDivElement | null>(null)
    useOnClickOutside(navRef, () => setActiveIndex(null))

    // Function for tracking if the user clicked on escape key to close the navbar
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setActiveIndex(null)
            }
        }
        document.addEventListener('keydown', handler)
        return () => {
            document.removeEventListener('keydown', handler)
        }
    }, [])

    const close = () => setActiveIndex(null)
    return (
        <div ref={navRef} className="flex gap-4 h-full">
            {PRODUCT_CATEGORIES.map((category, i) => {
                const handleOpen = () => {
                    if (activeIndex === i) {
                        setActiveIndex(null)
                    } else {
                        setActiveIndex(i)
                    }
                }
                const isOpen = i === activeIndex

                return (
                    <NavItem
                        key={category.value}
                        close={close}
                        category={category}
                        handleOpen={handleOpen}
                        isOpen={isOpen}
                        isAnyOpen={activeIndex !== null}
                    />
                )
            })}
        </div>
    )
}

export default NavItems