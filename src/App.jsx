import { AppRoutes } from "./routes/AppRoutes"

function App() {

  return (
    <>
      <AppRoutes />
      <div className="fixed-bottom w-100 text-center text-bg-primary py-2">
        © {new Date().getFullYear()} Sebastián Chico. Todos los derechos reservados.
      </div>
    </>
  )
}

export default App
