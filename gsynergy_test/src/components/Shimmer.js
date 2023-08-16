export const Shimmer = () => {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <div className="flex flex-wrap gap-8 justify-between p-5 items-center bg-white">
      {arr.map((ele) => (
        <div className="w-52 h-80 rounded-md bg-gray-400 flex flex-col items-center justify-between cursor-pointer shadow-md shadow-gray-600 p-2.5 animate-pulse"></div>
      ))}
    </div>
  );
};
