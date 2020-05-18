import React, { useState, useEffect } from 'react'
import { useTransition, animated } from 'react-spring'
import './styles.css'
import './App.css';
const slides = [
  { id: 0, url: "http://frontendtest.digitalpresent.mk/images/1.png" },
  { id: 1, url: "http://frontendtest.digitalpresent.mk/images/2.png" },
  { id: 2, url: "http://frontendtest.digitalpresent.mk/images/3.png" },
  { id: 3, url: "http://frontendtest.digitalpresent.mk/images/4.png" },
]

const App = () => {
  const [index, set] = useState(0)
  const item = slides[index]
  useEffect(() => setInterval(() => set(state => (state + 1) % slides.length), 3000), [])

  const nextImg = () => {
    set(state => (state + 1) % slides.length)
  }

  const prevImg = () => {
    set(state => (state - 1) % slides.length)
  }

  const transitions = useTransition(slides[index], item => item.id, {
    from: { opacity: 0, left: '30px' },
    enter: { opacity: 1, left: '0' },
    leave: { opacity: 0, left: '0' },
  })

  return (
    <>
      {transitions.map(({ item, props, key }) => (
        <animated.div
          key={key}
          className="bg"
          style={{ ...props, backgroundImage: `url(${item.url})` }}
        > </animated.div>
      )
      )}
      <div className='dots'>
        {
          slides.map((_, i) => {
            return <div onClick={() => set(i)}
              className='dot' style={index === i ? { border: '5px solid #ccc', background: '#ccc' } : {}}></div>
          })
        }
      </div>
      <div className='buttons'>
        <button disabled={index === 0} onClick={() => prevImg()}>
          <img className={index === 0 ? 'disabled' : ''} src='http://frontendtest.digitalpresent.mk/images/left.png' />
        </button>
        <button disabled={index === slides.length - 1} onClick={() => nextImg()}>
          <img className={index === slides.length - 1 ? 'disabled' : ''} src='http://frontendtest.digitalpresent.mk/images/right.png' />
        </button>
      </div>
    </>)
}


export default App;
