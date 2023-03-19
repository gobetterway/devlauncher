import { isRouteErrorResponse, useRouteError } from "react-router-dom"


export function ErrorPage() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return <p>{error.status} {error.statusText}</p>
  }
  // @ts-ignore
  return (<p>{error.message || "Unknown Error"}</p>)
}
