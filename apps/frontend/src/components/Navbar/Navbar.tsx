import React from "react";

const Navbar: React.FC = () => {
  const urlParams = new URLSearchParams({
    client_id: "47083",
    redirect_uri: "http://localhost:3000/",
    response_type: "code",
    scope: "read_all",
  }).toString();
  const stravaUrl = new URL("https://www.strava.com/oauth/authorize");
  stravaUrl.search = urlParams;

  return (
    <nav className="bg-gray-100 p-4">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="#">self.fit</a>
        <button className="bg-orange-500 text-white px-4 py-2 hover:bg-orange-400">
          <a href={stravaUrl.toString()}>Strava</a>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
