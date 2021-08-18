import { TransformedToken } from "style-dictionary";

export interface MediaQuery {
  name: string;
  token: TransformedToken;
  next?: MediaQuery;
  prev?: MediaQuery;
}
