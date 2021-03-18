import { useState, useCallback, useRef, useEffect } from 'react'

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState();

  const activeHttpRequests = useRef([])

  const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setIsLoading(true)
    const httpAbortCtrl = new AbortController() // to Cancel connected request
    activeHttpRequests.current.push(httpAbortCtrl)

    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
        signal: httpAbortCtrl.signal
      })

      const responseData = await response.json()

      activeHttpRequests.current = activeHttpRequests.current.filter(
        reqCtrl => reqCtrl !== httpAbortCtrl
      )

      if (!response.ok) {
        throw new Error(responseData.message)
      }

      setIsLoading(false)
      return responseData

    } catch (err) {
      setError(err.message || 'Something went wrong, uneble to fetch data. Please try again later.')
      setIsLoading(false)
      throw err
    }

  }, []);

  const clearError = () => {
    setError(null)
  }

  // cleanup when component Unmounts

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
    }
  }, [])

  return { isLoading, error, sendRequest, clearError }
}