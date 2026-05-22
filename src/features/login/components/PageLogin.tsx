import FormLogin from './FormLogin.tsx'

const PageLogin = () => {
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center gap-10 px-4 bg-background">
      <img
        src="/logo.png"
        alt="Login Logo"
        className="w-64"
      />
      <FormLogin />
    </main>
  )
}

export default PageLogin
