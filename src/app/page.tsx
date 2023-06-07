"use client";
import CategoryFilters from "@/Components/CategoryFilters";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Select from "@/Components/Select";
import TextArea from "@/Components/TextArea";

import Link from "next/link";
import { toast } from "react-hot-toast";

export default function Home() {
  const handleToast = () => {
    toast.success("Hello World");
  };

  return (
    <main className="">
      <button className="mt-2 rounded-md bg-blue-500 px-6 py-4 text-white" onClick={handleToast}>
        Toast
      </button>
      <p className="">Read More about hot-toast:</p>
      <Link href={"https://react-hot-toast.com/"}>https://react-hot-toast.com/</Link>

      <CategoryFilters>aqui Cards</CategoryFilters>

      <Button color="black" variant="gradient" size="secondary">
        Example
      </Button>
      <h1>opa</h1>
      <h1 className="prose-headingBold1">test</h1>
      <p className="prose-textBold1">test parr</p>
      <Input placeholder="Teste" label="Teste Input" />
      <TextArea placeholder="Teste" label="Teste TextArea" />
      <Select>
        <option value={"teste1"}>Teste 1</option>
        <option value={"teste1"}>Teste 2</option>
      </Select>
    </main>
  );
}
