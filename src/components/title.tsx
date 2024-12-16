export const PageTitle = ({ title = "Welcome" }) => (
  <div className="shadow bg-white">
    <h1 className="text-center text-5xl my-5 pb-4 text-blue-600 font-bold">
      {title}
    </h1>
    <hr />
  </div>
);
