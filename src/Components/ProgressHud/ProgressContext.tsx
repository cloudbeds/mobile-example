import React, { createContext, useContext, useReducer } from 'react'

import ProgressHud from './ProgressHud'

interface State {
  showProgress?: any
  hideProgress?: any
}

const initialState: State = {
  showProgress: null,
  hideProgress: null,
}

const ProgressContext = createContext(initialState)

type Props = { children: React.ReactNode }

const ProgressProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      isLoading: false,
      message: '',
      showLoader: true,
    },
  )

  const { isLoading, message, showLoader } = state

  const showProgress = (message: string = '', showLoader: boolean) => {
    dispatch({ isLoading: true, message, showLoader })
  }

  const hideProgress = () => {
    dispatch({ isLoading: false, message: '', showLoader: false })
  }

  const value = { showProgress, hideProgress }

  return (
    <ProgressContext.Provider value={value}>
      {children}

      {isLoading && <ProgressHud message={message} showLoader={showLoader} />}
    </ProgressContext.Provider>
  )
}

const useProgress = () => {
  const progressContext = useContext(ProgressContext)

  if (progressContext === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }

  return progressContext
}

export { ProgressContext, ProgressProvider, useProgress }
