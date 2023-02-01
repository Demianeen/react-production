import { ResolveOptions } from "webpack";

export default (): ResolveOptions => ({
  extensions: [".tsx", ".ts", ".js"],
})
