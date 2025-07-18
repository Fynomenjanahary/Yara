import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="hidden w-1/2 items-center justify-center bg-brand p-10 lg:flex xl:w-2/5">
        <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12">
          <div className="h1 w-[224px] items-center text-center text-white">
            LOGO
          </div>
          <div className="space-y-5 text-white">
            <h1 className="h1">Achetez facilement, vendez autrement</h1>
            <p className="body-1">
              Vous pouvez vendre tout ce qui vous passe par la tête
            </p>
          </div>
          <div className="flex-center size-[342px]  rounded-xl bg-slate-400/20 text-white transition-all hover:rotate-2 hover:scale-105">
            Illustration
          </div>
        </div>
      </section>
      <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        <div className="mb-16 lg:hidden">
          <h1 className="h1">LOGO</h1>
        </div>
        {children}
      </section>
    </div>
  );
};

export default Layout;
