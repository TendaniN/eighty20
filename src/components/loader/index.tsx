import { Loaders } from "./style";

interface Props {
  type?: "page" | "component" | "site";
}

const Loader = ({ type = "component" }: Props) => {
  const getLoader = () => {
    switch (type) {
      case "page": {
        return <div className="loader"></div>;
      }
      case "site": {
        return (
          <div className="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
        );
      }
      default: {
        return (
          <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        );
      }
    }
  };
  return <Loaders>{getLoader()}</Loaders>;
};

export default Loader;
