import Search from "./Search";

import Header from "./Header";

function Dashboard() {
  return (
    <>
      <div className="px-[2rem] py-[1rem] items-center ">
        <Header />
        <div className="mt-[2rem]">
          <Search />
        </div>
      </div>
    </>
  );
}
export default Dashboard;
