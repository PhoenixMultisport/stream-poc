"use server"

import { TestButtons } from "@/components/TestButtons";

const TestPage = async ({params}: {params: Promise<{id: string}>}) => {

  const {id} = await params

  return (
    <div className="min-h-screen p-8 text-white">
      <h1 className="text-2xl font-bold mb-4 ">Test Page </h1>
      <h2 className="text-xl font-bold mb-4 ">{id}</h2>

      <div className="flex flex-col gap-4">
      <TestButtons id={id} />
      </div>
    </div>
  );
};



export default TestPage;