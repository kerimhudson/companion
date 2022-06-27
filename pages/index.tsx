import ColorContainer from "../components/ColorContainer";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileMotionPermissions from "../components/MobileMotionPermissions";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MobileMotionPermissions />
      <Header />
      <main className="flex-1 flex flex-col px-4">
        <ColorContainer />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
