import { useState, useEffect } from "react"

export default function useScreen() {
  const [screenType, setScreenType] = useState(null)

  useEffect(() => {
    function getSize() {
      if (window.matchMedia("(max-width: 575px)").matches) return "xs"
      if (window.matchMedia("(max-width: 768px)").matches) return "sm"
      if (window.matchMedia("(max-width: 991px)").matches) return "md"
      if (window.matchMedia("(max-width: 1199px)").matches) return "lg"
      return "xl"
    }

    const handler = () => setScreenType(getSize())

    handler()
    window.addEventListener("resize", handler)

    return () => window.removeEventListener("resize", handler)
  }, [])

  return screenType
}

function getSize() {
  if (typeof window === "undefined") return null
  if (window.matchMedia("(max-width: 575px)").matches) {
    return "xsmall"
  } else if (window.matchMedia("(max-width: 768px)").matches) {
    return "small"
  } else if (window.matchMedia("(max-width: 991px)").matches) {
    return "medium"
  } else if (window.matchMedia("(max-width: 1199px)").matches) {
    return "large"
  } else {
    return "xlarge"
  }
}
