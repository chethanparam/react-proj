import { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyinfo'
import './App.css'

const PARTICLES = [
  { sym: '$',  left: '7%',  dur: '18s', delay: '0s'  },
  { sym: '₹',  left: '17%', dur: '22s', delay: '3s'  },
  { sym: '€',  left: '29%', dur: '16s', delay: '1s'  },
  { sym: '£',  left: '44%', dur: '20s', delay: '5s'  },
  { sym: '¥',  left: '57%', dur: '25s', delay: '2s'  },
  { sym: '₿',  left: '69%', dur: '17s', delay: '7s'  },
  { sym: '₩',  left: '81%', dur: '21s', delay: '4s'  },
  { sym: '₣',  left: '91%', dur: '19s', delay: '9s'  },
  { sym: '$',  left: '23%', dur: '23s', delay: '11s' },
  { sym: '₹',  left: '63%', dur: '15s', delay: '6s'  },
]

function App() {
  const [amount, setAmount]           = useState('')
  const [from, setFrom]               = useState('usd')
  const [to, setTo]                   = useState('inr')
  const [convertedAmnt, setConverted] = useState('')
  const [converted, setConverted2]    = useState(false)

  const currencyInfo = useCurrencyInfo(from)
  const options      = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setAmount(convertedAmnt)
    setConverted(amount)
    setConverted2(false)
  }

  const convert = () => {
    if (!amount || !currencyInfo[to]) return
    const result = (parseFloat(amount) * currencyInfo[to]).toFixed(4)
    setConverted(result)
    setConverted2(true)
  }

  const rate = currencyInfo[to]
    ? (1 * currencyInfo[to]).toFixed(4)
    : null

  return (
    <>
      {/* Backgrounds */}
      <div className="app-bg" aria-hidden="true" />
      <div className="app-grid" aria-hidden="true" />

      {/* Floating currency symbols */}
      <div className="particles" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{ left: p.left, '--dur': p.dur, '--delay': p.delay }}
          >
            {p.sym}
          </span>
        ))}
      </div>

      {/* Main */}
      <div className="app-shell">

        {/* Header */}
        <header className="app-header">
          <h1 className="app-title">FX Convert</h1>
          <p className="app-subtitle">Real-Time Exchange Rates</p>
        </header>

        {/* Card */}
        <div className="card">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              convert()
            }}
          >
            {/* From */}
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              selectCurrency={from}
              onAmountChange={(val) => { setAmount(val); setConverted2(false) }}
              onCurrencyChange={(cur) => { setFrom(cur); setConverted2(false) }}
            />

            {/* Swap */}
            <div className="swap-row">
              <div className="swap-line" />
              <button type="button" className="swap-btn" onClick={swap}>
                <span className="swap-icon">⇅</span>
                Swap
              </button>
            </div>

            {/* To */}
            <InputBox
              label="To"
              amount={convertedAmnt}
              currencyOptions={options}
              selectCurrency={to}
              onCurrencyChange={(cur) => { setTo(cur); setConverted2(false) }}
              amountDisable
            />

            {/* Rate hint */}
            <p className="rate-hint">
              {rate && amount
                ? <>1 {from.toUpperCase()} = <span>{rate} {to.toUpperCase()}</span></>
                : converted
                  ? <>&nbsp;</>
                  : 'Enter an amount to see the rate'
              }
            </p>

            {/* Convert button */}
            <button type="submit" className="convert-btn">
              Convert {from.toUpperCase()} → {to.toUpperCase()}
            </button>
          </form>
        </div>

        {/* Footer */}
        <footer className="app-footer">
          Rates via fawazahmed0 / currency-api &nbsp;·&nbsp; Updates daily
        </footer>

      </div>
    </>
  )
}

export default App
