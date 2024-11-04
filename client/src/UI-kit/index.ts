import { createGlobalStyle } from "styled-components";

export { InputWithLabel } from "./Inputs/Input-with-label/input-with-label";
export { Input } from "./Inputs/Input-with-label/styled";
export { Text } from "./Text/Text";
export { Image } from "./Image/Image";
export { Box } from "./Containers/Box";
export {
  CheckboxWithLabel,
  CheckboxComponent,
} from "./Inputs/Checkbox/checkbox-with-label";
export { InputFile } from "./Inputs/InputFile/input-file";
export { Dropdown } from "../components/dropdown/dropdown";
export { theme } from "./theme";
export * from "./Buttons/Buttons";
export * from "./Avatar/Avatar";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
`;
