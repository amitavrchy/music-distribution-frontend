import CommonWrapper from "@/common/CommonWrapper";
import Accounting from "./Accounting";
import CatalogueArrangementSoloSection from "./CatalogueArrangementSoloSection";

import ClientsAndArtistsSection from "./ClientsAndArtistsSection";
import EcosystemSection from "./EcosystemSection";
import { LabelBridgeSection } from "./LabelBridgeSection";
import SplitSectionsPage from "./SplitSectionsPage";

const LabelBridge = () => {
  return (
    <>
      <title>Label Bridge | Marlow</title>
      <meta name="description" content="Label Bridge | Marlow" />
      <CommonWrapper className="space-y-16 py-16 md:space-y-24 md:py-24">
        <LabelBridgeSection></LabelBridgeSection>
        <EcosystemSection></EcosystemSection>
        <ClientsAndArtistsSection></ClientsAndArtistsSection>
        <SplitSectionsPage></SplitSectionsPage>
        <Accounting></Accounting>
        <CatalogueArrangementSoloSection></CatalogueArrangementSoloSection>
      </CommonWrapper>
    </>
  );
};

export default LabelBridge;
