import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@chakra-ui/core";

export function renderWithTheme(component: React.ReactElement) {
  return render(<ThemeProvider>{component}</ThemeProvider>);
}
