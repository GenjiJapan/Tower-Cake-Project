import { createTheme, Pagination, Stack, ThemeProvider } from "@mui/material";
import React from "react";
import { useHistory } from "react-router";
import { useRouteMatch } from "react-router-dom";
import "./pagination.css";

function Indicator(props) {
  const { totalPages, pagination, setPage } = props;
  var { _page } = pagination;
  const history = useHistory();
  const { url } = useRouteMatch();

  const theme = createTheme({
    typography: {
      fontSize: 30,
    },
  });

  const handlePageChange = (event, value) => {
    console.log(
      "🚀 ~ file: index.jsx ~ line 19 ~ handlePageChange ~ value",
      value
    );
    setPage(value);
    history.push(`${url}?page=${value}`);
  };

  return (
    <div className="pagination">
      <Stack spacing={2}>
        <ThemeProvider theme={theme}>
          <Pagination
            value={props.selectedValue ? props.selectedValue : " "}
            count={totalPages}
            page={_page}
            onChange={handlePageChange}
            size="large"
          />
        </ThemeProvider>
      </Stack>
    </div>
  );
}

export default Indicator;
