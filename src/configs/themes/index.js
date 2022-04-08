import { DarkTheme } from '@react-navigation/native'
console.log(DarkTheme)
const lightTheme = {
    colors: {
        background: '#f5f6fa',
        primary: '#232428',
        secondary: '#232428',
        gray: '#bdc3c7',
    },
    btnColors: {
        primary: '#ffffff',
        secondary: '#3c9648',
        danger: '#c0392b',
        info: '#2980b9',
    },
    dark: false,
}

const darkTheme = {
    colors: {
        background: '#232428',
        primary: '#FFFFFF',
        secondary: '#FFFFFF',
        gray: '#bdc3c7',
        text: '#FFFFFF',
    },
    btnColors: {
        primary: '#ffffff',
        secondary: '#3c9648',
        danger: '#c0392b',
        info: '#2980b9',
        border: '#232428',
    },
    dark: true,
}

export { lightTheme, darkTheme }
