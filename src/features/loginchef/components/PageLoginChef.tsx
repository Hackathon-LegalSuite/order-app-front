import FormLoginChef from './FormLoginChef.tsx'

const PageLoginChef = () => {
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center gap-10 px-4 bg-background">
      <img
        src="/logo.png"
        alt="Login Logo"
        className="w-64"
      />
      <FormLoginChef />
    </main>
  )
}

export default PageLoginChef