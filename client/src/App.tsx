// import Routers from "./router/routers";

// function App() {
//   return (
//     <Routers />
//   )
// }

// export default App;



// App.tsx
import Routers from "./router/routers";
import ToastProvider from "@/components/ToastProvider"; // Import the ToastProvider

function App() {
  return (
    <>
      <Routers />
      <ToastProvider /> {/* Add ToastProvider here */}
    </>
  )
}

export default App;