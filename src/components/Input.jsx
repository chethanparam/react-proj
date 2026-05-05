import React, { useId } from "react"

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisable = false,
  currencyDisable = false,
  className = "",
}) {
  const amountInputId = useId()

  return (
    <div className={`input-box ${className}`}>

      {/* Left: label + number input */}
      <div className="input-left">
        <label htmlFor={amountInputId} className="input-label">
          {label}
        </label>
        <input
          id={amountInputId}
          className="amount-input"
          type="number"
          placeholder="0"
          disabled={amountDisable}
          value={amount}
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
        />
      </div>

      {/* Right: currency selector */}
      <div className="input-right">
        <span className="currency-label">Currency</span>
        <select
          className="currency-select"
          value={selectCurrency}
          onChange={(e) =>
            onCurrencyChange && onCurrencyChange(e.target.value)
          }
          disabled={currencyDisable}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

    </div>
  )
}

export default InputBox
