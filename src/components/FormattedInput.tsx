"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { formatNumberForInput, parseFormattedNumber } from "@/lib/utils"
import { useDebouncedUpdate } from "@/hooks/useDebouncedUpdate"

interface FormattedInputProps {
  value: number
  onChange: (value: number) => void
  className?: string
  id?: string
  placeholder?: string
  step?: string
  isPercentage?: boolean
}

const FormattedInput = ({
  value,
  onChange,
  className,
  id,
  placeholder,
  step,
  isPercentage = false,
}: FormattedInputProps) => {
  const [displayValue, setDisplayValue] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (!isFocused) {
      if (isPercentage) {
        setDisplayValue(value.toString().replace(".", ","))
      } else {
        setDisplayValue(formatNumberForInput(value))
      }
    }
  }, [value, isFocused, isPercentage])

  const debouncedUpdate = useDebouncedUpdate((cleanNumber: number) => {
    onChange(cleanNumber)
  }, 300)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    setDisplayValue(inputValue)

    if (inputValue === "") {
      debouncedUpdate(0)
      return
    }

    if (isPercentage) {
      const cleanNumber = parseFormattedNumber(inputValue)
      debouncedUpdate(cleanNumber)
      return
    }

    const cleanNumber = parseFormattedNumber(inputValue)

    if (cleanNumber >= 0 || (!inputValue.endsWith(",") && !inputValue.endsWith("."))) {
      const formatted = formatNumberForInput(cleanNumber)
      if (formatted !== inputValue) {
        setDisplayValue(formatted)
      }
    }

    debouncedUpdate(cleanNumber)
  }

  const handleBlur = () => {
    setIsFocused(false)

    const cleanNumber = parseFormattedNumber(displayValue)

    if (isPercentage) {
      setDisplayValue(cleanNumber === 0 ? "" : cleanNumber.toString().replace(".", ","))
    } else {
      setDisplayValue(cleanNumber === 0 ? "" : formatNumberForInput(cleanNumber))
    }

    onChange(cleanNumber)
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  return (
    <Input
      id={id}
      type="text"
      inputMode={isPercentage ? "decimal" : "numeric"}
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      className={className}
      placeholder={placeholder}
      step={step}
    />
  )
}

export default FormattedInput;