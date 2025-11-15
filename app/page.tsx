import { Button } from "@/components/ui/button";
import { DESTRUCTION } from "dns";
import Link from "next/link";
//ini homepage yaaaa
export default function Home() {
  return (
    <div className="mx-auto min-h-screen w-full ">
      <div className="relative flex items-center h-screen justify-center bg-no-repeat bg-cover bg-center bg-[url('/udangg.jpg')]">
        <div className="flex-col flex z-99 w-3xl mt-10">
          <h1 className="text-[100px] font-bold leading-tight text-white  text-center">
            Shrimp{" "}
            <span className="bg-linear-to-r from-primary to-accent text-transparent bg-clip-text">
              Linkers
            </span>
          </h1>
          <h2 className="font- text-center text-white font-bold text-3xl bg-linear-to-r from-primary to-accent w-fit mx-auto px-4 rounded-2xl ">
            Maintaining Shrimp Quality from Farm to Export
          </h2>

          <p className="text-center text-white  text-lg mt-3">
            A real-time traceability platform that ensures every batch of
            exported shrimp meets international standards through integrated
            contamination monitoring and quality control.
          </p>
          <div className="grid gap-5 grid-cols-2 mx-auto mt-3">
            <Link href="/login">
              <Button className="px-10 text-lg font-semibold rounded-lg">
                Start Now
              </Button>
            </Link>
            <Link href="/tutorial">
              <Button
                variant="outline"
                className="px-10 text-lg font-semibold rounded-lg"
              >
                Tutorial
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute inset-0 bg-black/50"></div>
      </div>
    </div>
  );
}
