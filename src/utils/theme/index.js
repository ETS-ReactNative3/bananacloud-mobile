import { LIGHT_THEME, DARK_THEME, SYSTEM_THEME } from '@actions/theme'

import { lightTheme, darkTheme } from '@configs/themes'

export const whichTheme = (currentTheme, systemPreference) => {
    console.log(systemPreference)
    switch (currentTheme) {
        case LIGHT_THEME:
            return lightTheme
        case DARK_THEME:
            return darkTheme
        case SYSTEM_THEME:
            return systemPreference === 'dark' ? darkTheme : lightTheme
    }
}
