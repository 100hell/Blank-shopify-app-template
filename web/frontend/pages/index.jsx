import { Page, Layout, Frame, Loading } from "@shopify/polaris";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { _dispatch_GET_SETTINGS_DETAILS } from "../redux/actions/webiatorActions";
import { useState } from "react";

export default function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigate("/dashboard");
    setLoading(false);
  }, []);

  return (
    <Frame>
      {loading && <Loading />}
      <Page narrowWidth>
        <Layout>
          <Layout.Section></Layout.Section>
        </Layout>
      </Page>
    </Frame>
  );
}
