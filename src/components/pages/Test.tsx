import { ErrorPage } from "./ErrorPage"

export const TestPage = () => {

  return (<p>TEST</p>)
}

export const route =
{
  path: "/test",
  element: <TestPage />,
  errorElement: <ErrorPage />
}