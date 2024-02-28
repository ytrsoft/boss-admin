import { capitalize } from 'lodash'
import { lazy, Suspense, memo } from 'react'
function Dynamic(props: any) {
  const Element = lazy(() => {
    const name = capitalize(props.name)
    return import(`../../pages/${name}`)
  })
  return (
    <Suspense>
      <Element/>
    </Suspense>
  )
}

export default memo(Dynamic)