import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface EmailVerificationProps {
  username: string;
  validationCode: string;
}

export const EmailVerification = ({
  username,
  validationCode,
}: EmailVerificationProps) => (
  <Html>
    <Head />
    <Preview>Confirm your email address</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Img
            src="https://i.ibb.co/0qHN8mj/logo.png"
            width="100"
            height="60"
            alt="Gaanwala Music"
          />
        </Section>

        <Heading style={h1}>Confirm your email address</Heading>
        <Text style={heroText}>
          Hi {username}, <br /> Thank you so much for signing up to Gaanwala
          Music. Please use the following verification code to verify your
          email.
        </Text>

        <Section style={codeBox}>
          <Text style={confirmationCodeText}>{validationCode}</Text>
        </Section>

        <Text style={text}>
          If you didn&apos;t request this email, there&apos;s nothing to worry
          about, you can safely ignore it.
        </Text>

        <Section>
          <Text style={footerText}>
            ©2024 Gaanwala Music, Listen music online. <br />
            Rxdevs, BD. <br />
            <br />
            All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

EmailVerification.PreviewProps = {
  validationCode: "DJZ-TLX",
} as EmailVerificationProps;

export default EmailVerification;

const footerText = {
  fontSize: "12px",
  color: "#b7b7b7",
  lineHeight: "15px",
  textAlign: "left" as const,
  marginBottom: "50px",
};

const main = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "0px 20px",
};

const logoContainer = {
  marginTop: "32px",
};

const h1 = {
  color: "#1d1c1d",
  fontSize: "36px",
  fontWeight: "700",
  margin: "30px 0",
  padding: "0",
  lineHeight: "42px",
};

const heroText = {
  fontSize: "20px",
  lineHeight: "28px",
  marginBottom: "30px",
};

const codeBox = {
  background: "rgb(245, 244, 245)",
  borderRadius: "4px",
  marginBottom: "30px",
  padding: "40px 10px",
};

const confirmationCodeText = {
  fontSize: "30px",
  textAlign: "center" as const,
  verticalAlign: "middle",
};

const text = {
  color: "#000",
  fontSize: "14px",
  lineHeight: "24px",
};
