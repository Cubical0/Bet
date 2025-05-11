import AjmeriDynamicTable from "./components/AjmeriDynamicTable";
import AjmeriSattaTable from "./components/AjmeriSattaTable";
import GradientHeading from "./components/GradientHeading";
import Navbar from "./components/navbar";
import SattaDisplay from "./components/SattaDisplay";
import SattaKingFAQ from "./components/SattaKingFAQ";

export default function Home() {
  return (
    <div>
      <Navbar />
      <GradientHeading />
      <SattaDisplay />
      <AjmeriSattaTable />
      <AjmeriDynamicTable />
      <SattaKingFAQ />
   </div>
  );
}
