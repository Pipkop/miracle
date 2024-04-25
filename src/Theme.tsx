import { PropsWithChildren } from "react"
import { isAndroid } from 'react-device-detect';

import { App } from 'konsta/react'

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const theme = isAndroid ? 'material' : 'ios';

    return <App theme={theme}>{children}</App>
}
