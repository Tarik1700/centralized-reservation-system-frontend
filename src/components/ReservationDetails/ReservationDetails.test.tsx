import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter as Router } from "react-router-dom";
import axios from "axios";
import api from "../../helpers/api/api.factory";
import ReservationDetails from "./ReservationDetails";

const queryClient = new QueryClient();

jest.mock("../../helpers/api/api.factory", () => {
  return {
    fetch: jest.fn(),
  };
});

jest.mock("axios");

describe("ReservationDetails", () => {
  it("shows loading spinner when fetching data", async () => {
    const params = { id: "1" };
    (api.fetch as jest.MockedFunction<typeof api.fetch>).mockReturnValue(
      new Promise(() => {})
    );

    render(
      <QueryClientProvider client={queryClient}>
        <Router initialEntries={[`/reservation-details/${params.id}`]}>
          <ReservationDetails />
        </Router>
      </QueryClientProvider>
    );

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
});
