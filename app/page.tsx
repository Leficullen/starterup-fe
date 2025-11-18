import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertTriangle, CheckCircle, CheckIcon } from "lucide-react";
//ini homepage yaaaa
export default function Home() {

  const Problem = [
    "Penolakan ekspor akibat kontaminasi Cesium dan zat berbahaya",
    "Sistem traceability yang tidak terintegrasi",
    "Penolakan ekspor akibat kontaminasi Cesium dan zat berbahaya",
    "Sistem traceability yang tidak terintegrasi",
  ];
  const Solutions = ["Real-time contamination monitoring at every stage", "Integrated traceability from farm to export", "Automated alert system for early detection", "Accurate identification of pollution sources", "Digital certification for international trust",
  ];
  const timelineItems = [
    {
      role: "Farmer",
      title: "Harvesting Shrimp",
      description:
        " elit. Beatae, facere sequi blanditiis porro suscipit tempore.",
    },
    {
      role: "Collector",
      title: "Collecting Shrimp",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad saepe nulla quibusdam ut.",
    },
    {
      role: "Processor",
      title: "Checking Shrimps Quality",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, facere sequi blanditiis.",
    },
    {
      role: "Exporter",
      title: "Exporting Shrimps Abroad",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, facere sequi blanditiis.",
    },
  ];

  return (
    <div className="mx-auto min-h-screen w-full ">
      {/* Hero section */}
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
          <div className="grid gap-5 grid-cols-2 mx-auto mt-3 h-fit">
            <Link href="/login">
              <Button className="px-10 text-lg font-semibold rounded-lg w-full h-full">
                Start Now
              </Button>
            </Link>
            <Link href="/tutorial">
              <Button
                variant="outline"
                className="px-10  text-lg font-semibold rounded-lg w-full"
              >
                Tutorial
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="mt-35">
        <h2 className="text-4xl font-bold leading-tight text-center">
          Challenges of the{" "}
          <span className="bg-linear-to-r from-primary to-accent text-transparent bg-clip-text">
            Indonesian Shrimp Industry
          </span>
        </h2>
        <p className="text-center text-xl mt-3">
          From crisis of confidence to integrated solutions
        </p>
        <div className="grid grid-cols-2 mx-[15%] gap-[3%] mt-10">
          <div className="bg-red-200/80 p-5 border-2 border-red-500 rounded-md">
            <h3 className="text-2xl font-bold text-red-500/70 flex items-center gap-2">
              <div className="rounded-full bg-red-300 p-2">
                <AlertTriangle />
              </div>
              Problems
            </h3>
            <div>
              <ul className="list-disc mt-3 md:mt-0 md:ml-16 mx-[15px] text-red-800">
                {Problem.map((problem, index) => (
                  <li className="text-sm md:text-lg" key={index}>{problem}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-green-200/80 p-5 border-2 border-green-500 rounded-md">
            <h3 className="text-2xl font-bold text-green-500 flex items-center gap-2">
              <div className="rounded-full bg-green-300 p-2">
                <CheckIcon />
              </div>
              Solutions
            </h3>
            <div>
              <ul className="list-disc mt-3 md:mt-0 md:ml-16 mx-[15px] text-green-800">
                {Solutions.map((solution, index) => (
                  <li className="text-sm md:text-lg" key={index}>{solution}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
