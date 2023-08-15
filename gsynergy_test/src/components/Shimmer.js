export const Shimmer = () => {
  let arr = [1, 2, 3, 4, 5];
  return arr.map((ele) => (
    <div className="w-52 h-80 rounded-md bg-white flex flex-col items-center justify-between cursor-pointer shadow-md shadow-gray-600 p-2.5"></div>
  ));
};
