import { FunctionComponent } from "react";
import baseStyled, {
  createGlobalStyle,
  ThemedStyledInterface,
  ThemeProvider,
} from "styled-components";

import { useCurrency } from "./currency";
import { Currencies } from "../types";

export interface Palette {
  PRIMARY: string;
  SECONDARY: string;
  TEXT: string;
  BG: string;
}

enum Shape {
  border = ".125rem solid #00000022",
  shadow = "0 0 .25rem .125rem #00000022",
  shadow_alt = "0 0 0 #00000022",
  radius = "0.5rem",
}

enum FontFamily {
  regular = "Play, sans-serif",
  bold = "Play, sans-serif",
}

export interface Theme {
  fontFamily: typeof FontFamily;
  shape: typeof Shape;
  palette: Palette;
}

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  html,
  body,
  #__next {
    font-family: ${(props) => props.theme.fontFamily.regular};
    background: ${(props) => props.theme.palette.BG};
    color: ${(props) => props.theme.palette.TEXT};
    font-size: 16px;
    height: 100%;
    padding: 0;
    margin: 0;
    * {
      box-sizing: border-box;
    }
  }
  
  svg[role="button"]{
    cursor: pointer;
  }
  
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;

const MyThemeProvider: FunctionComponent = ({ children }) => {
  const { currency } = useCurrency();

  const PaletteByCurrency = {
    [Currencies.BRL]: {
      PRIMARY: "#157241",
      SECONDARY: "#75b855",
      TEXT: "#3c4146",
      BG: "#fefefe",
    },
    [Currencies.CAD]: {
      PRIMARY: "#ad3838",
      SECONDARY: "#db6161",
      TEXT: "#3c4146",
      BG: "#fefefe",
    },
  };

  return (
    <ThemeProvider
      theme={{
        palette: PaletteByCurrency[currency],
        fontFamily: FontFamily,
        shape: Shape,
      }}
    >
      {children}
    </ThemeProvider>
  );
};
const styled = baseStyled as ThemedStyledInterface<Theme>;

export default MyThemeProvider;
export { GlobalStyle, styled };
