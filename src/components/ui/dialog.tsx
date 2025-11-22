"use client"

import React, { createContext, useContext, useState } from "react"
import { createPortal } from "react-dom"

type DialogContextValue = {
	open: boolean
	setOpen: (v: boolean) => void
}

const DialogContext = createContext<DialogContextValue | null>(null)

function useDialogContext() {
	const ctx = useContext(DialogContext)
	if (!ctx) throw new Error("Dialog components must be used within a <Dialog>")
	return ctx
}

export function Dialog({ children, open: openProp, defaultOpen = false, onOpenChange }: { children: React.ReactNode; open?: boolean; defaultOpen?: boolean; onOpenChange?: (v: boolean) => void }) {
	const isControlled = openProp !== undefined
	const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen)

	const setOpen = (v: boolean) => {
		if (!isControlled) setInternalOpen(v)
		onOpenChange?.(v)
	}

	const open = isControlled ? (openProp as boolean) : internalOpen

	return <DialogContext.Provider value={{ open, setOpen }}>{children}</DialogContext.Provider>
}

export function DialogTrigger({ children }: { children: React.ReactElement }) {
	const { setOpen } = useDialogContext()

	type ClickableProps = { onClick?: (e: React.MouseEvent) => void }
	const child = children as React.ReactElement<ClickableProps>

	return React.cloneElement(child, {
		onClick: (e: React.MouseEvent) => {
			child.props.onClick?.(e)
			setOpen(true)
		},
	})
}

export function DialogClose({ children }: { children?: React.ReactNode }) {
	const { setOpen } = useDialogContext()

	if (!children) {
		return (
			<button onClick={() => setOpen(false)} aria-label="Fechar" className="inline-flex items-center justify-center">
				×
			</button>
		)
	}

	// assume child may accept an onClick handler
	type ClickableProps = { onClick?: (e: React.MouseEvent) => void }
	const child = children as React.ReactElement<ClickableProps>

	return React.cloneElement(child, {
		onClick: (e: React.MouseEvent) => {
			child.props.onClick?.(e)
			setOpen(false)
		},
	})
}

export function DialogContent({ children }: { children: React.ReactNode }) {
	const { open, setOpen } = useDialogContext()

	if (typeof document === "undefined") return null

	return open
		? createPortal(
				<div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4">
					<div className="fixed inset-0 bg-black/40" onClick={() => setOpen(false)} />

					<div className="relative z-50 w-full max-w-lg rounded-lg bg-popover p-6 shadow-lg">
						{children}
					</div>
				</div>,
				document.body
			)
		: null
}

export function DialogHeader({ children }: { children: React.ReactNode }) {
	return <div className="flex items-center justify-between mb-4">{children}</div>
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
	return <h3 className="text-lg font-medium">{children}</h3>
}

export function DialogFooter({ children }: { children: React.ReactNode }) {
	return <div className="flex items-center gap-2 justify-end mt-2">{children}</div>
}

export default Dialog
