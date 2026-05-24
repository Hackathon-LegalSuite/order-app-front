import HeaderChef from "@/shared/components/ui/HeaderChef.tsx";
import GridOrderChef from "./GridOrderChef.tsx";

const PageOrderChef = () => {
  return (
    <div className="p-6 bg-background h-full ">
      <div>
        <HeaderChef />
      </div>
      <div className="pt-7">
        <GridOrderChef />
      </div>
    </div>
  );
};

export default PageOrderChef;
