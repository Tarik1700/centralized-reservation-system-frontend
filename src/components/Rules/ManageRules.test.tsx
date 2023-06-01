/* eslint-disable testing-library/prefer-screen-queries */
import { render, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter as Router } from "react-router-dom";
import ManageRules from "./ManageRules";

const queryClient = new QueryClient();

describe("ManageRules", () => {
  it("renders without error", () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Router initialEntries={["/rules/1"]}>
          <ManageRules />
        </Router>
      </QueryClientProvider>
    );

    expect(getByText("Manage Rules")).toBeInTheDocument();
  });
});
