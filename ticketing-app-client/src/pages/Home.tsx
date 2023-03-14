import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="h-screen bg-gray-100 flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-3xl leading-9 tracking-tight">
          A Simple CRUD Ticketing App
        </h1>
        <p className="text-xl leading-7 py-6">Built on React Typescript.</p>
        <Link
          to="/tickets"
          className="bg-blue-500 font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider text-white focus:outline-none"
        >
          Click to View Ticket Page
        </Link>
      </div>
    </div>
  );
};

export default Home;
