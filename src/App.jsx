import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [usd, setUsd]         = useState('')
  const [inr, setInr]         = useState('')
  const [rate, setRate]       = useState(null)
  const [flipped, setFlipped] = useState(false)
  const [loading, setLoading] = useState(true)
  const [time, setTime]       = useState('')

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json')
      .then(r => r.json())
      .then(data => {
        setRate(data.usd.inr)
        setLoading(false)
        const now = new Date()
        setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
      })
      .catch(() => setLoading(false))
  }, [])

  const handleUsd = (val) => {
    setUsd(val)
    if (val === '') { setInr(''); return }
    if (rate) setInr((parseFloat(val) * rate).toFixed(2))
  }

  const handleInr = (val) => {
    setInr(val)
    if (val === '') { setUsd(''); return }
    if (rate) setUsd((parseFloat(val) / rate).toFixed(4))
  }

  const swap = () => {
    setFlipped(f => !f)
    const u = usd, i = inr
    setUsd(i ? (parseFloat(i) / rate).toFixed(4) : '')
    setInr(u ? (parseFloat(u) * rate).toFixed(2) : '')
  }

  return (
    <div className="page">
      <div className="blob b1" /><div className="blob b2" /><div className="blob b3" />

      <main className="wrap">

        <header className="hdr">
          <div className="flags"><span>🇺🇸</span><span className="dot-sep">·</span><span>🇮🇳</span></div>
          <h1 className="ttl">Currency<br /><em>Converter</em></h1>
          <div className="badge">
            <span className="pulse" />
            {loading ? 'Fetching rate…' : `Live · Updated ${time}`}
          </div>
        </header>

        <div className="card">

          <div className={`field ${flipped ? 'sec' : 'pri'}`}>
            <div className="ftop">
              <span className="ctag"><b>$</b> USD</span>
              <span className="cname">US Dollar</span>
            </div>
            <input className="inp" type="number" placeholder="0.00"
              value={usd} onChange={e => handleUsd(e.target.value)} />
          </div>

          <button className={`swapbtn ${flipped ? 'flip' : ''}`} onClick={swap}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
              <path d="M7 16V4m0 0L3 8m4-4 4 4"/><path d="M17 8v12m0 0 4-4m-4 4-4-4"/>
            </svg>
          </button>

          <div className={`field ${flipped ? 'pri' : 'sec'}`}>
            <div className="ftop">
              <span className="ctag"><b>₹</b> INR</span>
              <span className="cname">Indian Rupee</span>
            </div>
            <input className="inp" type="number" placeholder="0.00"
              value={inr} onChange={e => handleInr(e.target.value)} />
          </div>

          <div className="ratestrip">
            {rate
              ? <><span>1 USD</span><span className="eq">=</span>
                  <span className="rv">₹ {rate.toFixed(4)}</span>
                  <span className="sep">·</span>
                  <span>1 INR = $ {(1/rate).toFixed(6)}</span></>
              : <span>Loading rate…</span>}
          </div>

        </div>

        <footer className="ftr">Rates via fawazahmed0 / currency-api</footer>
      </main>
    </div>
  )
}

export default App
