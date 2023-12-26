import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { HomeProvider } from './utils/context/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <BrowserRouter>
      <ConfigProvider
          theme={{
              token: {
                  colorPrimary: "#4E78E8",
                  okButtonProps: {
                      className: 'bg-primary text-white'
                  },
              },
          }}
      >
        <HomeProvider>
          <App/>
        </HomeProvider>
      </ConfigProvider>
        </BrowserRouter>
  </React.StrictMode>,
)
