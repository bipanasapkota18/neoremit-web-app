import { Card, CardBody, Stack, Text } from "@chakra-ui/react";
import BreadCrumbs from "@neoWeb/components/BreadCrumbs";
import { NAVIGATION_ROUTES } from "@neoWeb/pages/App/navigationRoutes";

const PrivacyPolicy = () => {
  const privacyPolicies = [
    {
      heading: "Information We Collect",
      content: (
        <ul>
          <li>Personal Data: Name, email address, phone number, etc.</li>
          <li>Usage Data: Information on how you use our services.</li>
          <li>Cookies: Small data files stored on your device.</li>
        </ul>
      )
    },
    {
      heading: "How We Use Your Information",
      content: (
        <ul>
          <li>Provide and maintain our services</li>
          <li>Notify you about changes to our services</li>
          <li>Provide customer support</li>
        </ul>
      )
    },
    {
      heading: "How We Share Your Information",
      content: (
        <ul>
          <li>With Service Providers: To facilitate our services.</li>
          <li>For Business Transfers: In case of a merger or acquisition.</li>
          <li>For Legal Purposes: To comply with the law.</li>
        </ul>
      )
    },
    {
      heading: "How We Protect Your Information",
      content: (
        <ul>
          <li>Security Measures: We use encryption to protect your data.</li>
          <li>Data Retention: We only keep your data as long as necessary.</li>
          <li>
            International Data Transfer: Your data may be transferred to other
            countries.
          </li>
        </ul>
      )
    }
  ];
  const pages = [
    {
      pageName: "Privacy Policy",
      href: NAVIGATION_ROUTES.PRIVACY_POLICY,
      isCurrentPage: true
    }
  ];
  return (
    <Stack>
      <BreadCrumbs pages={pages} />
      <Card>
        <CardBody display={"flex"} flexDir={"column"} gap={4}>
          <Text textStyle={"beneficiaryCardHeader"} fontSize={"17px"}>
            Privacy Policy
          </Text>
          {privacyPolicies.map((policy, index) => (
            <Stack key={index} gap={4}>
              <Text
                textStyle={"beneficiaryCardHeader"}
                fontWeight={400}
                fontSize={"16px"}
              >
                {policy.heading}
              </Text>
              <Text
                pl={7}
                textStyle={"beneficiaryCardHeader"}
                fontWeight={400}
                fontSize={"16px"}
              >
                {policy.content}
              </Text>
            </Stack>
          ))}
        </CardBody>
      </Card>
    </Stack>
  );
};

export default PrivacyPolicy;
