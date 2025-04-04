import { Breadcrumb } from "../breadcrumb";
import { Menu } from "../menu";

export const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Menu />
      <div className="content">
        <Breadcrumb />
        <div>{children}</div>
      </div>
    </div>
  );
};
