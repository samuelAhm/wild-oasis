import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import { useState } from "react";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [showForm, setShowForm] = useState(true);
  // useEffect(function () {
  //   getCabins().then((data) => {
  //     console.log(data);
  //   });

  //   console.log("Cabins");
  // }, []);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort </p>
      </Row>

      <Row>
        <CabinTable />

        <Button onClick={() => setShowForm((show) => !show)}>
          Create cabin
        </Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
