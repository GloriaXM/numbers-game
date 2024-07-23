//Taken from https://www.copycat.dev/blog/react-suspense/
import "./appLoader.css";

export const AppLoader = () => {
  return (
    <section className="app-loader">
      <div className="bouncing-loader">
        <div className="dotContainer"></div>
        <div className="dotContainer"></div>
        <div className="dotContainer"></div>
      </div>
    </section>
  );
};
