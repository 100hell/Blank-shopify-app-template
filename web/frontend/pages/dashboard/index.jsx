import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Spinner } from "@shopify/polaris";

export default function Dashboard() {
  const { settingsData, settingsDataLoading } = useSelector(
    (states) => states.webiator
  );
  const [isPaidUser, setIsPaidUser] = useState(false);
  const [fetchingSettingsData, setFetchingSettingsData] = useState(true);

  useEffect(() => {
    if (settingsData) {
      setFetchingSettingsData(false);
    }
    setIsPaidUser(settingsData?.idPaidUser);
  }, [settingsData]);
  return (
    <>
      {/* {fetchingSettingsData && (
        <div
          style={{
            height: "100vh",
            width: " 100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
        </div>
      )} */}
homepage
    </>
  );
}
