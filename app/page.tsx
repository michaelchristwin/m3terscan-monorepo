
// import App from './App.tsx'
import Header from './components/Header.tsx'
import Home from './components/Home.tsx'

export default function Page() {
  return (
    <>
      <Header />
      <main className="scroll-mt-16 md:scroll-mt-20 lg:scroll-mt-24 px-10 lg:px-20">
        <Home />
      </main>
    </>
  )
}