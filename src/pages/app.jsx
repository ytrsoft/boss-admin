import { Helmet } from 'react-helmet-async';

import Container from "@mui/material/Container";

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
        <Helmet>
            <title> 后台管理系统 </title>
        </Helmet>

        <Container maxWidth="xl">
            <h1>Hello</h1>
        </Container>
    </>
  );
}
