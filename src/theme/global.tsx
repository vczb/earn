import GlobalStyles from "@mui/material/GlobalStyles";

export const globalStyles = (
  <GlobalStyles
    styles={{
      "*": {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        fontFamily: `Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                 Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        WebkitTapHighlightColor: "transparent",
      },
      html: {
        WebkitOverflowScrolling: "touch",
      },
      body: {
        width: "100%",
        height: "100%",
        overflowX: "hidden",
      },
      "*::-webkit-scrollbar": {
        width: "0.4em",
      },
      "*::-webkit-scrollbar-track": {
        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,.1)",
        outline: "1px solid slategrey",
      },
    }}
  />
);
