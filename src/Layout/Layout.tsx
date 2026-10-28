import video from "@/assets/video/animation-Video.mp4";
import Footer from "@/components/Home/Footer";
import { NavBar } from "@/components/Home/NavBar";
import { pageShell } from "@/layout/pageShell";
import { motion, useScroll, useSpring } from "framer-motion";

import { Outlet } from "react-router-dom";
import CartSync from "@/components/CartSync";

const Layout: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });

  return (
    <div className="relative">
      <motion.div
        className="fixed top-0 left-0 right-0 z-[70] h-[3px] origin-left bg-[#e7c59a]"
        style={{ scaleX }}
      />
      <CartSync />
      {/* ✅ Global Background Video (CLICK SAFE) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-10 opacity-50 pointer-events-none"
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* Main Content */}
      <main className="relative z-10 min-h-screen bg-linear-to-r from-[#061511]/98 via-[#061511]/84 to-[#061511]/98">
        <div className="fixed inset-x-0 top-3 z-50">
          <div className={pageShell}>
            <NavBar />
          </div>
        </div>
        <div className={`${pageShell} pt-24 md:pt-28`}>
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Layout;

// import video from "@/assets/video/animation-Video.mp4";
// import Footer from "@/components/Home/Footer";

// import { Navbar } from "@/components/Home/Navber";
// import { Outlet } from "react-router-dom";

// const Layout: React.FC = () => {
//   return (
//     <div className="relative">
//       {/*  Global Background Video */}
//       <video
//         autoPlay
//         muted
//         loop
//         playsInline
//         className="fixed top-0 left-0 w-full h-full object-cover -z-10 opacity-50"
//       >
//         <source src={video} type="video/mp4" />
//       </video>

//       {/* <main className="bg-gradient-to-r from-[#05110E]/95 via-[#05110E]/75 to-[#05110E]/95 min-h-screen relative z-10"> */}
//       <main className="bg-gradient-to-r from-[#061511]/98 via-[#061511]/75 to-[#061511]/98 min-h-screen relative z-10">
//         <div>
//           <div className="sticky top-[32px] z-50">
//             <Navbar />
//           </div>
//           <Outlet />
//         </div>
//         <Footer />
//       </main>
//     </div>
//   );
// };

// export default Layout;
