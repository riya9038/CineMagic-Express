export const Shimmer = ({ parent }) => {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return parent === "container" ? (
    <div
      className="flex flex-wrap gap-8 justify-between p-5 items-center bg-white"
      role="loader"
    >
      {arr.map((ele, index) => (
        <div
          data-testid="shimmer-item"
          key={index}
          className="w-52 h-80 rounded-md bg-gray-400 flex flex-col items-center justify-start cursor-pointer shadow-md shadow-gray-600 p-2.5 animate-pulse"
        ></div>
      ))}
    </div>
  ) : (
    <div className="bg-white flex p-16 w-full gap-10" role="loader">
      <div
        data-testid="shimmer-item"
        className="w-full h-96 rounded-md bg-gray-400 flex flex-col items-center justify-center cursor-pointer shadow-md shadow-gray-600 p-2.5 animate-pulse"
      ></div>
    </div>
  );
};
