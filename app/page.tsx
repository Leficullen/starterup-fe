import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertTriangle, CheckCircle, CheckIcon } from "lucide-react";
//ini homepage yaaaa
export default function Home() {

  const Problems = [
    "Export rejections due to cesium and hazardous substance contamination",
    "Unintegrated traceability system",
    "Manual and slow contamination detection",
    "Difficulty in accurately tracing the source of contamination",
    "Loss of international market confidence",
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
      <div className="relative flex items-center h-screen justify-center bg-no-repeat bg-cover bg-center bg-[url('/udangg.jpg')] shadow-2xl drop-shadow-2xl">
        <div className="flex-col flex z-99 max-w-sm md:max-w-3xl mt-20 md:mt-10">
          <h1 className="md:text-[100px] text-[45px] font-bold leading-tight text-white  text-center">
            Shrimp{" "}
            <span className="bg-linear-to-r from-primary to-accent text-transparent bg-clip-text">
              Linkers
            </span>
          </h1>
          <h2 className="text-center text-white font-bold text-xl md:text-3xl md:bg-linear-to-r from-primary to-accent w-fit mx-auto px-4 rounded-4xl md:rounded-2xl ">
            Maintaining Shrimp Quality from Farm to Export
          </h2>

          <p className="text-center text-white text-sm mx-5 md:mx-auto md:text-lg mt-3">
            A real-time traceability platform that ensures every batch of
            exported shrimp meets international standards through integrated
            contamination monitoring and quality control.
          </p>
          <div className="grid gap-5 grid-cols-2 mx-auto mt-3 h-fit">
            <Link href="/login">
              <Button className="px-10 text-sm md:text-lg font-semibold rounded-lg w-full h-full">
                Start Now
              </Button>
            </Link>
            <Link href="/tutorial">
              <Button
                variant="outline"
                className="px-10  text-sm md:text-lg font-semibold rounded-lg w-full"
              >
                Tutorial
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Challenges section */}
      <div className="mt-35">
        <h2 className="text-2xl md:text-4xl font-bold leading-tight text-center">
          Challenges of the{" "}
          <span className="bg-linear-to-r from-primary to-accent text-transparent bg-clip-text">
            Indonesian Shrimp Industry
          </span>
        </h2>
        <p className="text-center text-sm md:text-xl mt-3">
          From crisis of confidence to integrated solutions
        </p>
        <div className="md:grid grid-cols-2 mx-[10%] md:mx-[15%] gap-[3%] mt-10 ">
          <div className="bg-red-200/80 p-5 border-2 border-red-500 rounded-md shadow-lg">
            <h3 className="justify-center md:justify-start w-full text-xl md:text-2xl font-bold text-red-500/70 flex items-center gap-2">
              <div className="rounded-full bg-red-300 p-2">
                <AlertTriangle className="w-5 h-5 md:h-7 md:w-7" />
              </div>
              Problems
            </h3>
            <div>
              <ul className="list-disc mt-3 md:mt-0 md:ml-16 mx-[15px] text-red-800">
                {Problems.map((problem, index) => (
                  <li className="text-sm md:text-lg" key={index}>{problem}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-green-200/80 p-5 border-2 border-green-500 rounded-md shadow-lg md:mt-0 mt-10 h-full">
            <h3 className="justify-center md:justify-start w-full text-xl md:text-2xl font-bold text-green-500 flex items-center gap-2">
              <div className="rounded-full bg-green-300 p-2">
                <CheckIcon className="w-5 h-5 md:h-7 md:w-7" />
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

      {/* <div className="mt-30">
        <h2 className="text-4xl font-bold leading-tight text-center">
          The workflow of{" "}
          <span className="bg-linear-to-r from-primary to-accent text-transparent bg-clip-text">
            Shrimp Linkers
          </span>
        </h2>
      </div> */}

      <div className="w-full flex justify-center  py-16 mt-30 mb-20">
        <div className="max-w-5xl w-full px-4 md:px-8 relative">
          <h2 className="text-2xl md:text-4xl font-bold leading-tight text-center mb-30">
            The workflow of{" "}
            <span className="bg-linear-to-r from-primary to-accent text-transparent bg-clip-text">
              Shrimp Linkers
            </span>
          </h2>

          {/* Garis di tengah */}
          <div className="pointer-events-none absolute left-1/2 top-24 bottom-0 -translate-x-1/2 border-l border-gray-300" />

          <div className="space-y-20 relative">
            {timelineItems.map((item, index) => {
              const cardOnRight = index % 2 === 0; // true = card di kanan, date di kiri

              return (
                <div
                  key={item.role}
                  className="grid grid-cols-[1fr_auto_1fr] items-center gap-5 md:gap-10"
                >
                  <div className="flex justify-end">
                    {cardOnRight ? (
                      <div className="bg-primary text-white text-sm md:text-base px-5 py-3 rounded-full shadow-md">
                        {item.role}
                      </div>
                    ) : (
                      <div className="bg-white rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.08)] px-6 py-6 md:px-8 md:py-7 max-w-xl w-full">
                        <h3 className="text-primary font-semibold text-lg md:text-xl">
                          {item.title}{" "}
                        </h3>
                        <p className="text-gray-600 mt-3 text-sm md:text-base">
                          {item.description}
                        </p>

                      </div>
                    )}
                  </div>

                  <div className="flex justify-center">
                    <div className="w-5 h-5 bg-accent rounded-full z-10 animate-ping " />
                    <div className="absolute w-5 h-5 bg-primary rounded-full z-10 animate " />
                  </div>

                  <div className="flex justify-start">
                    {cardOnRight ? (
                      // Card (kanan)
                      <div className="bg-white rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.08)] px-6 py-6 md:px-8 md:py-7 max-w-xl w-full">
                        <h3 className="text-primary font-semibold text-lg md:text-xl">
                          {item.title}{" "}
                        </h3>
                        <p className="text-gray-600 mt-3 text-sm md:text-base">
                          {item.description}
                        </p>

                      </div>
                    ) : (
                      <div className="bg-primary text-white text-sm md:text-base px-5 py-3 rounded-full shadow-md">
                        {item.role}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
