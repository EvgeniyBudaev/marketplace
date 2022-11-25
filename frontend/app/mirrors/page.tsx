import axios from "axios";
import { Catalog } from "../fsd/pages";

async function getData() {
  const res = await axios.get("https://jsonplaceholder.typicode.com/todos");

  return res.data;
}

export default async function MirrorsPage() {
  const data = await getData();
  console.log("data: ", data);

  return (
    <div>
      <Catalog data={data} />
    </div>
  );
}
